var package = require("../package.json");

module.exports = {
    projectName: "RUI",
    projectPath: "./src/",
    releasePath: "./public/",
    lessSource: "/less/",
    jsSource: "/js/",

    settings: {
        prefix: {
            browsers: [
                "last 2 version",
                "> 1%",
                "opera 12.1",
                "safari 6",
                "ie 9",
                "ie 8",
                "bb 10",
                "android 4"
            ]
        },
        rename: {
            css: {
                extname: ".css"
            },
            minCss: {
                extname: ".min.css"
            },
            js: {
                extname: '.js'
            }
        },

        plumber: {
            errorHandler: function(err) {
                console.log(err.toString());
                this.emit("end");
            }
        }
    }
}
