"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
(function () {
    // メイン処理実行
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
    // 設定初期化  affect:機能OnOff, visibility:設定ワードの非表示, kw:変換キーワード
    var initializeSettings = function (storage) {
        var initialSettings = {
            affect: true,
            visibility: true,
            kw: [{ 'コロナ': 'コーラ' }, { 'マスク': 'フリスク' }]
        };
        if (storage.affect === undefined) {
            chrome.storage.local.set(initialSettings);
        }
    };
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
        // 処理負荷軽減のため最短2.5秒待機
        new Promise(function (resolve) {
            setTimeout(function () { resolve(null); }, 2500);
        })
            // メイン処理実行
            .then(function () {
            chrome.storage.local.get(null, function (storage) {
                if (storage.affect && !isEditing() && !isSelecting()) {
                    changeTitle(storage);
                    changeBody(document.body, storage);
                }
            });
        })
            .then(function () {
            observer.observe(document.body, config);
        });
    });
    var config = {
        subtree: true,
        attributes: true
    };
    // キーボード入力中にメイン処理の実行はしない(入力位置がズレてしまうため)
    var isEditing = function () {
        return document.activeElement.isContentEditable;
    };
    // 文字列ドラッグ選択中にメイン処理の実行はしない(選択解除されるため)
    var isSelecting = function () {
        return document.getSelection().toString().trim().length > 1;
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxDQUFDO0lBRUMsVUFBVTtJQUNWLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBQztRQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsT0FBTztZQUNyQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMzQixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3BCLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsMERBQTBEO0lBQzFELElBQU0sa0JBQWtCLEdBQUcsVUFBQyxPQUErQjtRQUN6RCxJQUFNLGVBQWUsR0FBRztZQUN0QixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzFDLENBQUE7UUFDRCxJQUFHLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFHO1lBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUMxQztJQUNILENBQUMsQ0FBQTtJQU1ELElBQU0sVUFBVSxHQUFlLFVBQUMsSUFBSSxFQUFFLE9BQU87O1FBQzND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