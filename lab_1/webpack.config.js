const path = require('path');// node module

module.exports = {
    entry: './public/js/main.js',// source dir
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};