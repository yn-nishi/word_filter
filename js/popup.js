"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
(function () {
    var _a;
    // メイン処理実行
    document.addEventListener("DOMContentLoaded", function () {
        chrome.storage.local.get(null, function (storage) {
            viewKeywords();
            onOffButton();
            allClearButton();
        });
    });
    // 登録キーワード表示
    var viewKeywords = function () {
        chrome.storage.local.get(null, function (storage) {
            var $inputArea = document.getElementById('inputArea');
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
    // function affect button
    var onOffButton = function () {
        chrome.storage.local.get(null, function (storage) {
            var $on = document.getElementById('on');
            var $off = document.getElementById('off');
            if (storage.affect) {
                $on.className = 'btnOn';
                $off.className = 'btn';
            }
            else {
                $on.className = 'btn';
                $off.className = 'btnOn';
            }
            $on.addEventListener('click', function () {
                $on.className = 'btnOn';
                $off.className = 'btn';
                chrome.storage.local.set({ affect: true });
                notice('変換機能が ON になりました。');
            });
            $off.addEventListener('click', function () {
                $on.className = 'btn';
                $off.className = 'btnOn';
                chrome.storage.local.set({ affect: false });
                notice('変換機能が OFF になりました。');
            });
        });
    };
    var allClearButton = function () {
        var $switch = document.getElementById('clear');
        $switch === null || $switch === void 0 ? void 0 : $switch.addEventListener('click', function () {
            var res = confirm('全て削除してよろしいですか？');
            if (res) {
                chrome.storage.local.set({ kw: {} });
                notice('キーワードが全て削除されました。');
                viewKeywords();
            }
        });
    };
    //  キーワード更新
    (_a = document.getElementById('save')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a;
        var checkKeyArray = [];
        var checkValArray = [];
        var newKeywords = [];
        var numberOfInputs = document.getElementsByTagName('input').length / 2;
        for (var i = 0; i < numberOfInputs - 1; i++) {
            var newK = document.getElementById('k-' + i);
            var newKey = newK.value.trim();
            var newV = document.getElementById('v-' + i);
            var newVal = newV.value;
            if (newKey.length > 0) {
                checkKeyArray.push(newKey);
                checkValArray.push(newVal);
                newKeywords.push((_a = {}, _a[newKey] = newVal, _a));
            }
        }
        var errorMessage = '';
        checkKeyArray.forEach(function (k, kI) {
            checkValArray.forEach(function (v, vI) {
                if (v.indexOf(k) > -1) {
                    errorMessage += kI + 1 + "\u756A\u76EE\u306E\u300C" + k + "\u300D\u304C" + (vI + 1) + "\u756A\u76EE\u306E\u300C" + v + "\u300D\u306E\u4E2D\u306B\u542B\u307E\u308C\u3066\u3044\u307E\u3059\u3002\u5909\u63DB\u30EB\u30FC\u30D7\u304C\u767A\u751F\u3059\u308B\u306E\u3067\u4FEE\u6B63\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
                }
            });
        });
        if (errorMessage.length > 0) {
            notice(errorMessage, true);
            return;
        }
        else {
            chrome.storage.local.set({ kw: [] });
            chrome.storage.local.set({ kw: newKeywords });
            notice('キーワードが保存されました。');
            viewKeywords();
        }
    });
    //<input> 作成 & 追加
    var addInput = function (parent, num, key, val, auto) {
        if (key === void 0) { key = ''; }
        if (val === void 0) { val = ''; }
        if (auto === void 0) { auto = false; }
        var $li = document.createElement('li');
        parent.appendChild($li);
        var $newInputKey = document.createElement('input');
        $newInputKey.type = 'text';
        $newInputKey.autocomplete = 'off';
        $newInputKey.id = 'k-' + num;
        $newInputKey.className = 'input';
        $newInputKey.setAttribute('value', key);
        $li.appendChild($newInputKey);
        var $arrow = document.createElement('span');
        $arrow.className = 'arrow';
        $li.appendChild($arrow);
        var $newInputVal = document.createElement('input');
        $newInputVal.type = 'text';
        $newInputVal.autocomplete = 'off';
        $newInputVal.id = 'v-' + num;
        $newInputVal.className = 'input';
        $newInputVal.setAttribute('value', val);
        $li.appendChild($newInputVal);
        var $x = document.createElement('span');
        $x.className = 'x';
        $x.textContent = '✖';
        $x.addEventListener('click', function () {
            $newInputKey.value = '';
            $newInputVal.value = '';
        });
        $li.appendChild($x);
        if (auto)
            $li.animate([{ opacity: '0' }, { opacity: '1' }], 1000);
    };
    // 全ての<input>が満たされたら<input>を自動で追加
    var aoutAddInput = function ($inputArea) {
        // ページ全体にaddEventして、そこが最後尾の<input>かを判定する方法で動的追加された<input>に対応
        document.addEventListener("change", function (e) {
            var _a;
            var numberOfInputs = document.querySelectorAll('#inputArea input').length / 2;
            var selectedId = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('id');
            if (selectedId === 'k-' + (numberOfInputs - 1)) {
                addInput($inputArea, numberOfInputs, '', '', true);
            }
        });
    };
    var notice = function (message, error) {
        if (error === void 0) { error = false; }
        var fontColor = error ? '#dc3545' : '#212529';
        var $notice = document.getElementById('notice');
        $notice.textContent = message;
        $notice.style.color = fontColor;
        $notice.animate([{ opacity: '0' }, { opacity: '1' }], 500);
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBQy9DLENBQUM7O0lBRUQsVUFBVTtJQUNWLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBQztRQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsT0FBTztZQUNyQyxZQUFZLEVBQUUsQ0FBQTtZQUNkLFdBQVcsRUFBRSxDQUFBO1lBQ2IsY0FBYyxFQUFFLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLFlBQVk7SUFDWixJQUFNLFlBQVksR0FBRztRQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsT0FBTztZQUNyQyxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBZ0IsQ0FBQTtZQUN0RSxVQUFVLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtZQUN6QixJQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUE4QixFQUFHLENBQVE7b0JBQzNELEtBQUssSUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO3dCQUNuQixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ25DO2dCQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNGLFFBQVEsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUN4QztpQkFBTTtnQkFDTCxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ3hC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