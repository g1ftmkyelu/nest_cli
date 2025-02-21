// SearchPlugin.js
import { BasePlugin } from '../core/BasePlugin.js';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs/promises';

export class SearchPlugin extends BasePlugin {
    constructor(options) {
        super(options);
        this.matchedFiles = new Set();
    }

    clearMatchedFiles() {
        this.matchedFiles.clear();
    }

    async searchInFile(filePath) {
        if (!this.options.search || !filePath) return null;

        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const searchTerm = this.options.search.toLowerCase();
            const fileName = path.basename(filePath).toLowerCase();
            
            // Check if the file name matches the search term or content contains the term
            if (fileName.includes(searchTerm) || content.toLowerCase().includes(searchTerm)) {
                this.matchedFiles.add(filePath);
                const relativePath = filePath.split('src/')[1] || filePath;
                
                console.log(chalk.cyan(`\n📄 Found in ${relativePath}:`));
                
                // Return the entire file content
                return content;
            }
        } catch (error) {
            console.error(chalk.red(`Error reading file ${filePath}: ${error.message}`));
        }
        return null;
    }

    async filterFiles(files) {
        if (!this.options.search) return files;
        
        const matchedFiles = [];
        const searchTerm = this.options.search.toLowerCase();

        for (const file of files) {
            try {
                // Add the full path to matchedFiles for tree highlighting
                const fileName = path.basename(file).toLowerCase();
                const relativePath = file.split('src/')[1] || file;
                const content = await fs.readFile(file, 'utf-8');

                if (fileName.includes(searchTerm) || 
                    relativePath.toLowerCase().includes(searchTerm) ||
                    content.toLowerCase().includes(searchTerm)) {
                    matchedFiles.push(file);
                    this.matchedFiles.add(file); // Make sure to add the full path
                }
            } catch (error) {
                console.error(chalk.red(`Error processing file ${file}: ${error.message}`));
            }
        }
        return matchedFiles;
    }

    getMatchedFiles() {
        return this.matchedFiles;
    }
}