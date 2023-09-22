export declare enum Stage {
    dev = "dev",
    test = "test",
    prod = "prod"
}
export declare class EnvironmentVariables {
    readonly STAGE: Stage;
    readonly PORT = "3003";
    readonly DATABASE_URL: string;
    readonly ACCESS_TOKEN_SECRET: string;
    readonly REFRESH_TOKEN_SECRET: string;
    readonly RESET_PASSWORD_TOKEN_SECRET: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
//# sourceMappingURL=env.validation.d.ts.map