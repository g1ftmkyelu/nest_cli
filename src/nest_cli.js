#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to get directory tree
async function generateTree(dir, prefix = '') {
    console.log(`Generating tree for directory: ${dir}`);
    const items = await fs.readdir(dir);
    let result = '';

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const isLast = i === items.length - 1;
        const itemPath = path.join(dir, item);
        const stats = await fs.stat(itemPath);

        // Skip node_modules and hidden files
        if (item === 'node_modules' || item.startsWith('.')) continue;

        result += `${prefix}${isLast ? '└── ' : '├── '}${item}\n`;

        if (stats.isDirectory()) {
            result += await generateTree(itemPath, prefix + (isLast ? '    ' : '│   '));
        }
    }

    return result;
}

// Function to read file content with line numbers
async function readFileContent(filePath) {
    console.log(`Reading file content: ${filePath}`);
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    return lines.map((line, index) => {
        const lineNum = (index + 1).toString().padStart(3, ' ');
        return ` ${lineNum} | ${line}`;
    }).join('\n');
}

// Function to format file display
async function formatFileDisplay(filePath) {
    console.log(`Formatting file display for: ${filePath}`);
    const relativePath = path.relative(process.cwd(), filePath);
    const separator = '-'.repeat(80);

    let output = `\n/${relativePath}:\n`;
    output += `${separator}\n`;

    try {
        const content = await readFileContent(filePath);
        output += content + '\n';
    } catch (error) {
        output += chalk.red(`Unable to read file: ${error.message}`) + '\n';
    }

    output += `${separator}\n`;
    return output;
}

// Main function to process directory
async function processDirectory(directory) {
    console.log(`Processing directory: ${directory}`);
    try {
        // Display directory tree
        const tree = await generateTree(directory);
        console.log(`Directory tree:\n${tree}`);

        // Process all files recursively
        async function processFiles(dir) {
            console.log(`Processing files in directory: ${dir}`);
            const items = await fs.readdir(dir);

            for (const item of items) {
                if (item === 'node_modules' || item.startsWith('.')) continue;

                const itemPath = path.join(dir, item);
                const stats = await fs.stat(itemPath);

                if (stats.isDirectory()) {
                    await processFiles(itemPath);
                } else {
                    const display = await formatFileDisplay(itemPath);
                    console.log(display);
                }
            }
        }

        await processFiles(directory);

    } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
    }
}

// CLI setup
program
    .name('codebase-display')
    .description('CLI tool to display codebase in a structured format')
    .version('1.0.0')
    .argument('[directory]', 'Directory to process', '.')
    .action(async (directory) => {
        console.log(`CLI action triggered with directory: ${directory}`);
        await processDirectory(path.resolve(directory));
    });

program.parse();
