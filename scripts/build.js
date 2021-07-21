const rewire = require("rewire");
const path = require("path");

const defaults = rewire("react-scripts/scripts/build.js");

let config = defaults.__get__("config");

config.output.path = path.join(path.dirname(__dirname), "prod");

config.output.filename = "weather-widget.js";

config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};
config.optimization.runtimeChunk = false;
