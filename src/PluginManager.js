import path from 'path';
import chalk from 'chalk';
import { FileNavigator } from './core/FileNavigator.js';
import { collectFiles } from './utils/helpers.js';

export class PluginManager {
    constructor() {
        this.plugins = new Map();
        this.files = []; // Add this to store files
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

        let content = await displayPlugin.readFileContent(file);
        const ext = path.extname(file).slice(1);

        // Apply syntax highlighting if enabled
        content = highlightPlugin.highlightContent(content, ext);

        // Apply search highlighting if search term exists
        if (searchPlugin && searchPlugin.options.search) {
            content = await searchPlugin.searchInFile(content, searchPlugin.options.search);
        }

        await displayPlugin.displayFile(file, () => {
            if (!searchPlugin.options.keyboardNav) {
                this.files.shift();
                this.displayFile(this.files[0]);
            }
        });
    }

    async processDirectory(directory, options) {
        try {
            await this.initializeAll();
            
            // Execute tree plugin first if needed
            await this.get('tree').execute(directory);
            
            if (options.treeOnly) {
                await this.cleanupAll();
                return;
            }

            // Process files
            this.files = await collectFiles(directory, options);
            const navigator = new FileNavigator(this.files);
            
            // Setup navigation if enabled
            this.get('navigation').setupNavigation(navigator, this.displayFile.bind(this));

            // Start displaying files
            await this.displayFile(this.files[0]);

        } catch (error) {
            console.error(chalk.red(`❌ Error: ${error.message}`));
            await this.cleanupAll();
            process.exit(1);
        }
    }
}