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
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const runtime_1 = require("@prisma/client/runtime");
let AllExceptionsFilter = class AllExceptionsFilter {
    httpAdapterHost;
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        console.log('AllExceptionsFilter: ', exception);
        let error = exception;
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        if (exception instanceof runtime_1.NotFoundError) {
            error = new common_1.NotFoundException(exception.message);
        }
        const httpStatus = error instanceof common_1.HttpException
            ? error.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: String(httpAdapter.getRequestUrl(ctx.getRequest())),
            message: error instanceof common_1.HttpException ? error.message : undefined,
            error: error instanceof common_1.HttpException ? error.getResponse() : undefined,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exception.filter.js.map