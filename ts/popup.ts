// Copyright 2021 yn-nishi All Rights Reserved.
   
// 設定内容を読み込んで表示
chrome.storage.local.get(null, (storage)=>{
  const storageKeys: string[] = Object.keys(storage)
  const storageLength = Object.keys(storage).length
  if(Object.keys(storage).length < 2) chrome.storage.local.set(initialSettings)
  const $inputArea = <HTMLElement>document.getElementById('input-area')
  storageKeys.forEach((k, i) => {
    if(k !== 'extensionFunction') {
      addInput($inputArea, i, k, storage[k])
    }
  })
  addInput($inputArea, storageLength)
  document.addEventListener("change", (e) => {
      const numberOfInputs: number = document.querySelectorAll('#input-area input').length / 2
      console.log(numberOfInputs)
      const selectedId = (<HTMLInputElement>e.target)?.getAttribute('id')
      if(selectedId === 'k-'+ (numberOfInputs - 1)) {
      addInput($inputArea, numberOfInputs)
      }
  })
})

// 設定更新処理
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
  parent.appendChild($div)
  const $newInputKey = <HTMLInputElement>document.createElement('input')
  $newInputKey.type = 'search'
  $newInputKey.className = 'rounded-circle ml-1 w-25'
  $newInputKey.id = 'k-' + num
  // $newInputKey.style.display = 'inline'
  $newInputKey.className = 'input'
  $newInputKey.setAttribute('value', key);
  $div.appendChild($newInputKey)
  const $arrow = document.createElement('div')
  $arrow.className = 'arrow'
  $div.appendChild($arrow)
  const $newInputVal = document.createElement('input')
  $newInputVal.type = 'search'
  $newInputVal.className = 'input rounded ml-1'
  $newInputVal.id = 'v-' + num
  // $newInputVal.style.display = 'inline'
  $newInputVal.className = 'input'
  $newInputVal.setAttribute('value', val);
  $div.appendChild($newInputVal)
}

const initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' }   
