// Copyright 2021 yn-nishi All Rights Reserved.
(()=>{

type Storage = { [key: string]: string }
// 設定内容表示

document.addEventListener("DOMContentLoaded",() => {
chrome.storage.local.get(null, (storage)=>{
  viewKeywords()
  onOffSwithch()
  clearButton()
  console.log(storage)
})
})

// 登録キーワード表示
const viewKeywords = () => {
  chrome.storage.local.get(null, (storage)=>{
    console.log('viewPage');console.log(storage)
    const $inputArea = document.getElementById('input-area') as HTMLElement
    $inputArea.innerHTML = ''
    if(storage.kw.length > 0) {
      storage.kw.forEach((obj: Storage , i:number) => {
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

// on-off switch
const onOffSwithch = () => {
  chrome.storage.local.get(null, (storage)=>{
    const $switch = document.getElementById('customSwitch1') as HTMLInputElement
    $switch.checked = storage.affect
    $switch.addEventListener('change', () => {
      storage.affect = $switch.checked
      chrome.storage.local.set( { affect:  storage.affect } )
    })
  })
}

const clearButton = () => {
  const $switch = document.getElementById('clear')
  $switch?.addEventListener('click', () => {
    const res = confirm('全て削除してよろしいですか？');
    if(res) {
      // chrome.storage.local.clear()
      chrome.storage.local.set({ kw: {} })
      viewKeywords()
    }
  })
}
//  キーワード更新
document.getElementById('save')?.addEventListener('click', ()=>{
  chrome.storage.local.set({ kw: [] })
  let newKeywords: { [key: string]: string }[] = []
  const numberOfInputs: number = document.getElementsByTagName('input').length / 2
  for (let i = 0; i < numberOfInputs - 1; i++) {
    const newK = document.getElementById('k-' + i) as HTMLInputElement
    let newKey = newK.value.trim()
    const newV = document.getElementById('v-' + i)  as HTMLInputElement
    let newVal = newV.value
    if(newKey.length > 0) {
      newKeywords.push ( { [newKey]: newVal } )
    }
  }
  chrome.storage.local.set({ kw: newKeywords })
  notice('設定が保存されました。')
  viewKeywords()
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

const aoutAddInput = ($inputArea: HTMLElement)=>{
  document.addEventListener("change", (e) => {
    const numberOfInputs: number = document.querySelectorAll('#input-area input').length / 2
    // console.log('全部で',numberOfInputs,'行あるよ')
    const selectedId = (<HTMLInputElement>e.target)?.getAttribute('id')
    if(selectedId === 'k-'+ (numberOfInputs - 1)) {
    addInput($inputArea, numberOfInputs)
    }
  })
  }

const notice = (message: string) => {
  const $notice = document.getElementById('notice') as HTMLElement
  $notice.textContent += message
}
  // chrome.storage.local.clear()


})()





// const viewPage = () => {
//   chrome.storage.local.get('kw', (kw)=>{
//     console.log('viewPage');console.log(kw)
//     // onOffSwithch(storage)
//     // clearButton()
//     const $inputArea = document.getElementById('input-area') as HTMLElement
//     $inputArea.innerHTML = ''
//     Object.keys(kw).forEach((key, i) => {
//       addInput($inputArea, i, key, kw[key])
//     })
//     addInput($inputArea, Object.keys(kw).length)
//     document.addEventListener("change", (e) => {
//         const numberOfInputs: number = document.querySelectorAll('#input-area input').length / 2
//         // console.log('全部で',numberOfInputs,'行あるよ')
//         const selectedId = (<HTMLInputElement>e.target)?.getAttribute('id')
//         if(selectedId === 'k-'+ (numberOfInputs - 1)) {
//         addInput($inputArea, numberOfInputs)
//         }
//     })
//   })
// }