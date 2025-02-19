import { program } from 'commander';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { PluginManager } from './PluginManager.js';
import { ConfigManager } from './core/ConfigManager.js';
import { TreePlugin } from './plugins/TreePlugin.js';
import { SearchPlugin } from './plugins/SearchPlugin.js';
import { DisplayPlugin } from './plugins/DisplayPlugin.js';
import { HighlightPlugin } from './plugins/HighlightPlugin.js';
import { NavigationPlugin } from './plugins/NavigationPlugin.js';

// Resolve file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupCLI() {
    const configManager = new ConfigManager();
    const pluginManager = new PluginManager();

    program
        .name('nest_cli')
        .description('Enhanced CLI tool to display a structured view of a codebase')
        .version('1.2.0')
        .argument('[directory]', 'Directory to process', '.')
        .option('-d, --depth <level>', 'Limit directory tree depth', parseInt)
        .option('-e, --extensions <ext>', 'Filter files by extensions (comma-separated)')
        .option('-l, --line-numbers', 'Show line numbers in file content')
        .option('-s, --size', 'Show file sizes in tree')
        .option('--hidden', 'Include hidden files and directories')
        .option('-t, --tree-only', 'Show only the directory structure')
        .option('-f, --file-only', 'Show only file contents (hide tree)')
        .option('-L, --line-limit <num>', 'Set the number of lines to display per page', 200)
        .option('-S, --search <term>', 'Search for files by name (case-insensitive)')
        .option('-r, --regex', 'Use regular expressions in search')
        .option('--syntax-highlight', 'Enable syntax highlighting')
        .option('-k, --keyboard-nav', 'Enable keyboard navigation')
        .option('--save-config', 'Save current options as default configuration')
        .option('--reset-config', 'Reset to default configuration')
        .action(async (directory, options) => {
            try {
                const config = await configManager.load();
                const finalOptions = { ...config, ...options };

                if (options.saveConfig) {
                    await configManager.save(finalOptions);
                    console.log(chalk.green('Configuration saved successfully!'));
                }

                if (options.resetConfig) {
                    await configManager.reset();
                    console.log(chalk.green('Configuration reset to defaults!'));
                }

                // Register plugins
                pluginManager.register('tree', new TreePlugin(finalOptions));
                pluginManager.register('search', new SearchPlugin(finalOptions));
                pluginManager.register('display', new DisplayPlugin(finalOptions));
                pluginManager.register('highlight', new HighlightPlugin(finalOptions));
                pluginManager.register('navigation', new NavigationPlugin(finalOptions));

                // Process directory
                await pluginManager.processDirectory(path.resolve(directory), finalOptions);

            } catch (error) {
                console.error(chalk.red(`❌ Error: ${error.message}`));
                process.exit(1);
            }
        });

    return program;
}

// Helper function to handle unexpected errors
process.on('uncaughtException', (error) => {
    console.error(chalk.red(`\n❌ Unexpected error: ${error.message}`));
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error(chalk.red(`\n❌ Unhandled promise rejection: ${error.message}`));
    process.exit(1);
});

// Export for use in index.js
export { setupCLI };