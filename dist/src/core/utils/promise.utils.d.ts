export declare class PromiseUtils {
    static getRejectedPromises<T>(results: PromiseSettledResult<T>[]): PromiseSettledResult<T>[];
    static runSettledPromises<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]>;
    static getExceptionMessagesFromRejectedPromises(rejectedPromises: PromiseSettledResult<void>[]): string[];
}
//# sourceMappingURL=promise.utils.d.ts.map