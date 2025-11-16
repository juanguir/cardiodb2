"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const default_properties_1 = require("../../config/default.properties");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = require("path");
async function bootstrap() {
    const server = (0, express_1.default)();
    const config = default_properties_1.Config.getInstance();
    if (config.entornoApp === 'pro' || config.entornoApp === 'pru') {
        server.set('trust proxy', true);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, express_session_1.default)({
        key: config.getProperty('session.name'),
        secret: config.getProperty('session.secret'),
        cookie: config.getProperty('session.cookie'),
        resave: false,
        saveUninitialized: false,
    }));
    app.use('/', (req, res, next) => {
        console.log('originalUrl: ' + req.originalUrl);
        if (!req.originalUrl.startsWith('/api')) {
            console.log('client: ' + (0, path_1.join)(__dirname, '../../../', 'client', req.originalUrl));
        }
        else {
            console.log('API: ' + req.originalUrl);
        }
        next();
    });
    await app.listen(3000);
    console.log('API running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map