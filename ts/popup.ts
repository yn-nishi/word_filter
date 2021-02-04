// Copyright 2021 yn-nishi All Rights Reserved.

// 設定内容表示(メイン処理)
chrome.storage.local.get(null, (storage)=>{
  loadSettings(storage)
  // const $switch = document.getElementById('customSwitch1');
  // $switch?.setAttribute('checked', storage['extensionFunction'])
  const $inputArea = <HTMLElement>document.getElementById('input-area')
  Object.keys(storage).forEach((k, i) => {
    if(k !== 'extensionFunction') {
      addInput($inputArea, i, k, storage[k])
    }
  })
  addInput($inputArea, Object.keys(storage).length)
  document.addEventListener("change", (e) => {
      const numberOfInputs: number = document.querySelectorAll('#input-area input').length / 2
      // console.log(numberOfInputs,'行')
      const selectedId = (<HTMLInputElement>e.target)?.getAttribute('id')
      if(selectedId === 'k-'+ (numberOfInputs - 1)) {
      addInput($inputArea, numberOfInputs)
      }
  })
})

// 設定初期化
const loadSettings = (storage:{ [key: string]: string|boolean }) => {
  if(Object.keys(storage).length < 2) {
    chrome.storage.local.set(initialSettings)
    console.log(initialSettings,'が設定されました')
  }
  const $switch = document.getElementById('customSwitch1')
  if(storage.extensionFunction === undefined) {
    (<HTMLInputElement>$switch).checked = true
    storage.extensionFunction = true
    chrome.storage.local.set({'extensionFunction': true})
    console.log('extensionFunctionが未設定だったのでtrueに設定されました')
  }
  $switch?.addEventListener('change', () => {
    storage.extensionFunction = (<HTMLInputElement>$switch).checked
    chrome.storage.local.set({ 'extensionFunction':  storage.extensionFunction})
    console.log('extensionFunctionの設定が',storage.extensionFunction,'に変更されました')
    console.log(storage)
  })
}
// 設定更新
document.getElementById('save')?.addEventListener('click', ()=>{
  chrome.storage.local.clear()
  const numberOfInputs: number = document.getElementsByTagName('input').length / 2
  for (let i = 0; i < numberOfInputs - 1; i++) {
    const newK = <HTMLInputElement>document.getElementById('k-' + i)
    let newKey = newK.value.trim()
    const newV = <HTMLInputElement>document.getElementById('v-' + i)
    let newVal = newV.value
    if(newKey && newKey !== 'extensionFunction') {
      chrome.storage.local.set({ [newKey]: newVal })
    }
  }
  location.reload()
})

//<input> 作成 & 追加
const addInput = (parent: HTMLElement, num: number, key: string = '', val: string ='') => {
  const $div = document.createElement('div')
  $div.className = 'input-pair'
  parent.appendChild($div)
  const $newInputKey = <HTMLInputElement>document.createElement('input')
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

const initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' }
