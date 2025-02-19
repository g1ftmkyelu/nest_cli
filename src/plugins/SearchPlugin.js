import { BasePlugin } from '../core/BasePlugin.js';
import chalk from 'chalk';

export class SearchPlugin extends BasePlugin {
    async searchInFile(content, searchTerm) {
        const searchPattern = this.options.useRegex ? 
            new RegExp(searchTerm, 'gi') : 
            new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        
        return content.replace(searchPattern, match => chalk.yellow.bold(match));
    }

    async filterFiles(files) {
        if (!this.options.search) return files;

        return files.filter(file => 
            file.toLowerCase().includes(this.options.search.toLowerCase())
        );
    }
}