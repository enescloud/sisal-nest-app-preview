"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseUtils = void 0;
class PromiseUtils {
    static getRejectedPromises(results) {
        return results.filter((result) => result.status === 'rejected').map((result) => result.reason);
    }
    static async runSettledPromises(promises) {
        return this.getRejectedPromises(await Promise.allSettled(promises));
    }
    static getExceptionMessagesFromRejectedPromises(rejectedPromises) {
        return rejectedPromises.map((item) => item.response.message);
    }
}
exports.PromiseUtils = PromiseUtils;
//# sourceMappingURL=promise.utils.js.map