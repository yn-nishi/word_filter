"use strict";
//     document.addEventListener("animationstart",(event) => {
// 	console.log( event ) ;
// 	if ( document.readyState == "complete" ) {
// 		console.log( "読み込みが完了しました!!" ) ;
// 	}
// })
document.addEventListener("DOMContentLoaded", function () {
    var kw;
    chrome.storage.local.get(null, function (storage) {
        kw = storage;
        console.log('storage:', kw);
        console.log('kw[コロナ]:', kw['コロナ']);
        console.log('kw[マスク]:', kw['マスク']);
    });
    document.addEventListener("mousedown", function () {
        // const replaceAll = (str: string, before: string, after: string): string => {
        //   return str.split(before).join(after);
        // };
        var ignores = ['OPTION', 'NOSCRIPT', 'FORM', 'HEAD', 'META', 'STYLE', 'SCRIPT', 'HTML'];
        var isIgnore = function (node) {
            return ignores.some(function (val) {
                var _a;
                return val === ((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName);
            });
        };
        console.log('storage_outside:', kw);
        var searchNode = function (node) {
            if (node.nodeType === 3 && node.nodeValue && !isIgnore(node)) {
                var str = node.nodeValue;
                str = str.split('コロナ').join(kw['コロナ']);
                str = str.split('マスク').join(kw['マスク']);
                node.nodeValue = str;
            }
            else if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
                var child = node.firstChild;
                while (child) {
                    searchNode(child);
                    child = child.nextSibling;
                }
            }
        };
        searchNode(document.body);
        // document.addEventListener("readystatechange",() => {
        // document.addEventListener("transitionrun",() => {
        // console.log( 'aaaa',document.readyState ) ;
        // let all = document.getElementsByTagName('*')
        // const allText = document.getElementsByTagName('html')[0].innerText
        // console.log(all)
        // for (let i = 0; i < all.length; i++) {
        // console.log( all[i].nodeName )
        // console.log( all[i].textContent )
        // }
        // console.log(all2)
        // const replaceAll = (str: string, before: string, after: string): string => {
        //   return str.split(before).join(after);
        // };
        // const searchNode = (node:HTMLElement) => {
        //   const div = document.getElementsByTagName('div')[0]
        //       console.log(div.firstChild)
        //   }
        // searchNode(document.documentElement)
        // searchNode(document.body)
        // DOM変更を監視
        // const observer = new MutationObserver(() => {
        //   observer.disconnect()
        //   new Promise((resolve) => {
        //     setTimeout(() => { resolve(null)}, 1000 )
        //   })
        //   .then(()=>{ searchNode(document.body) })
        //   .then(()=>{ console.log('counter') })
        //   .then(()=>{ observer.observe(document.body, config) })
        //   })
        // const config = {
        //   subtree: true,
        //   attributes: true
        // }
        // observer.observe(document.body, config);
        // })
    });
});
//////
// const replaceAll = (str: string, before: string, after: string): string => {
//   return str.split(before).join(after);
// };
// const searchNode = (node:any) => {
//   // console.log('counter3')
//   let childNode;
//   let nextSibling;
//   if(node.nodeType === 3){
//     const text = replaceAll(node.nodeValue, "。", "ザマス！！");
//       node.nodeValue = replaceAll(text, "マスク", "コーラ");
//   } else if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
//     childNode = node.firstChild;
//     while(childNode){
//         nextSibling = childNode.nextSibling;
//         searchNode(childNode);
//         childNode = nextSibling;
//     }
//   }
// }
//////
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDhEQUE4RDtBQUM5RCwwQkFBMEI7QUFFMUIsOENBQThDO0FBQzlDLHFDQUFxQztBQUNyQyxLQUFLO0FBQ0wsS0FBSztBQUNILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBQztJQUM3QyxJQUFJLEVBQTZCLENBQUE7SUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLE9BQU87UUFDckMsRUFBRSxHQUFHLE9BQU8sQ0FBQTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQyxDQUFBO0lBQ0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBQztRQUNwQywrRUFBK0U7UUFDL0UsMENBQTBDO1FBQzFDLEtBQUs7UUFDVCxJQUFNLE9BQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUVuRyxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQTZCO1lBQzdDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7O2dCQUNuQixPQUFPLEdBQUcsWUFBSyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxRQUFRLENBQUEsQ0FBQTtZQUM1QyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQTtRQUdELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsRUFBRSxDQUFDLENBQUE7UUFHbEMsSUFBTSxVQUFVLEdBQUcsVUFBQyxJQUE2QjtZQUM3QyxJQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQzVELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUE7Z0JBQ2hDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTthQUNyQjtpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFO2dCQUM3RSxJQUFJLEtBQUssR0FBcUIsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUMsT0FBTSxLQUFLLEVBQUM7b0JBQ1IsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsQixLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztpQkFDN0I7YUFDRjtRQUNILENBQUMsQ0FBQTtRQUNELFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0IsdURBQXVEO1FBQ3ZELG9EQUFvRDtRQUNsRCw4Q0FBOEM7UUFFOUMsK0NBQStDO1FBQy9DLHFFQUFxRTtRQUNyRSxtQkFBbUI7UUFDbkIseUNBQXlDO1FBQ3ZDLGlDQUFpQztRQUNqQyxvQ0FBb0M7UUFFdEMsSUFBSTtRQUNKLG9CQUFvQjtRQUdwQiwrRUFBK0U7UUFDL0UsMENBQTBDO1FBQzFDLEtBQUs7UUFFTCw2Q0FBNkM7UUFDN0Msd0RBQXdEO1FBQ3hELG9DQUFvQztRQUNwQyxNQUFNO1FBRUosdUNBQXVDO1FBQ3ZDLDRCQUE0QjtRQUloQyxXQUFXO1FBQ1QsZ0RBQWdEO1FBQ2hELDBCQUEwQjtRQUMxQiwrQkFBK0I7UUFDL0IsZ0RBQWdEO1FBQ2hELE9BQU87UUFDUCw2Q0FBNkM7UUFDN0MsMENBQTBDO1FBQzFDLDJEQUEyRDtRQUMzRCxPQUFPO1FBQ1AsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsSUFBSTtRQUNKLDJDQUEyQztRQUkzQyxLQUFLO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDRixDQUFDLENBQUMsQ0FBQTtBQUdGLE1BQU07QUFDTiwrRUFBK0U7QUFDL0UsMENBQTBDO0FBQzFDLEtBQUs7QUFFTCxxQ0FBcUM7QUFDckMsK0JBQStCO0FBQy9CLG1CQUFtQjtBQUNuQixxQkFBcUI7QUFDckIsNkJBQTZCO0FBQzdCLDZEQUE2RDtBQUM3RCx5REFBeUQ7QUFDekQscUZBQXFGO0FBQ3JGLG1DQUFtQztBQUNuQyx3QkFBd0I7QUFDeEIsK0NBQStDO0FBQy9DLGlDQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkMsUUFBUTtBQUNSLE1BQU07QUFDTixJQUFJO0FBQ0osTUFBTSJ9