// Copyright 2021 yn-nishi All Rights Reserved.

// 設定内容表示(メイン処理)
chrome.storage.local.get(null, (storage)=>{
  loadSettings(storage)
  const $inputArea = document.getElementById('input-area') as HTMLElement
  Object.keys(storage.kw).forEach((k, i) => {
    if(k !== 'extensionFunction') {
      addInput($inputArea, i, k, storage.kw[k])
    }
  })
  addInput($inputArea, Object.keys(storage.kw).length)
  document.addEventListener("change", (e) => {
      const numberOfInputs: number = document.querySelectorAll('#input-area input').length / 2
      console.log('全部で',numberOfInputs,'行あるよ')
      const selectedId = (<HTMLInputElement>e.target)?.getAttribute('id')
      if(selectedId === 'k-'+ (numberOfInputs - 1)) {
      addInput($inputArea, numberOfInputs)
      }
  })
})

// 設定初期化
const loadSettings = (storage:{ [key: string]: string|boolean }) => {
  console.log('読み込み一発目の現在の設定')
  console.log(storage)
  if(Object.keys(storage.kw).length < 2) {
    chrome.storage.local.set(initialSettings)
    console.log(initialSettings,'初期設定が設定されました')
    console.log(storage)
  }
  const $switch = document.getElementById('customSwitch1')
  $switch?.addEventListener('change', () => {
    storage.affect = (<HTMLInputElement>$switch).checked
    chrome.storage.local.set({ 'affect':  storage.affect})
    console.log('affectの設定が',storage.affect,'に変更されました')
    console.log(storage)
  })
}
// 設定更新
document.getElementById('save')?.addEventListener('click', ()=>{
  chrome.storage.local.set({ kw: {} })
  const newKw: { [key: string]: string } = {}
  const numberOfInputs: number = document.getElementsByTagName('input').length / 2
  for (let i = 0; i < numberOfInputs - 1; i++) {
    const newK = document.getElementById('k-' + i) as HTMLInputElement
    let newKey = newK.value.trim()
    const newV = document.getElementById('v-' + i)  as HTMLInputElement
    let newVal = newV.value
    if(newKey.length > 0) {
      newKw[newKey] = newVal
    }
  }
  chrome.storage.local.set({ kw: newKw })
  notice('設定が保存されました。')
  // chrome.storage.local.get(null, (storage)=>{
  //   console.log('設定完了')
  //   console.log(storage)
  // })
  // location.reload()
})

//<input> 作成 & 追加
const addInput = (parent: HTMLElement, num: number, key: string = '', val: string ='') => {
  const $div = document.createElement('div')
  $div.className = 'input-pair'
  parent.appendChild($div)
  const $newInputKey = document.createElement('input')
  $newInputKey.type = 'search'
  $newInputKey.id = 'k-' + num
  $newInputKey.className = 'input'
  $newInputKey.setAttribute('value', key);
  $div.appendChild($newInputKey)
  const $arrow = document.createElement('div')
  $arrow.className = 'arrow'
  $div.appendChild($arrow)
  const $newInputVal = document.createElement('input')
  $newInputVal.type = 'search'
  $newInputVal.id = 'v-' + num
  $newInputVal.className = 'input'
  $newInputVal.setAttribute('value', val);
  $div.appendChild($newInputVal)
}

const initialSettings = {
  affect: true,
  kw: {
    'コロナ': 'コーラ',
    'マスク': 'フリスク'
  }
}

const notice = (message: string) => {
  const $notice = document.getElementById('notice') as HTMLElement
  $notice.textContent = message
}
  // chrome.storage.local.clear()