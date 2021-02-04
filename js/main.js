"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get(null, function (storage) {
        // メイン処理関数
        var changeKeyword = function (node) {
            if (node.nodeType === 3 && !isIgnore(node)) {
                Object.keys(storage).forEach(function (key) {
                    node.nodeValue = node.nodeValue.split(key).join(storage[key]);
                });
            }
            else if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
                var child = node.firstChild;
                while (child) {
                    changeKeyword(child);
                    child = child.nextSibling;
                }
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
                .then(function () { changeKeyword(document.body); })
                .then(function () { observer.observe(document.body, config); });
        });
        var config = {
            subtree: true,
            attributes: true
        };
        if (Object.keys(storage).length < 2)
            chrome.storage.local.set(initialSettings);
        //メイン処理実行命令
        changeKeyword(document.body);
        observer.observe(document.body, config);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUM7SUFFM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLE9BQU87UUFFckMsVUFBVTtRQUNWLElBQU0sYUFBYSxHQUFHLFVBQUMsSUFBNkI7WUFDbEQsSUFBRyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBQSxHQUFHO29CQUMvQixJQUFJLENBQUMsU0FBUyxHQUFZLElBQUksQ0FBQyxTQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUUsQ0FBQyxDQUFDLENBQUE7YUFDSDtpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFO2dCQUM3RSxJQUFJLEtBQUssR0FBcUIsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUMsT0FBTSxLQUFLLEVBQUM7b0JBQ1YsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztpQkFDM0I7YUFDRjtRQUNILENBQUMsQ0FBQTtRQUVELFVBQVU7UUFDVixJQUFNLFFBQVEsR0FBRyxVQUFDLElBQTZCOztZQUM3QyxJQUFNLE9BQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUNuRyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBUSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNoRSxDQUFDLENBQUE7UUFFRCxjQUFjO1FBQ2QsSUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztZQUNwQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7WUFDckIsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUNsQixvQkFBb0I7Z0JBQ3BCLFVBQVUsQ0FBQyxjQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBRSxJQUFJLENBQUUsQ0FBQTtZQUMzQyxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLGNBQU0sYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztpQkFDMUMsSUFBSSxDQUFDLGNBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEQsQ0FBQyxDQUFDLENBQUE7UUFDSixJQUFNLE1BQU0sR0FBRztZQUNiLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQTtRQUVELElBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM3RSxXQUFXO1FBQ1gsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9