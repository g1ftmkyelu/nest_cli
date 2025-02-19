import fs from 'fs/promises';
import path from 'path';
import { EXCLUDED_DIRS, MEDIA_EXTENSIONS } from './constants.js';

/**
 * Recursively collects files from a directory based on given options
 * @param {string} directory - The directory to process
 * @param {Object} options - Configuration options
 * @returns {Promise<string[]>} Array of file paths
 */
export async function collectFiles(directory, options) {
    const files = [];

    async function processFiles(dir) {
        let items;
        try {
            items = await fs.readdir(dir);
        } catch {
            return;
        }

        for (const item of items) {
            if (!options.hidden && item.startsWith('.')) continue;
            const itemPath = path.join(dir, item);
            const stats = await fs.stat(itemPath);

            if (stats.isDirectory()) {
                if (!EXCLUDED_DIRS.has(item)) {
                    await processFiles(itemPath);
                }
            } else {
                // File filtering logic
                if (options.search && !item.toLowerCase().includes(options.search.toLowerCase())) {
                    continue;
                }
                
                if (options.extensions) {
                    const allowedExts = options.extensions.split(',').map(ext => ext.trim());
                    if (!allowedExts.some(ext => item.endsWith(ext))) {
                        continue;
                    }
                }

                if (MEDIA_EXTENSIONS.has(path.extname(item).toLowerCase())) {
                    continue;
                }

                files.push(itemPath);
            }
        }
    }

    await processFiles(directory);
    return files;
}

/**
 * Creates a formatted separator line
 * @param {number} length - Length of the separator
 * @returns {string} Formatted separator line
 */
export function createSeparator(length = 80) {
    return '-'.repeat(length);
}

/**
 * Formats a file path for display
 * @param {string} filePath - Full file path
 * @param {boolean} relative - Whether to show relative path
 * @returns {string} Formatted file path
 */
export function formatFilePath(filePath, relative = true) {
    return relative ? path.relative(process.cwd(), filePath) : filePath;
}

/**
 * Checks if a file is text-based and readable
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} Whether the file is readable text
 */
export async function isTextFile(filePath) {
    try {
        const buffer = await fs.readFile(filePath);
        const sample = buffer.slice(0, 1024); // Check first 1KB
        
        // Check for NULL bytes - common in binary files
        if (sample.includes(0)) return false;
        
        // Check if the file content is mostly printable characters
        const printableChars = sample.toString().match(/[\x20-\x7E]/g);
        return printableChars && printableChars.length > sample.length * 0.8;
    } catch {
        return false;
    }
}

/**
 * Formats file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Safely reads a file, handling various potential errors
 * @param {string} filePath - Path to the file
 * @param {Object} options - Reading options
 * @returns {Promise<string>} File content or error message
 */
export async function safeReadFile(filePath, options = {}) {
    try {
        if (!await isTextFile(filePath)) {
            return `[Binary file: ${formatFileSize(await fs.stat(filePath).size)}]`;
        }
        
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        return `[Error reading file: ${error.message}]`;
    }
}