"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
var _a;
// 設定内容表示(メイン処理)
chrome.storage.local.get(null, function (storage) {
    loadSettings(storage);
    // const $switch = document.getElementById('customSwitch1');
    // $switch?.setAttribute('checked', storage['extensionFunction'])
    var $inputArea = document.getElementById('input-area');
    Object.keys(storage).forEach(function (k, i) {
        if (k !== 'extensionFunction') {
            addInput($inputArea, i, k, storage[k]);
        }
    });
    addInput($inputArea, Object.keys(storage).length);
    document.addEventListener("change", function (e) {
        var _a;
        var numberOfInputs = document.querySelectorAll('#input-area input').length / 2;
        // console.log(numberOfInputs,'行')
        var selectedId = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('id');
        if (selectedId === 'k-' + (numberOfInputs - 1)) {
            addInput($inputArea, numberOfInputs);
        }
    });
});
// 設定初期化
var loadSettings = function (storage) {
    if (Object.keys(storage).length < 2) {
        chrome.storage.local.set(initialSettings);
        console.log(initialSettings, 'が設定されました');
    }
    var $switch = document.getElementById('customSwitch1');
    if (storage.extensionFunction === undefined) {
        $switch.checked = true;
        storage.extensionFunction = true;
        chrome.storage.local.set({ 'extensionFunction': true });
        console.log('extensionFunctionが未設定だったのでtrueに設定されました');
    }
    $switch === null || $switch === void 0 ? void 0 : $switch.addEventListener('change', function () {
        storage.extensionFunction = $switch.checked;
        chrome.storage.local.set({ 'extensionFunction': storage.extensionFunction });
        console.log('extensionFunctionの設定が', storage.extensionFunction, 'に変更されました');
        console.log(storage);
    });
};
// 設定更新
(_a = document.getElementById('save')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var _a;
    chrome.storage.local.clear();
    var numberOfInputs = document.getElementsByTagName('input').length / 2;
    for (var i = 0; i < numberOfInputs - 1; i++) {
        var newK = document.getElementById('k-' + i);
        var newKey = newK.value.trim();
        var newV = document.getElementById('v-' + i);
        var newVal = newV.value;
        if (newKey && newKey !== 'extensionFunction') {
            chrome.storage.local.set((_a = {}, _a[newKey] = newVal, _a));
        }
    }
    location.reload();
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
var initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDOztBQUUvQyxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLE9BQU87SUFDckMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JCLDREQUE0RDtJQUM1RCxpRUFBaUU7SUFDakUsSUFBTSxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDckUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztRQUNoQyxJQUFHLENBQUMsS0FBSyxtQkFBbUIsRUFBRTtZQUM1QixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDdkM7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNGLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQzs7UUFDbEMsSUFBTSxjQUFjLEdBQVcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN4RixrQ0FBa0M7UUFDbEMsSUFBTSxVQUFVLFNBQXNCLENBQUMsQ0FBQyxNQUFPLDBDQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuRSxJQUFHLFVBQVUsS0FBSyxJQUFJLEdBQUUsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDOUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQTtT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