const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const insertComment = require("./src/postcss/insert-comment-plugin");

module.exports = {
    plugins: [insertComment({ comment: process.env.VITE_WEB_APP_ID }), tailwindcss, autoprefixer]
};
