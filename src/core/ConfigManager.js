import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export class ConfigManager {
    constructor() {
        this.configPath = path.join(os.homedir(), '.nestcli-config.json');
    }

    async load() {
        try {
            const config = await fs.readFile(this.configPath, 'utf-8');
            return JSON.parse(config);
        } catch {
            return {};
        }
    }

    async save(config) {
        await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
    }

    async reset() {
        await this.save({});
    }
}