// Copyright 2021 yn-nishi All Rights Reserved.
document.addEventListener("DOMContentLoaded",() => {

  chrome.storage.local.get(null, (storage)=>{

    // メイン処理関数
    const changeKeyword = (node: HTMLElement | ChildNode) => {
      if(node.nodeType === 3 && !isIgnore(node)){
        Object.keys(storage).forEach( key => {
          node.nodeValue = (<string>node.nodeValue).split(key).join(storage[key]);
        })
      } else if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
        let child: ChildNode | null = node.firstChild;
        while(child){
          changeKeyword(child);
          child = child.nextSibling;
        }
      }
    }

    // 処理しないタグ
    const isIgnore = (node: HTMLElement | ChildNode): boolean => {
      const ignores: string[] = ['OPTION', 'NOSCRIPT', 'FORM', 'HEAD', 'META', 'STYLE', 'SCRIPT', 'HTML']
      return ignores.indexOf(<string>node.parentNode?.nodeName) > -1
    }

    // DOMの動的変更を監視
    const observer = new MutationObserver(() => {
      observer.disconnect()
      new Promise((resolve) => {
        // 処理負荷軽減のため最短1.5秒間隔
        setTimeout(() => { resolve(null)}, 1500 )
      })
      .then(()=>{ changeKeyword(document.body) })
      .then(()=>{ observer.observe(document.body, config) })
      })
    const config = {
      subtree: true,
      attributes: true
    }

    if(Object.keys(storage).length < 2) chrome.storage.local.set(initialSettings)
    //メイン処理実行命令
    changeKeyword(document.body)
    observer.observe(document.body, config);
  })
})