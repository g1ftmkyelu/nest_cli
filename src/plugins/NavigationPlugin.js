import { BasePlugin } from '../core/BasePlugin.js';
import chalk from 'chalk';
import readline from 'readline';

export class NavigationPlugin extends BasePlugin {
  constructor(options) {
    super(options);
    this.initialized = false;
    this.rl = null;
  }

  initialize() {
    if (!this.options.keyboardNav || this.initialized) return;

    // Enable raw mode for keyboard input
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Create readline interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.initialized = true;
    
    // Display initial navigation help
    this.displayHelp();
  }

  setupNavigation(navigator, displayCallback) {
    if (!this.options.keyboardNav || !process.stdin.isTTY) return;

    process.stdin.on('data', (key) => {
      switch (key) {
        case 'n':
          displayCallback(navigator.next());
          break;
        case 'p':
          displayCallback(navigator.previous());
          break;
        case 'm':
          navigator.toggleMark();
          console.log(chalk.cyan(
            `File ${navigator.isMarked(navigator.getCurrentFile()) ? 'marked' : 'unmarked'}`
          ));
          break;
        case 'h':
          this.displayHelp();
          break;
        case 'q':
          this.cleanup();
          process.exit(0);
          break;
      }
    });
  }

  displayHelp() {
    console.log(chalk.yellow('\nKeyboard Navigation Controls:'));
    console.log(chalk.cyan('n') + ' - Next file');
    console.log(chalk.cyan('p') + ' - Previous file');
    console.log(chalk.cyan('m') + ' - Mark/unmark current file');
    console.log(chalk.cyan('h') + ' - Show this help');
    console.log(chalk.cyan('q') + ' - Quit');
  }

  cleanup() {
    if (this.initialized) {
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      process.stdin.pause();
      if (this.rl) {
        this.rl.close();
      }
    }
  }
}