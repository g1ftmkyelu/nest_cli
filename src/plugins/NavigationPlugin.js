import { BasePlugin } from '../core/BasePlugin.js';
import keypress from 'keypress';
import chalk from 'chalk';

export class NavigationPlugin extends BasePlugin {
    initialize() {
        if (!this.options.keyboardNav) return;

        keypress(process.stdin);
        process.stdin.setRawMode(true);
    }

    setupNavigation(navigator, displayCallback) {
        if (!this.options.keyboardNav) return;

        process.stdin.on('keypress', (ch, key) => {
            if (!key) return;

            switch(key.name) {
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
                case 'q':
                    process.exit(0);
                    break;
            }
        });
    }
}