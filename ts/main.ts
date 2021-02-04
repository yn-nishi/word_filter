// Copyright 2021 yn-nishi All Rights Reserved.
document.addEventListener("DOMContentLoaded",() => {
  // chrome.storage.local.clear()

  chrome.storage.local.get(null, (storage)=>{

    // メイン処理
    const changeKeyword = (node: HTMLElement | ChildNode) => {
      const type = node.nodeType
      if(type === 3 && !isIgnore(node)) {
        Object.keys(storage.kw).forEach( key => {
          node.nodeValue = (<string>node.nodeValue).split(key).join(storage.kw[key]);
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
      if(Object.keys(storage.kw).length < 2) {
        chrome.storage.local.set(initialSettings)
      }
      console.log('設定読み込み',storage)
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
          if((<HTMLElement>document.activeElement).isContentEditable === false && storage.affect){
          console.log('監視の反応あり')
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
    if(storage.affect) {
      changeKeyword(document.body)
      console.log('メイン処理実行命令')
    }
    observer.observe(document.body, config)
  })

  const initialSettings = {
    affect: true,
    kw: {
      'コロナ': 'コーラ',
      'マスク': 'フリスク'
    }
  }
})

