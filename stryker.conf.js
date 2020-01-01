module.exports = function (config) {
    config.set({
        mutator: "typescript",
        testFramework: "mocha",
        packageManager: "npm",
        reporters: ["html", "progress"],
        testRunner: "mocha",
        plugins: [
            "@stryker-mutator/mocha-runner",
            "@stryker-mutator/html-reporter",
            "@stryker-mutator/typescript"
        ],
        coverageAnalysis: "off",
        tsconfigFile: "tsconfig.json",
        files: [
            "./src/app/**/*.ts",
            "./test/**/*.ts"
        ],
        webpack: {
            configFile: 'webpack.config.js',
            silent: true
        },
        mutate: ["./src/app/**/*.ts"],
    });
};
