"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const stats_controller_1 = require("./stats/stats.controller");
const orders_controller_1 = require("./orders/orders.controller");
const chart_controller_1 = require("./chart/chart.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../../../', 'client'),
                exclude: ['/api'],
                serveStaticOptions: {
                    fallthrough: true,
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController, users_controller_1.UsersController, stats_controller_1.StatsController, orders_controller_1.OrdersController, chart_controller_1.ChartController],
        providers: [auth_service_1.AuthService, users_service_1.UsersService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map