// Copyright 2021 yn-nishi All Rights Reserved.
(()=>{

  // メイン処理
  document.addEventListener('DOMContentLoaded',() => {
    chrome.storage.local.get(null, (storage)=>{
      initializeSettings(storage)
      if(storage.affect && storage.kw.length > 0) {
        changeTitle(storage)
        changeBody(document.body, storage)
        observer.observe(document.body, config)
      }
    })
  })

  // 設定初期化
  const initializeSettings = (storage: { [key: string]: any } ) => {
    const initialSettings = {
      affect: true,
      kw: [ { 'コロナ': 'コーラ' }, { 'マスク': 'フリスク' } ]
    }
    if(storage.affect === undefined ) {
      chrome.storage.local.set(initialSettings)
    }
  }

  // <body>配下の文字列置換
  interface ChangeBody {
    (node: HTMLElement | ChildNode, storage: { [key: string]: any } ): void
  }
  const changeBody: ChangeBody = (node, storage) => {
    const type = node.nodeType
    if(type === 3 && !isIgnore(node)) {
        storage.kw.forEach((obj: Storage) => {
          for (const k in obj) {
            node.nodeValue = (<string>node.nodeValue).split(k).join( obj[k] )
          }
        })
    } else if (type === 1 || type === 9 || type === 11) {
      let child: ChildNode | null = node.firstChild;
      while(child){
        changeBody(child, storage);
        child = child.nextSibling;
      }
    }
  }
  //<title>の文字列置換
  const changeTitle = (storage : { [key: string]: any }) => {
    storage.kw.forEach((obj: Storage) => {
      for (const k in obj) {
        document.title = document.title.split(k).join( obj[k] )
      }
    })
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
    }).then(()=>{
      chrome.storage.local.get(null, (storage)=>{
        if( !isEditing() && storage.affect){
        console.log('監視の反応あり')
        changeTitle(storage)
        changeBody(document.body, storage)
        }
      })
    }).then(()=>{ observer.observe(document.body, config) })
    })
  const config = {
    subtree: true,
    attributes: true
  }
  const isEditing = () => {
    return (<HTMLElement>document.activeElement).isContentEditable
  }
})()


  // chrome.storage.local.clear()