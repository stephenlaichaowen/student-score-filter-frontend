const name = document.querySelector('#name')
const score = document.querySelector('#score')
const myForm = document.querySelector('#myForm')
const list = document.querySelector('#list')
const btnFilter = document.querySelector('#btn-filter')
const searchBox = document.querySelector('#search-box')
// const api = 'http://localhost:5000'
const api = 'https://student-score-filter-backend.herokuapp.com/'
let tempArray = []
let records = []

getRecords()
myForm.addEventListener('submit', submitForm)
searchBox.addEventListener('keyup', searchKey)
// btnFilter.addEventListener('click', filterScore)

async function getRecords() {
  const res = await fetch(api)
  records = await res.json()

  records.forEach(student => {
    list.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.score}</td>        
        <td onclick="del(${student.id})">&#10006;</td>
      </tr>
    `
    function del(id) { console.log(id) }
  })

}

async function submitForm(e) {
  e.preventDefault()
  if (name.value === '' && score.value === '') {
    alert('Please fill out the info');
    return
  }

  const tempData = {
    name: name.value,
    score: score.value
  }

  const res = await fetch(api, {
    body: JSON.stringify(tempData),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow'
  })

  name.value = ''
  score.value = ''

  const data = await res.json()
  console.log(data);

  list.innerHTML = ''
  getRecords()

  // data.length > 0 ? data.forEach(student => {
  //   list.innerHTML = ''
  //   list.innerHTML += `
  //       <tr>
  //         <td>${student.name}</td>
  //         <td>${student.score}</td>
  //       </tr>
  //     `
  // }) : ''
}

function searchKey() {
  tempArray = records.filter(student => student.score === searchBox.value.toUpperCase())
  list.innerHTML = ''
  tempArray.length > 0 ? tempArray.forEach(student => {
    list.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.score}</td>
          <td id="del">&#10006;</td>
        </tr>
      `
  }) : ''

  const btnDel = document.querySelector('#del')
  btnDel.addEventListener('click', () => console.log('are you sure to delete this itme ?'))
  
  if (searchBox.value === '') getRecords()
}

function filterScore() {
  list.innerHTML = ''
  tempArray = records.filter(student => student.score === searchBox.value)
  tempArray.length > 0 ? tempArray.forEach(student => {
    list.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.score}</td>
        </tr>
      `
  }) : ''
}


