"use strict";
var initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' };
var settings;
chrome.storage.local.get(null, function (storage) {
    var _a;
    var stoKeys = Object.keys(storage);
    var inputTag = '';
    stoKeys.forEach(function (k, i) {
        // console.log('k',k)
        // console.log('i',i)
        inputTag +=
            "<div style=\"display:inline-flex\">\n      <input value=\"" + k + "\" class=\"input\" id=\"k-" + i + "\">\n      <span class=\"arrow\"></span>\n      <input value=\"" + storage[k] + "\" class=\"input\" id=\"v-" + i + "\">\n    </div><br>";
    });
    inputTag +=
        "<div style=\"display:inline-flex\">\n    <input value=\"\" class=\"input\" id=\"k-" + stoKeys.length + "\">\n    <span class=\"arrow\"></span>\n    <input value=\"\" class=\"input\" id=\"v-" + stoKeys.length + "\">\n  </div><br>";
    var $input = document.getElementById('input');
    if ($input)
        $input.innerHTML = inputTag;
    (_a = document.getElementById('save')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        for (var i = 0; i < stoKeys.length + 1; i++) {
            var newK = document.querySelector('#k-' + i);
            var newKey = newK.value;
            var newV = document.querySelector('#v-' + i);
            var newVal = newV.value;
            if (newKey && newVal) {
                //登録処理
                console.log(newK.value, ':', newV.value);
            }
        }
    });
});
var getSettings = function (storage) {
    if (storage) {
        console.log('load_inside');
        settings = storage;
    }
    else {
        settings = initialSettings;
        chrome.storage.local.set(settings);
    }
};
// if($kw) $kw.textContent = kw['コロナ']
// let myFunc = ():{[key: string]: string} => {
//   let getProfile = ()=>{
//   let profile = {
//     name: 'Suzuki Ichiro',
//     position : 'right'
//   }
//   return profile
//   }
//   return getProfile()
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsSUFBTSxlQUFlLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQTtBQUN2RCxJQUFJLFFBQXNCLENBQUE7QUFHMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLE9BQU87O0lBQ3JDLElBQU0sT0FBTyxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztRQUNuQixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLFFBQVE7WUFDUiwrREFDa0IsQ0FBQyxrQ0FBeUIsQ0FBQyx1RUFFM0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQ0FBeUIsQ0FBQyx3QkFDM0MsQ0FBQTtJQUNiLENBQUMsQ0FBQyxDQUFBO0lBQ0YsUUFBUTtRQUNSLHVGQUN3QyxPQUFPLENBQUMsTUFBTSw2RkFFZCxPQUFPLENBQUMsTUFBTSxzQkFDM0MsQ0FBQTtJQUNYLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0MsSUFBRyxNQUFNO1FBQUUsTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7SUFDdEMsTUFBQSxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDekQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQU0sSUFBSSxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNoRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQU0sSUFBSSxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNoRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUcsTUFBTSxJQUFJLE1BQU0sRUFBRTtnQkFDbkIsTUFBTTtnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUN2QztTQUNGO0lBQ0gsQ0FBQyxFQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFNLFdBQVcsR0FBRyxVQUFDLE9BQXFCO0lBQ3hDLElBQUcsT0FBTyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUMxQixRQUFRLEdBQUcsT0FBTyxDQUFBO0tBQ25CO1NBQU07UUFDTCxRQUFRLEdBQUcsZUFBZSxDQUFBO1FBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNuQztBQUNILENBQUMsQ0FBQTtBQUVELHNDQUFzQztBQUl0QywrQ0FBK0M7QUFDL0MsMkJBQTJCO0FBQzNCLG9CQUFvQjtBQUNwQiw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLE1BQU07QUFDTixtQkFBbUI7QUFDbkIsTUFBTTtBQUNOLHdCQUF3QjtBQUN4QixJQUFJIn0=