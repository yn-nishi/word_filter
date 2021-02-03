
interface LocalStorage {
  [key: string]: string
}
const initialSettings = { 'コロナ': 'コーラ', 'マスク': 'フリスク' }
let settings: LocalStorage


chrome.storage.local.get(null, (storage)=>{
  const stoKeys: string[] = Object.keys(storage)
  let inputTag = ''
  stoKeys.forEach((k, i) => {
    // console.log('k',k)
    // console.log('i',i)
    inputTag +=
    `<div style="display:inline-flex">
      <input value="${k}" class="input" id="k-${i}">
      <span class="arrow"></span>
      <input value="${storage[k]}" class="input" id="v-${i}">
    </div><br>`
  })
  inputTag +=
  `<div style="display:inline-flex">
    <input value="" class="input" id="k-${stoKeys.length}">
    <span class="arrow"></span>
    <input value="" class="input" id="v-${stoKeys.length}">
  </div><br>`
  const $input = document.getElementById('input')
  if($input) $input.innerHTML = inputTag
  document.getElementById('save')?.addEventListener('click', ()=>{
    for (let i = 0; i < stoKeys.length + 1; i++) {
      const newK = <HTMLInputElement>document.querySelector('#k-' + i)
      const newKey = newK.value
      const newV = <HTMLInputElement>document.querySelector('#v-' + i)
      const newVal = newV.value
      if(newKey && newVal) {
        //登録処理
        console.log(newK.value,':',newV.value)
      }
    }
  })
})

const getSettings = (storage :LocalStorage) => {
  if(storage) {
    console.log('load_inside')
    settings = storage
  } else {
    settings = initialSettings
    chrome.storage.local.set(settings)
  }
}

// if($kw) $kw.textContent = kw['コロナ']



// let myFunc = ():{[key: string]: string} => {
//   let getProfile = ()=>{
//   let profile = {
//     name: 'Suzuki Ichiro',
//     position : 'right'
//   }
//   return profile
//   }
//   return getProfile()
// }
