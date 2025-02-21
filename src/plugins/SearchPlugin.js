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
            const searchTerm = this.options.search;
            
            const searchPattern = this.options.regex ?
                new RegExp(searchTerm, 'gi') :
                new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

            if (content.match(searchPattern)) {
                this.matchedFiles.add(filePath);
                const relativePath = filePath.split('src/')[1] || filePath;
                
                // Print file header
                console.log(chalk.cyan(`\n📄 Found in ${relativePath}:`));
                
                // Get relevant code snippet
                const lines = content.split('\n');
                let snippetStart = null;
                let snippetEnd = null;

                // Find the class or function definition containing the match
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].includes('class') || lines[i].includes('function')) {
                        snippetStart = i;
                        // Find the closing brace
                        let braceCount = 1;
                        for (let j = i + 1; j < lines.length; j++) {
                            if (lines[j].includes('{')) braceCount++;
                            if (lines[j].includes('}')) braceCount--;
                            if (braceCount === 0) {
                                snippetEnd = j + 1;
                                break;
                            }
                        }
                        break;
                    }
                }

                if (snippetStart !== null && snippetEnd !== null) {
                    // Extract and format the relevant code section
                    const codeSnippet = lines
                        .slice(snippetStart, snippetEnd)
                        .map(line => {
                            if (line.match(searchPattern)) {
                                return chalk.yellow(line.replace(searchPattern, match => chalk.bold(match)));
                            }
                            return line;
                        })
                        .join('\n');

                    return codeSnippet;
                }
            }
        } catch (error) {
            console.error(chalk.red(`Error reading file ${filePath}: ${error.message}`));
        }
        return null;
    }

    async filterFiles(files) {
        if (!this.options.search) return files;
        
        const matchedFiles = [];
        for (const file of files) {
            if (await this.searchInFile(file)) {
                matchedFiles.push(file);
            }
        }
        return matchedFiles;
    }

    getMatchedFiles() {
        return this.matchedFiles;
    }
}