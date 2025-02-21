// TreePlugin.js
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { BasePlugin } from '../core/BasePlugin.js';
import { EXCLUDED_DIRS } from '../utils/constants.js';

export class TreePlugin extends BasePlugin {
    constructor(options) {
        super(options);
        this.searchPlugin = null;
    }

    setSearchPlugin(searchPlugin) {
        this.searchPlugin = searchPlugin;
    }

// TreePlugin.js
async generateTree(dir, prefix = '', depth = Infinity, currentDepth = 0) {
    if (currentDepth >= depth) return '';
    
    let items;
    try {
        items = await fs.readdir(dir);
    } catch {
        return '';
    }

    let result = '';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemPath = path.resolve(dir, item); // Use full resolved path
        const stats = await fs.stat(itemPath);

        if (EXCLUDED_DIRS.has(item)) continue;
        if (!this.options.hidden && item.startsWith('.')) continue;

        const isLast = i === items.length - 1;
        const isMatched = this.searchPlugin?.getMatchedFiles().has(itemPath);

        // Highlight matched files/directories
        let displayItem = isMatched ? chalk.yellow.bold(item) : item;
        let display = `${prefix}${isLast ? '└── ' : '├── '}${displayItem}`;
        
        if (this.options.size) {
            display += ` (${stats.size} bytes)`;
        }

        result += display + '\n';

        if (stats.isDirectory()) {
            result += await this.generateTree(
                itemPath,
                prefix + (isLast ? '    ' : '│   '),
                depth,
                currentDepth + 1
            );
        }
    }
    return result;
}
    async execute(directory) {
        if (this.options.fileOnly) return;
        const tree = await this.generateTree(directory, '', this.options.depth);
        console.log(chalk.green(`\n📁 Directory Tree:\n`) + tree);
    }
}