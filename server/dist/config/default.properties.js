"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const ts_json_properties_1 = require("ts-json-properties");
class Config {
    static instance;
    entornoApp;
    constructor() {
        this.entornoApp = process.env.ENTORNO_APP || 'local';
        ts_json_properties_1.Properties.initialize(`config/${this.entornoApp}/properties.json`);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Config();
        }
        return this.instance;
    }
    getProperty(propertyName) {
        return ts_json_properties_1.Properties.getValue(propertyName);
    }
    getEnvironmentVariableOrProperty(propertyName) {
        const environmentValue = process.env[propertyName];
        return environmentValue ? environmentValue : this.getProperty(propertyName);
    }
}
exports.Config = Config;
//# sourceMappingURL=default.properties.js.map