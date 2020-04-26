module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    // "collectCoverage": true, // 是否收集测试时的覆盖率信息
    "coverageDirectory": "<rootDir>/test/coverage", // 输出覆盖信息文件的目录
    "collectCoverageFrom": [ // 哪些文件需要收集覆盖率信息
        // 测试src下js，jsx，ts，tsx为结尾的文件
        "src/**/*.{js,jsx,ts,tsx}",
        // 不测试.d.ts结尾的
        "!src/**/*.d.ts"
    ],
    "setupFiles": [
        // 添加jsdom测试dom节点
        "react-app-polyfill/jsdom"
    ],
    // 这里可以添加一些插件在测试之前
    "setupFilesAfterEnv": [
        "./node_modules/jest-enzyme/lib/index.js",
        // 加载测试启动项
        "<rootDir>/src/__tests__/untils/testSetup.js",
    ],
    // 测试的文件为_test_下面的js文件或者是.test.js
    "testMatch": [
        "<rootDir>/src/__tests__/unit/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/__tests__/integration/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jest-environment-jsdom-fourteen",
    // 如果测试带.js的用babel-jest解析
    // 如果是测试带.css的用cssTransform.js进行解析
    // 如果是.json等用fileTransform进行解析
    "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    // 匹配下面路径的文件不进行测试
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    // 需要省略的路径，然后优先去哪个文件夹下寻找类似于（index.js）
    "modulePaths": [],
    "moduleNameMapper": {// 主要用于与webpack的resolve.alias匹配，注意正则写法
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
    ],
    "watchPlugins": [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ]
}