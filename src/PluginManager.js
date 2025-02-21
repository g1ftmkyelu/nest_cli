import path from 'path';
import chalk from 'chalk';
import { FileNavigator } from './core/FileNavigator.js';
import { collectFiles } from './utils/helpers.js';

export class PluginManager {
    constructor() {
        this.plugins = new Map();
        this.files = [];
    }

    register(name, plugin) {
        this.plugins.set(name, plugin);
    }

    get(name) {
        return this.plugins.get(name);
    }

    async initializeAll() {
        for (const plugin of this.plugins.values()) {
            await plugin.initialize();
        }
    }

    async executeAll() {
        for (const plugin of this.plugins.values()) {
            await plugin.execute();
        }
    }

    async cleanupAll() {
        for (const plugin of this.plugins.values()) {
            await plugin.cleanup();
        }
    }

    setFiles(files) {
        this.files = files;
    }

    async displayFile(file) {
        if (!file) {
            await this.cleanupAll();
            return;
        }

        const displayPlugin = this.get('display');
        const searchPlugin = this.get('search');
        const highlightPlugin = this.get('highlight');

        try {
            // If search is active, use the search plugin's file handling
            if (searchPlugin && searchPlugin.options.search) {
                const searchResults = await searchPlugin.searchInFile(file);
                if (searchResults) {
                    // Display the search results with syntax highlighting
                    const ext = path.extname(file).slice(1);
                    const highlightedResults = highlightPlugin.highlightContent(searchResults, ext);
                    console.log(highlightedResults);
                }
            } else {
                // Normal file display without search
                let content = await displayPlugin.readFileContent(file);
                const ext = path.extname(file).slice(1);
                content = highlightPlugin.highlightContent(content, ext);
                
                // Use the original callback mechanism
                await displayPlugin.displayFile(file, () => {
                    if (!searchPlugin?.options?.keyboardNav) {
                        this.files.shift();
                        this.displayFile(this.files[0]);
                    }
                });
            }
        } catch (error) {
            console.error(chalk.red(`Error displaying file ${file}: ${error.message}`));
        }
    }

    async processDirectory(directory, options) {
        try {
            await this.initializeAll();

            // Collect files first
            this.files = await collectFiles(directory, options);
            
            // If search is active, filter files first
            const searchPlugin = this.get('search');
            if (searchPlugin && options.search) {
                this.files = await searchPlugin.filterFiles(this.files);
            }

            // Execute tree plugin
            const treePlugin = this.get('tree');
            await treePlugin.execute(directory);

            if (options.treeOnly) {
                await this.cleanupAll();
                return;
            }

            // Setup navigation
            const navigator = new FileNavigator(this.files);
            const navigationPlugin = this.get('navigation');
            navigationPlugin.setupNavigation(navigator, this.displayFile.bind(this));

            // Display files if there are any matches
            if (this.files.length > 0) {
                await this.displayFile(this.files[0]);
            } else if (options.search) {
                console.log(chalk.yellow('\nNo files found matching the search criteria.'));
                await this.cleanupAll();
            }

        } catch (error) {
            console.error(chalk.red(`❌ Error: ${error.message}`));
            await this.cleanupAll();
            process.exit(1);
        }
    }
}