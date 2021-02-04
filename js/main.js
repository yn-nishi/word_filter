"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get(null, function (storage) {
        // メイン処理
        var changeKeyword = function (node) {
            console.log('動作2');
            var type = node.nodeType;
            if (type === 3 && !isIgnore(node)) {
                Object.keys(storage).forEach(function (key) {
                    node.nodeValue = node.nodeValue.split(key).join(storage[key]);
                });
            }
            else if (type === 1 || type === 9 || type === 11) {
                var child = node.firstChild;
                while (child) {
                    changeKeyword(child);
                    child = child.nextSibling;
                }
            }
        };
        // 設定読み込み
        var loadSettings = function () {
            if (Object.keys(storage).length < 2) {
                chrome.storage.local.set(initialSettings);
                console.log(initialSettings);
            }
            if (storage.extensionFunction === undefined) {
                chrome.storage.local.set({ 'extensionFunction': true });
            }
        };
        // 処理しないタグ
        var isIgnore = function (node) {
            var _a;
            var ignores = ['OPTION', 'NOSCRIPT', 'FORM', 'HEAD', 'META', 'STYLE', 'SCRIPT', 'HTML'];
            return ignores.indexOf((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) > -1;
        };
        // DOMの動的変更を監視
        var observer = new MutationObserver(function () {
            observer.disconnect();
            new Promise(function (resolve) {
                // 処理負荷軽減のため最短1.5秒間隔
                setTimeout(function () { resolve(null); }, 1500);
            })
                .then(function () {
                // if((<HTMLElement>document.activeElement).isContentEditable === false){
                if (document.activeElement.isContentEditable === false && storage.extensionFunction) {
                    console.log('動作1-2');
                    console.log(storage);
                    // changeKeyword(document.body)
                }
            })
                .then(function () { observer.observe(document.body, config); });
        });
        var config = {
            subtree: true,
            attributes: true
        };
        // メイン処理実行命令
        loadSettings();
        if (storage.extensionFunction) {
            // changeKeyword(document.body)
            console.log('動作1-1');
            console.log(storage);
        }
        observer.observe(document.body, config);
    });
    var initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUM7SUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLE9BQU87UUFFckMsUUFBUTtRQUNSLElBQU0sYUFBYSxHQUFHLFVBQUMsSUFBNkI7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNsQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQzFCLElBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBQSxHQUFHO29CQUMvQixJQUFJLENBQUMsU0FBUyxHQUFZLElBQUksQ0FBQyxTQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUUsQ0FBQyxDQUFDLENBQUE7YUFDSDtpQkFBTSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO2dCQUNsRCxJQUFJLEtBQUssR0FBcUIsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUMsT0FBTSxLQUFLLEVBQUM7b0JBQ1YsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztpQkFDM0I7YUFDRjtRQUNILENBQUMsQ0FBQTtRQUVELFNBQVM7UUFDVCxJQUFNLFlBQVksR0FBRztZQUNuQixJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxD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