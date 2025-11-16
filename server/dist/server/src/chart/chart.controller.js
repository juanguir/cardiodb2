"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartController = void 0;
const common_1 = require("@nestjs/common");
let ChartController = class ChartController {
    getData() {
        const bar = [500, 700, 400, 850, 900, 1200, 950, 1300, 1100, 1400, 1200, 1500];
        const line = [300, 400, 550, 700, 850, 950, 1100, 1300, 1250, 1500, 1400, 1600];
        const pie = [45, 25, 20, 10];
        return { bar, line, pie };
    }
};
exports.ChartController = ChartController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChartController.prototype, "getData", null);
exports.ChartController = ChartController = __decorate([
    (0, common_1.Controller)('api/chart-data')
], ChartController);
//# sourceMappingURL=chart.controller.js.map