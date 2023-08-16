"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = require("../config/options");
var initOptions = function (_, options) {
    _.options = Object.assign({}, options_1.default);
    if (options) {
        Object.keys(options).forEach(function (key) {
            _.options[key] = options[key];
        });
    }
};
exports.default = initOptions;
//# sourceMappingURL=init.js.map