// Copyright 2021 yn-nishi All Rights Reserved.
(()=>{

// メイン処理実行
document.addEventListener("DOMContentLoaded",() => {
  chrome.storage.local.get(null, (storage)=>{
    viewKeywords()
    onOffButton()
    allClearButton()
  })
})

// 登録キーワード表示
const viewKeywords = () => {
  chrome.storage.local.get(null, (storage)=>{
    const $inputArea = document.getElementById('inputArea') as HTMLElement
    $inputArea.innerHTML = ''
    if(storage.kw.length > 0) {
      storage.kw.forEach((obj: { [key: string]: string } , i:number) => {
        for (const k in obj) {
          addInput($inputArea, i, k, obj[k])
        }
      })
      addInput($inputArea, storage.kw.length)
    } else {
      addInput($inputArea, 0)
    }
    aoutAddInput($inputArea)
  })
}


// function affect button
const onOffButton = () => {
  chrome.storage.local.get(null, (storage)=>{
    const $on = document.getElementById('on') as HTMLInputElement
    const $off = document.getElementById('off') as HTMLInputElement
    if(storage.affect) {
      $on.className = 'btnOn'
      $off.className = 'btn'
    } else {
      $on.className = 'btn'
      $off.className = 'btnOn'
    }
    $on.addEventListener('click', () => {
      $on.className = 'btnOn'
      $off.className = 'btn'
      chrome.storage.local.set({ affect: true })
      notice('変換機能が ON になりました。')
    })
    $off.addEventListener('click', () => {
      $on.className = 'btn'
      $off.className = 'btnOn'
      chrome.storage.local.set({ affect: false })
      notice('変換機能が OFF になりました。')
    })
  })
}

const allClearButton = () => {
  const $switch = document.getElementById('clear')
  $switch?.addEventListener('click', () => {
    const res = confirm('全て削除してよろしいですか？');
    if(res) {
      chrome.storage.local.set({ kw: {} })
      notice('キーワードが全て削除されました。')
      viewKeywords()
    }
  })
}

//  キーワード更新
document.getElementById('save')?.addEventListener('click', ()=>{
  const checkKeyArray: string[] = []
  const checkValArray: string[] = []
  const newKeywords: { [key: string]: string }[] = []
  const numberOfInputs: number = document.getElementsByTagName('input').length / 2
  for (let i = 0; i < numberOfInputs - 1; i++) {
    const newK = document.getElementById('k-' + i) as HTMLInputElement
    let newKey = newK.value.trim()
    const newV = document.getElementById('v-' + i)  as HTMLInputElement
    let newVal = newV.value
    if(newKey.length > 0) {
      checkKeyArray.push(newKey)
      checkValArray.push(newVal)
      newKeywords.push ({ [newKey]: newVal })
    }
  }
  let errorMessage = ''
  checkKeyArray.forEach((k, kI)=>{
    checkValArray.forEach((v,vI) => {
      if(v.indexOf(k) > -1) {
        errorMessage += `${kI + 1}番目の「${k}」が${vI + 1}番目の「${v}」の中に含まれています。変換ループが発生するので修正してください。`
      }
    })
  })
  if(errorMessage.length > 0) {
    notice(errorMessage, true)
    return
  } else {
    chrome.storage.local.set({ kw: [] })
    chrome.storage.local.set({ kw: newKeywords })
    notice('キーワードが保存されました。')
    viewKeywords()
  }
})

//<input> 作成 & 追加
const addInput = (parent: HTMLElement, num: number, key: string = '', val: string = '', auto: boolean = false) => {
  const $li = document.createElement('li')
  parent.appendChild($li)
  const $newInputKey = document.createElement('input')
  $newInputKey.type = 'text'
  $newInputKey.autocomplete = 'off'
  $newInputKey.id = 'k-' + num
  $newInputKey.className = 'input'
  $newInputKey.setAttribute('value', key);
  $li.appendChild($newInputKey)
  const $arrow = document.createElement('span')
  $arrow.className = 'arrow'
  $li.appendChild($arrow)
  const $newInputVal = document.createElement('input')
  $newInputVal.type = 'text'
  $newInputVal.autocomplete = 'off'
  $newInputVal.id = 'v-' + num
  $newInputVal.className = 'input'
  $newInputVal.setAttribute('value', val);
  $li.appendChild($newInputVal)
  const $x = document.createElement('span')
  $x.className = 'x'
  $x.textContent = '✖'
  $x.addEventListener('click', () => {
    $newInputKey.value = ''
    $newInputVal.value = ''
  })
  $li.appendChild($x)
  if(auto) $li.animate([{opacity: '0'}, {opacity: '1'}], 1000)
}

// 全ての<input>が満たされたら<input>を自動で追加
const aoutAddInput = ($inputArea: HTMLElement)=>{
  // ページ全体にaddEventして、そこが最後尾の<input>かを判定する方法で動的追加された<input>に対応
  document.addEventListener("change", (e) => {
    const numberOfInputs: number = document.querySelectorAll('#inputArea input').length / 2
    const selectedId = (<HTMLInputElement>e.target)?.getAttribute('id')
    if(selectedId === 'k-'+ (numberOfInputs - 1)) {
    addInput($inputArea, numberOfInputs, '', '', true)
    }
  })
}

const notice = (message: string, error:boolean = false) => {
  const fontColor = error ? '#dc3545' : '#212529'
  const $notice = document.getElementById('notice') as HTMLElement
  $notice.textContent = message
  $notice.style.color = fontColor
  $notice.animate([{opacity: '0'}, {opacity: '1'}], 500)
}

})()