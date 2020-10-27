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

  await fetch(api, {
    body: JSON.stringify(tempData),
    credentials: '*',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors'
  })

  name.value = ''
  score.value = ''

  list.innerHTML = ''
  getRecords()

  // location.reload();

}

function searchKey() {
  tempArray = records.filter(student => student.score === searchBox.value.toUpperCase())
  list.innerHTML = ''
  tempArray.length > 0 ? tempArray.forEach(student => {
    list.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.score}</td>
        </tr>
      `
  }) : ''

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


