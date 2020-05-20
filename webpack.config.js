const path = require("path");

module.exports = {
    entry: {
        header: "./src/header/headerEntry.js",
        report: "./src/report/reportEntry.js",
        monitor: "./src/monitor/monitorEntry.js",
        login: "./src/login/loginEntry.js",
        main: "./src/mainPage/mainPageEntry.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
};
