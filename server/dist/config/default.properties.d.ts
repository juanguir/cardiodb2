export declare class Config {
    private static instance;
    entornoApp: string;
    private constructor();
    static getInstance(): Config;
    getProperty<T>(propertyName: string): T;
    getEnvironmentVariableOrProperty(propertyName: string): string;
}
