
//     document.addEventListener("animationstart",(event) => {
// 	console.log( event ) ;

// 	if ( document.readyState == "complete" ) {
// 		console.log( "読み込みが完了しました!!" ) ;
// 	}
// })
  document.addEventListener("DOMContentLoaded",() => {
  let kw:{ [index: string]: string}
  chrome.storage.local.get(null, (storage)=>{
    kw = storage
    console.log('storage:',kw)
    console.log('kw[コロナ]:',kw['コロナ'])
    console.log('kw[マスク]:',kw['マスク'])
  })
    document.addEventListener("mousedown",() => {
      // const replaceAll = (str: string, before: string, after: string): string => {
      //   return str.split(before).join(after);
      // };
  const ignores: string[] = ['OPTION', 'NOSCRIPT', 'FORM', 'HEAD', 'META', 'STYLE', 'SCRIPT', 'HTML']

  const isIgnore = (node: HTMLElement | ChildNode): boolean => {
    return ignores.some(val => {
        return val === node.parentNode?.nodeName
    })
  }


  console.log('storage_outside:',kw)
  

  const searchNode = (node: HTMLElement | ChildNode) => {
      if(node.nodeType === 3 && node.nodeValue && !isIgnore(node)){
      let str: string = node.nodeValue
      str = str.split('コロナ').join(kw['コロナ']);
      str = str.split('マスク').join(kw['マスク']);
      node.nodeValue = str
    } else if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
      let child: ChildNode | null = node.firstChild;
      while(child){
          searchNode(child);
          child = child.nextSibling;
      }
    }
  }
  searchNode(document.body)
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
})
})


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