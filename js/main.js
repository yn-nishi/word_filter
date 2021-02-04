"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
document.addEventListener("DOMContentLoaded", function () {
    // chrome.storage.local.clear()
    chrome.storage.local.get(null, function (storage) {
        // メイン処理
        var changeKeyword = function (node) {
            var type = node.nodeType;
            if (type === 3 && !isIgnore(node)) {
                Object.keys(storage.kw).forEach(function (key) {
                    node.nodeValue = node.nodeValue.split(key).join(storage.kw[key]);
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
            if (Object.keys(storage.kw).length < 2) {
                chrome.storage.local.set(initialSettings);
            }
            console.log('設定読み込み', storage);
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
                if (document.activeElement.isContentEditable === false && storage.affect) {
                    console.log('監視の反応あり');
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
        if (storage.affect) {
            changeKeyword(document.body);
            console.log('メイン処理実行命令');
        }
        observer.observe(document.body, config);
    });
    var initialSettings = {
        affect: true,
        kw: {
            'コロナ': 'コーラ',
            'マスク': 'フリスク'
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUM7SUFDM0MsK0JBQStCO0lBRS9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxPQUFPO1FBRXJDLFFBQVE7UUFDUixJQUFNLGFBQWEsR0FBRyxVQUFDLElBQTZCO1lBQ2xELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7WUFDMUIsSUFBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBQSxHQUFHO29CQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFZLElBQUksQ0FBQyxTQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUMsQ0FBQyxDQUFBO2FBQ0g7aUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtnQkFDbEQsSUFBSSxLQUFLLEdBQXFCLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzlDLE9BQU0sS0FBSyxFQUFDO29CQUNWLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7aUJBQzNCO2FBQ0Y7UUFDSCxDQUFDLENBQUE7UUFFRCxTQUFTO1FBQ1QsSUFBTSxZQUFZLEdBQUc7WUFDbkIsSUFBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7YUFDMUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUE7UUFFRCxVQUFVO1FBQ1YsSUFBTSxRQUFRLEdBQUcsVUFBQyxJQUE2Qjs7WUFDN0MsSUFBTSxPQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDbkcsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQVEsSUFBSSxDQUFDLFVBQVUsMENBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDaEUsQ0FBQyxDQUFBO1FBRUQsY0FBYztRQUNkLElBQU0sUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUM7WUFDcEMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3JCLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFDbEIsb0JBQW9CO2dCQUNwQixVQUFVLENBQUMsY0FBUSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUUsSUFBSSxDQUFFLENBQUE7WUFDM0MsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQztnQkFDRixJQUFpQixRQUFRLENBQUMsYUFBYyxDQUFDLGlCQUFpQixLQUFLLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFDO29CQUN2RixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO29CQUN0QiwrQkFBK0I7aUJBQ2hDO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxjQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RELENBQUMsQ0FBQyxDQUFBO1FBQ0osSUFBTSxNQUFNLEdBQUc7WUFDYixPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFHRCxZQUFZO1FBQ1osWUFBWSxFQUFFLENBQUE7UUFDZCxJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDakIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ3pCO1FBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBTSxlQUFlLEdBQUc7UUFDdEIsTUFBTSxFQUFFLElBQUk7UUFDWixFQUFFLEVBQUU7WUFDRixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxNQUFNO1NBQ2Q7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEifQ==