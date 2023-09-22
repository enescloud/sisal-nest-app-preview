"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@core/(.*)$': '<rootDir>/core/$1',
        '^@modules/(.*)$': '<rootDir>/modules/$1',
        '^@app/(.*)$': '<rootDir>/app.$1',
    },
    testTimeout: 10000,
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map