"use strict";
// Copyright 2021 yn-nishi All Rights Reserved.
var _a;
// 設定内容を読み込んで表示
chrome.storage.local.get(null, function (storage) {
    var storageKeys = Object.keys(storage);
    var storageLength = Object.keys(storage).length;
    if (Object.keys(storage).length < 2)
        chrome.storage.local.set(initialSettings);
    var $inputArea = document.getElementById('input-area');
    storageKeys.forEach(function (k, i) {
        if (k !== 'extensionFunction') {
            addInput($inputArea, i, k, storage[k]);
        }
    });
    addInput($inputArea, storageLength);
    document.addEventListener("change", function (e) {
        var _a;
        var numberOfInputs = document.querySelectorAll('#input-area input').length / 2;
        console.log(numberOfInputs);
        var selectedId = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('id');
        if (selectedId === 'k-' + (numberOfInputs - 1)) {
            addInput($inputArea, numberOfInputs);
        }
    });
});
// 設定更新処理
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
    parent.appendChild($div);
    var $newInputKey = document.createElement('input');
    $newInputKey.type = 'search';
    $newInputKey.className = 'rounded-circle ml-1 w-25';
    $newInputKey.id = 'k-' + num;
    // $newInputKey.style.display = 'inline'
    $newInputKey.className = 'input';
    $newInputKey.setAttribute('value', key);
    $div.appendChild($newInputKey);
    var $arrow = document.createElement('div');
    $arrow.className = 'arrow';
    $div.appendChild($arrow);
    var $newInputVal = document.createElement('input');
    $newInputVal.type = 'search';
    $newInputVal.className = 'input rounded ml-1';
    $newInputVal.id = 'v-' + num;
    // $newInputVal.style.display = 'inline'
    $newInputVal.className = 'input';
    $newInputVal.setAttribute('value', val);
    $div.appendChild($newInputVal);
};
var initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDOztBQUUvQyxlQUFlO0FBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLE9BQU87SUFDckMsSUFBTSxXQUFXLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNsRCxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUNqRCxJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7UUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDN0UsSUFBTSxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDckUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUcsQ0FBQyxLQUFLLG1CQUFtQixFQUFFO1lBQzVCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN2QztJQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0YsUUFBUSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUNuQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQzs7UUFDbEMsSUFBTSxjQUFjLEdBQVcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzNCLElBQU0sVUFBVSxTQUFz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