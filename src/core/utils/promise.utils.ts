/* eslint-disable @typescript-eslint/no-unsafe-return */

/* The PromiseUtils class provides utility methods for working with promises, including filtering
rejected promises and extracting exception messages. */
export class PromiseUtils {
  static getRejectedPromises<T>(
    results: PromiseSettledResult<T>[],
  ): PromiseSettledResult<T>[] {
    return (
      results.filter(
        (result) => result.status === 'rejected',
      ) as PromiseRejectedResult[]
    ).map((result) => result.reason);
  }

  static async runSettledPromises<T>(
    promises: Promise<T>[],
  ): Promise<PromiseSettledResult<T>[]> {
    return this.getRejectedPromises(await Promise.allSettled(promises));
  }

  static getExceptionMessagesFromRejectedPromises(
    rejectedPromises: PromiseSettledResult<void>[],
  ): string[] {
    return rejectedPromises.map(
      (item) =>
        (item as unknown as { response: { message: string } }).response.message,
    );
  }
}
