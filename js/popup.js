"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
(function () {
    // メイン処理実行
    document.addEventListener("DOMContentLoaded", function () {
        chrome.storage.local.get(null, function (storage) {
            viewKeywords();
            onOffButton(storage);
            saveButton();
            visibilityButton(storage);
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
                        addInput(storage.visibility, $inputArea, i, k, obj[k]);
                    }
                });
                addInput(true, $inputArea, storage.kw.length);
            }
            else {
                addInput(true, $inputArea, 0);
            }
            aoutAddInput($inputArea);
        });
    };
    // 拡張機能 On Off ボタン
    var onOffButton = function (storage) {
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
            var _a;
            $on.className = 'btnOn';
            $off.className = 'btn';
            chrome.storage.local.set({ affect: true });
            (_a = document.getElementById('save')) === null || _a === void 0 ? void 0 : _a.click();
            notice('キーワードが保存され、変換機能が ON になりました。');
        });
        $off.addEventListener('click', function () {
            $on.className = 'btn';
            $off.className = 'btnOn';
            chrome.storage.local.set({ affect: false });
            notice('変換機能が OFF になりました。');
        });
    };
    //  キーワード更新
    var saveButton = function () {
        var _a;
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
    };
    // 変換前ワード非表示切り替えボタン
    var visibilityButton = function (storage) {
        var $btn = document.getElementById('visibility');
        $btn.addEventListener('click', function () {
            var numberOfInputs = document.getElementsByTagName('input').length / 2;
            if (storage.visibility) {
                for (var i = 0; i < numberOfInputs - 1; i++) {
                    var inputBefore = document.getElementById('k-' + i);
                    inputBefore.type = 'password';
                }
                storage.visibility = false;
                chrome.storage.local.set({ visibility: storage.visibility });
                notice('変換前を 非表示 にしました。');
            }
            else {
                for (var i = 0; i < numberOfInputs - 1; i++) {
                    var inputBefore = document.getElementById('k-' + i);
                    inputBefore.type = 'text';
                }
                storage.visibility = true;
                chrome.storage.local.set({ visibility: storage.visibility });
                notice('変換前を 表示 しました。');
            }
        });
    };
    //<input> 作成 & 追加
    var addInput = function (visibility, parent, num, key, val, auto) {
        if (visibility === void 0) { visibility = false; }
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
        if (!visibility)
            $newInputKey.type = 'password';
    };
    // 全ての<input>が満たされたら<input>を自動で追加
    var aoutAddInput = function ($inputArea) {
        // ページ全体にaddEventして、そこが最後尾の<input>かを判定する方法で動的追加された<input>に対応
        document.addEventListener("change", function (e) {
            var _a;
            var numberOfInputs = document.querySelectorAll('#inputArea input').length / 2;
            var selectedId = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('id');
            if (selectedId === 'k-' + (numberOfInputs - 1)) {
                addInput(true, $inputArea, numberOfInputs);
            }
        });
    };
    // 設定変更等のメッセージ  エラーは赤色
    var notice = function (message, error) {
        if (error === void 0) { error = false; }
        var fontColor = error ? '#dc3545' : '#212529';
        var $notice = document.getElementById('notice');
        $notice.textContent = message;
        $notice.style.color = fontColor;
        $notice.animate([{ opacity: '0' }, { opacity: '1' }], 500);
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBQy9DLENBQUM7SUFFRCxVQUFVO0lBQ1YsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFDO1FBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxPQUFPO1lBQ3JDLFlBQVksRUFBRSxDQUFBO1lBQ2QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3BCLFVBQVUsRUFBRSxDQUFBO1lBQ1osZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLFlBQVk7SUFDWixJQUFNLFlBQVksR0FBRztRQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsT0FBTztZQUNyQyxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBZ0IsQ0FBQTtZQUN0RSxVQUFVLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtZQUN6QixJQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUE4QixFQUFHLENBQVM7b0JBQzVELEtBQUssSUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO3dCQUNuQixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDdkQ7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxN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