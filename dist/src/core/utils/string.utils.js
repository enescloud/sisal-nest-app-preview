"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
const bcryptjs_1 = require("bcryptjs");
class StringUtils {
    static async hashString(string) {
        return (0, bcryptjs_1.hash)(string, await (0, bcryptjs_1.genSalt)());
    }
}
exports.StringUtils = StringUtils;
//# sourceMappingURL=string.utils.js.map