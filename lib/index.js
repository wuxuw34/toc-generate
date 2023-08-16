"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("./js/init");
var content_1 = require("./js/content");
var toc_1 = require("./js/toc");
var utils_1 = require("./js/utils");
var TOC = /** @class */ (function () {
    function TOC(contentElement, TOCElement, options) {
        var _this = this;
        this.content = null;
        this.toc = null;
        this.options = null;
        this.tocArr = null;
        this.observer = null;
        this.scrollMove = 'down';
        this.scrollThrottle = null;
        this.setContent(contentElement);
        this.setTOCElement(TOCElement);
        (0, init_1.default)(this, options);
        this.getContentElement();
        this.scrollThrottle = (0, utils_1.throttle)(function (pre, now) {
            if (pre < now) {
                _this.scrollMove = 'down';
            }
            else {
                _this.scrollMove = 'up';
            }
        }, 500);
        this.addScrollListener();
        this.initObserve();
        this.toc.appendChild((0, toc_1.default)(this));
    }
    /**
     * 设置所要生成目录的元素区域
     * @param contentElement
     */
    TOC.prototype.setContent = function (contentElement) {
        if (contentElement instanceof HTMLElement) {
            this.content = contentElement;
        }
        else {
            this.content = document.querySelector(contentElement);
        }
    };
    /**
     * 填充目录的区域
     * @param TOCElement
     */
    TOC.prototype.setTOCElement = function (TOCElement) {
        if (TOCElement instanceof HTMLElement) {
            this.toc = TOCElement;
        }
        else {
            this.toc = document.querySelector(TOCElement);
        }
    };
    TOC.prototype.setOptions = function (options) {
        (0, init_1.default)(this, options);
    };
    TOC.prototype.getContentElement = function () {
        this.tocArr = (0, content_1.default)(this);
    };
    TOC.prototype.initObserve = function () {
        var _this = this;
        var _a, _b;
        var els = (_a = this.content) === null || _a === void 0 ? void 0 : _a.querySelectorAll(this.options.listenLabel.join(','));
        function active(index) {
            // @ts-ignore
            els[index]._toc.classList.add('active');
            if (els === null || els === void 0 ? void 0 : els.length)
                els.forEach(function (item) {
                    // @ts-ignore
                    var _i = item._index;
                    if (_i !== index) {
                        // @ts-ignore
                        item._toc.classList.remove('active');
                    }
                });
        }
        var option = {
            rootMargin: '10px',
            threshold: [1, 0],
        };
        this.observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (item) {
                var boundingClientRect = item.boundingClientRect, target = item.target;
                // @ts-ignore
                var index = target._index;
                if (_this.scrollMove === 'down' && boundingClientRect.y <= 50) {
                    active(index);
                }
                else if (_this.scrollMove === 'up' && boundingClientRect.y < 20) {
                    active(index - 1 >= 0 ? index - 1 : index);
                }
            });
        }, option);
        (_b = this.content) === null || _b === void 0 ? void 0 : _b.querySelectorAll(this.options.listenLabel.join(',')).forEach(function (item) {
            _this.observer.observe(item);
        });
    };
    TOC.prototype.addScrollListener = function () {
        var _this = this;
        var pre = 0;
        window.addEventListener('scroll', function (e) {
            _this.scrollFunc(pre, e.target.scrollingElement.scrollTop);
            pre = e.target.scrollingElement.scrollTop;
        });
    };
    TOC.prototype.removeScrollListener = function () { };
    TOC.prototype.scrollFunc = function (pre, now) {
        this.scrollThrottle(pre, now);
    };
    return TOC;
}());
exports.default = TOC;
//# sourceMappingURL=index.js.map