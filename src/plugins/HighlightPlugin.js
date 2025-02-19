import { BasePlugin } from '../core/BasePlugin.js';
import { highlight } from 'cli-highlight';
import chalk from 'chalk';

export class HighlightPlugin extends BasePlugin {
    highlightContent(content, extension) {
        if (!this.options.syntaxHighlight) return content;

        return highlight(content, {
            language: extension,
            theme: {
                keyword: chalk.blue,
                string: chalk.green,
                function: chalk.cyan,
                number: chalk.yellow
            }
        });
    }
}