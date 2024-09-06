module.exports = (opts = {}) => {
    return {
        postcssPlugin: "postcss-prepend-comment",
        Root(root) {
            root.prepend(`/* ${opts.comment} */`);
        }
    };
};

module.exports.postcss = true;
