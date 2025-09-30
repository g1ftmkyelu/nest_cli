#!/usr/bin/env node

import { setupCLI } from './src/cli.js';

const program = await setupCLI();
program.parse(process.argv);
