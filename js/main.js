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
    var $i = 0;
    var changeBody = function (node, storage) {
        var _a;
        var type = node.nodeType;
        var str = (_a = node.nodeValue) === null || _a === void 0 ? void 0 : _a.trim();
        if (type === 3 && !isIgnore(node) && str) {
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
        var ignores = ['OPTION', 'NOSCRIPT', 'FORM', 'HEAD', 'META', 'STYLE', 'SCRIPT'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxDQUFDO0lBRUMsUUFBUTtJQUNSLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBQztRQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsT0FBTztZQUNyQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMzQixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3BCLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUTtJQUNSLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxPQUErQjtRQUN6RCxJQUFNLGVBQWUsR0FBRztZQUN0QixNQUFNLEVBQUUsSUFBSTtZQUNaLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzFDLENBQUE7UUFDRCxJQUFHLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFHO1lBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUMxQztJQUNILENBQUMsQ0FBQTtJQUVELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUtWLElBQU0sVUFBVSxHQUFlLFVBQUMsSUFBSSxFQUFFLE9BQU87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