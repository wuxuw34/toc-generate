"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createEL(el) {
    var _a;
    var li = document.createElement('li');
    var a = createA(el);
    li.appendChild(a);
    if (el.children && ((_a = el.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        var ol = document.createElement('ol');
        for (var i = 0; i < el.children.length; i++) {
            ol.appendChild(createEL(el.children[i]));
        }
        li.appendChild(ol);
    }
    return li;
}
function createA(el) {
    var a = document.createElement('a');
    a.innerHTML = el.text;
    a.href = "#".concat(el.text);
    el.tocItem = a;
    el.el._toc = a;
    return a;
}
function createTOC(_) {
    var ol = document.createElement('ol');
    for (var i = 0; i < _.tocArr.length; i++) {
        ol.appendChild(createEL(_.tocArr[i]));
    }
    return ol;
}
exports.default = createTOC;
//# sourceMappingURL=toc.js.map