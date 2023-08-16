"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleContent = function (_) {
    var content = _.content, options = _.options;
    var e = content.querySelectorAll(options.listenLabel.join(','));
    // let tocArr:el = {
    //     label:'root',
    //     el:content,
    //     children:[]
    // }
    var flag = [];
    var tocArr = [
        {
            label: 'root',
            level: 0,
            children: [],
        },
    ];
    e.forEach(function (item, index) {
        // @ts-ignore
        item._index = index;
        tocArr.push({
            label: item.tagName,
            text: item.innerHTML,
            el: item,
            level: parseInt(item.tagName.replace('H', '')),
            children: [],
        });
    });
    for (var i = 0; i < tocArr.length; i++) {
        for (var j = i + 1; j < tocArr.length; j++) {
            if (tocArr[i].level === tocArr[j].level - 1) {
                tocArr[i].children.push(tocArr[j]);
                flag[j] = true;
            }
            else if (tocArr[i].level === tocArr[j].level) {
                break;
            }
        }
    }
    return tocArr[0].children;
};
exports.default = handleContent;
//# sourceMappingURL=content.js.map