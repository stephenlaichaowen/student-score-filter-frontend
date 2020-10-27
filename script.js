const name = document.querySelector('#name')
const score = document.querySelector('#score')
const myForm = document.querySelector('#myform')
const btnSubmit = document.querySelector('#btn-submit')
const list = document.querySelector('#list')
const btnFilter = document.querySelector('#btn-filter')
const searchBox = document.querySelector('#search-box')
// const api = 'http://localhost:5000'
const api = 'https://student-score-filter-backend.herokuapp.com'
let tempArray = []
let records = []

if (myForm) myForm.addEventListener('submit', submitForm)
if (searchBox) searchBox.addEventListener('keyup', searchKey)

getRecords()

async function getRecords() {

  if (list) list.innerHTML = ''

  const res = await fetch(api)
  records = await res.json()
  records.length > 0 ? records.forEach(student => {
    if (list) {
    list.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.score}</td>   
        <td id="del" onclick="delRecord(${student.id})">&#10006;</td>
      </tr>
    ` }
  }) : ''
}

async function delRecord(id) {
  const res = await fetch(`${api}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
  })
  const { status, newArray } = await res.json()
  console.log(`status: ${status}`);
  tempArray = newArray
  showNewRecords()
}

function showNewRecords() {
  list.innerHTML = ''
  tempArray.forEach(student => {
    list.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.score}</td>   
        <td id="del" onclick="delRecord(${student.id})">&#10006;</td>
      </tr>
    `
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

  getRecords()
}

function searchKey() {
  tempArray = records.filter(student => student.score === searchBox.value.toUpperCase())
  list.innerHTML = ''
  tempArray.length > 0 ? tempArray.forEach(student => {
    list.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.score}</td>
          <td onclick="console.log(${student.id});alert('Are you sure to delete this itme ?')">&#10006;</td>
        </tr>
      `
  }) : ''

  if (searchBox.value === '') getRecords()
}

// btnFilter.addEventListener('click', filterScore)
// function filterScore() {
//   list.innerHTML = ''
//   tempArray = records.filter(student => student.score === searchBox.value)
//   tempArray.length > 0 ? tempArray.forEach(student => {
//     list.innerHTML += `
//         <tr>
//           <td>${student.name}</td>
//           <td>${student.score}</td>
//         </tr>
//       `
//   }) : ''
// }


