// Copyright 2021 yn-nishi All Rights Reserved.
document.addEventListener("DOMContentLoaded",() => {
  chrome.storage.local.get(null, (storage)=>{

    // メイン処理
    const changeKeyword = (node: HTMLElement | ChildNode) => {
      console.log('動作2')
      const type = node.nodeType
      if(type === 3 && !isIgnore(node)) {
        Object.keys(storage).forEach( key => {
          node.nodeValue = (<string>node.nodeValue).split(key).join(storage[key]);
        })
      } else if (type === 1 || type === 9 || type === 11) {
        let child: ChildNode | null = node.firstChild;
        while(child){
          changeKeyword(child);
          child = child.nextSibling;
        }
      }
    }

    // 設定読み込み
    const loadSettings = () => {
      if(Object.keys(storage).length < 2) {
        chrome.storage.local.set(initialSettings)
        console.log(initialSettings)
      }
      if(storage.extensionFunction === undefined) {
        chrome.storage.local.set({'extensionFunction': true});
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
      .then(()=>{ 
        // if((<HTMLElement>document.activeElement).isContentEditable === false){
          if((<HTMLElement>document.activeElement).isContentEditable === false && storage.extensionFunction){
          console.log('動作1-2')
          console.log(storage)
          // changeKeyword(document.body)
        }
      })
      .then(()=>{ observer.observe(document.body, config) })
      })
    const config = {
      subtree: true,
      attributes: true
    }


    // メイン処理実行命令
    loadSettings()
    if(storage.extensionFunction) {
      // changeKeyword(document.body)
      console.log('動作1-1')
      console.log(storage)
    }
    observer.observe(document.body, config)
  })

  const initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' }   
})

