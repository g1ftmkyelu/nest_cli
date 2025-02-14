#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// If nest_cli.js is in the src folder
import './src/nest_cli.js';  // Import the whole file, or you can use specific exports if needed.

