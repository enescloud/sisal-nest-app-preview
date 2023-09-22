"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ParseJsonPipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseJsonPipe = void 0;
const common_1 = require("@nestjs/common");
let ParseJsonPipe = ParseJsonPipe_1 = class ParseJsonPipe {
    logger = new common_1.Logger(ParseJsonPipe_1.name);
    transform(value, metadata) {
        const propertyName = metadata.data;
        try {
            if (typeof value === 'string' &&
                (value.startsWith('{') || value.startsWith('[')) &&
                (metadata.metatype?.name === 'Object' ||
                    metadata.metatype?.name === 'Array' ||
                    typeof metadata.metatype?.prototype === 'object')) {
                return JSON.parse(value);
            }
            return value;
        }
        catch (e) {
            this.logger.error(`${propertyName} contains invalid JSON. Error: `, e);
            throw new common_1.BadRequestException(`${propertyName} contains invalid JSON`);
        }
    }
};
ParseJsonPipe = ParseJsonPipe_1 = __decorate([
    (0, common_1.Injectable)()
], ParseJsonPipe);
exports.ParseJsonPipe = ParseJsonPipe;
//# sourceMappingURL=transform-pipe.js.map