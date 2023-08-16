"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
// 定义一个节流函数
function throttle(fn, delay) {
    if (delay === void 0) { delay = 500; }
    var timer = null;
    return function (pre, now) {
        if (!timer) {
            fn.apply(this, [pre, now]);
            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
            }, delay);
        }
    };
}
exports.throttle = throttle;
//# sourceMappingURL=utils.js.map