
import * as $ from 'jquery'
//import '@styles/styles.css'
import './assets/styles/styles.css'

import json from './assets/json.json'
import xml from './assets/data.xml'
import csv from './assets/data.csv'
console.log('JSON:', json)

let data = JSON.parse(JSON.stringify(json));
console.log('data:', data)

let header = '<h2>Name ' + data.name + '</h2>';
let list = '';

for (let i in data.items) {
  list += '<li>' + i + ': ' + data.items[i] + ' </li>';
}
console.log('header:', header)
console.log('list:', list)

document.getElementById('pre').innerHTML += header;
document.getElementById('pre').innerHTML += '<ul>' + list + '</ul>';

console.log('JSON:', json)
console.log('XML:', xml)
console.log('CSV:', csv)