"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
(function () {
    var _a;
    // 設定内容表示
    document.addEventListener("DOMContentLoaded", function () {
        chrome.storage.local.get(null, function (storage) {
            viewKeywords();
            onOffSwithch();
            clearButton();
            console.log(storage);
        });
    });
    // 登録キーワード表示
    var viewKeywords = function () {
        chrome.storage.local.get(null, function (storage) {
            console.log('viewPage');
            console.log(storage);
            var $inputArea = document.getElementById('input-area');
            $inputArea.innerHTML = '';
            if (storage.kw.length > 0) {
                storage.kw.forEach(function (obj, i) {
                    for (var k in obj) {
                        addInput($inputArea, i, k, obj[k]);
                    }
                });
                addInput($inputArea, storage.kw.length);
            }
            else {
                addInput($inputArea, 0);
            }
            aoutAddInput($inputArea);
        });
    };
    // on-off switch
    var onOffSwithch = function () {
        chrome.storage.local.get(null, function (storage) {
            var $switch = document.getElementById('customSwitch1');
            $switch.checked = storage.affect;
            $switch.addEventListener('change', function () {
                storage.affect = $switch.checked;
                chrome.storage.local.set({ affect: storage.affect });
            });
        });
    };
    var clearButton = function () {
        var $switch = document.getElementById('clear');
        $switch === null || $switch === void 0 ? void 0 : $switch.addEventListener('click', function () {
            var res = confirm('全て削除してよろしいですか？');
            if (res) {
                // chrome.storage.local.clear()
                chrome.storage.local.set({ kw: {} });
                viewKeywords();
            }
        });
    };
    //  キーワード更新
    (_a = document.getElementById('save')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a;
        chrome.storage.local.set({ kw: [] });
        var newKeywords = [];
        var numberOfInputs = document.getElementsByTagName('input').length / 2;
        for (var i = 0; i < numberOfInputs - 1; i++) {
            var newK = document.getElementById('k-' + i);
            var newKey = newK.value.trim();
            var newV = document.getElementById('v-' + i);
            var newVal = newV.value;
            if (newKey.length > 0) {
                newKeywords.push((_a = {}, _a[newKey] = newVal, _a));
            }
        }
        chrome.storage.local.set({ kw: newKeywords });
        notice('設定が保存されました。');
        viewKeywords();
    });
    //<input> 作成 & 追加
    var addInput = function (parent, num, key, val) {
        if (key === void 0) { key = ''; }
        if (val === void 0) { val = ''; }
        var $div = document.createElement('div');
        $div.className = 'input-pair';
        parent.appendChild($div);
        var $newInputKey = document.createElement('input');
        $newInputKey.type = 'search';
        $newInputKey.id = 'k-' + num;
        $newInputKey.className = 'input';
        $newInputKey.setAttribute('value', key);
        $div.appendChild($newInputKey);
        var $arrow = document.createElement('div');
        $arrow.className = 'arrow';
        $div.appendChild($arrow);
        var $newInputVal = document.createElement('input');
        $newInputVal.type = 'search';
        $newInputVal.id = 'v-' + num;
        $newInputVal.className = 'input';
        $newInputVal.setAttribute('value', val);
        $div.appendChild($newInputVal);
    };
    var aoutAddInput = function ($inputArea) {
        document.addEventListener("change", function (e) {
            var _a;
            var numberOfInputs = document.querySelectorAll('#input-area input').length / 2;
            // console.log('全部で',numberOfInputs,'行あるよ')
            var selectedId = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('id');
            if (selectedId === 'k-' + (numberOfInputs - 1)) {
                addInput($inputArea, numberOfInputs);
            }
        });
    };
    var notice = function (message) {
        var $notice = document.getElementById('notice');
        $notice.textContent += message;
    };
    // chrome.storage.local.clear()
})();
// const viewPage = () => {
//   chrome.storage.local.get('kw', (kw)=>{
//     console.log('viewPage');console.log(kw)
//     // onOffSwithch(storage)
//     // clearButton()
//     const $inputArea = document.getElementById('input-area') as HTMLElement
//     $inputArea.innerHTML = ''
//     Object.keys(kw).forEach((key, i) => {
//       addInput($inputArea, i, key, kw[key])
//     })
//     addInput($inputArea, Object.keys(kw).length)
//     document.addEventListener("change", (e) => {
//         const numberOfInputs: number = document.querySelectorAll('#input-area input').length / 2
//         // console.log('全部で',numberOfInputs,'行あるよ')
//         const selectedId = (<HTMLInputElement>e.target)?.getAttribute('id')
//         if(selectedId === 'k-'+ (numberOfInputs - 1)) {
//         addInput($inputArea, numberOfInputs)
//         }
//     })
//   })
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBQy9DLENBQUM7O0lBR0QsU0FBUztJQUVULFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBQztRQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsT0FBTztZQUNyQyxZQUFZLEVBQUUsQ0FBQTtZQUNkLFlBQVksRUFBRSxDQUFBO1lBQ2QsV0FBVyxFQUFFLENBQUE7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ0YsQ0FBQyxDQUFDLENBQUE7SUFFRixZQUFZO0lBQ1osSUFBTSxZQUFZLEdBQUc7UUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLE9BQU87WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDNUMsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQWdCLENBQUE7WUFDdkUsVUFBVSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7WUFDekIsSUFBRyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBWSxFQUFHLENBQVE7b0JBQ3pDLEtBQUssSUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO3dCQUNuQixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ25DO2dCQUNILENBQUMsQ0FBQyxDQUFB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