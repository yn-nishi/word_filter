"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
(function () {
    // メイン処理
    document.addEventListener('DOMContentLoaded', function () {
        chrome.storage.local.get(null, function (storage) {
            initializeSettings(storage);
            if (storage.affect && storage.kw.length > 0) {
                changeTitle(storage);
                changeBody(document.body, storage);
                observer.observe(document.body, config);
            }
        });
    });
    // 設定初期化
    var initializeSettings = function (storage) {
        var initialSettings = {
            affect: true,
            kw: [{ 'コロナ': 'コーラ' }, { 'マスク': 'フリスク' }]
        };
        if (storage.affect === undefined) {
            chrome.storage.local.set(initialSettings);
        }
    };
    var changeBody = function (node, storage) {
        var type = node.nodeType;
        if (type === 3 && !isIgnore(node)) {
            storage.kw.forEach(function (obj) {
                for (var k in obj) {
                    node.nodeValue = node.nodeValue.split(k).join(obj[k]);
                }
            });
        }
        else if (type === 1 || type === 9 || type === 11) {
            var child = node.firstChild;
            while (child) {
                changeBody(child, storage);
                child = child.nextSibling;
            }
        }
    };
    //<title>の文字列置換
    var changeTitle = function (storage) {
        storage.kw.forEach(function (obj) {
            for (var k in obj) {
                document.title = document.title.split(k).join(obj[k]);
            }
        });
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
        }).then(function () {
            chrome.storage.local.get(null, function (storage) {
                if (!isEditing() && storage.affect) {
                    console.log('監視の反応あり');
                    changeTitle(storage);
                    changeBody(document.body, storage);
                }
            });
        }).then(function () { observer.observe(document.body, config); });
    });
    var config = {
        subtree: true,
        attributes: true
    };
    var isEditing = function () {
        return document.activeElement.isContentEditable;
    };
})();
// chrome.storage.local.clear()
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxDQUFDO0lBRUMsUUFBUTtJQUNSLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBQztRQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsT0FBTztZQUNyQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMzQixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3BCLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUTtJQUNSLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxPQUErQjtRQUN6RCxJQUFNLGVBQWUsR0FBRztZQUN0QixNQUFNLEVBQUUsSUFBSTtZQUNaLEVBQUUsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFFO1NBQzVDLENBQUE7UUFDRCxJQUFHLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFHO1lBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUMxQztJQUNILENBQUMsQ0FBQTtJQU1ELElBQU0sVUFBVSxHQUFjLFVBQUMsSUFBSSxFQUFFLE9BQU87UUFDMUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFD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