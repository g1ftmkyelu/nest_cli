import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { BasePlugin } from '../core/BasePlugin.js';
import readline from 'readline';

export class DisplayPlugin extends BasePlugin {
  constructor(options) {
    super(options);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.highlightPlugin = null;
  }

  setHighlightPlugin(highlightPlugin) {
    this.highlightPlugin = highlightPlugin;
  }

  async readFileContent(filePath) {
    try {
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Apply syntax highlighting if enabled
      if (this.highlightPlugin && this.options.syntaxHighlight) {
        content = this.highlightPlugin.highlightContent(content, filePath);
      }

      const lines = content.split('\n');
      return lines.map((line, index) =>
        this.options.lineNumbers ?
        `${String(index + 1).padStart(3, ' ')} | ${line}` :
        line
      ).join('\n');
    } catch (error) {
      return chalk.red(`⚠️ Cannot read file: ${filePath} (${error.message})`);
    }
  }

  async displayFile(filePath, callback) {
    const relativePath = path.relative(process.cwd(), filePath);
    const separator = '-'.repeat(80);
    const content = await this.readFileContent(filePath);
    const lines = content.split('\n');
    let currentLine = 0;

    const displayChunk = () => {
      const chunk = lines.slice(currentLine, currentLine + this.options.lineLimit);
      console.log(`\n${separator}\n📄${chalk.blue(relativePath)}\n${separator}\n${chunk.join('\n')}\n${separator}\n`);
      
      currentLine += chunk.length;
      
      if (currentLine < lines.length) {
        this.rl.question('Press Enter to view more (or type "q" to quit): ', (answer) => {
          if (answer.toLowerCase() === 'q') {
            callback();
          } else {
            displayChunk();
          }
        });
      } else {
        callback();
      }
    };

    displayChunk();
  }

  cleanup() {
    this.rl.close();
  }
}