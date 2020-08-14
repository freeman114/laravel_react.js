const {
    override,
    addExternalBabelPlugins,
} = require("customize-cra");

const path = require('path');

module.exports = override(
    ...addExternalBabelPlugins(
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-react-jsx"
    ),
);
