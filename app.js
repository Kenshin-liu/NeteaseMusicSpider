const cheerio = require('cheerio')

const { query } = require('./db')
const { get } = require('./util/http')
const { list, initial, api, filter } = require('./config/singer')

async function collect() {
  for (let item of list) {
    let len = initial.length
    try {
      for (let index of initial) {
        await getElements(index, item)
      }
    } catch (e) {
      console.log(item)
    }
  }
}

async function getElements(index, item) {
  const { style, category, id } = item
  try {
    const response = await get(`http://music.163.com/discover/artist/cat`, { id: id, initial: index })
    const $ = cheerio.load(response.data)
    const elements = $('li .s-fc0')
    for (let el in elements) {
      if (/^\d+$/.test(el)) {
        const catId = $(elements[el]).attr('href') ? $(elements[el]).attr('href').replace(/[^0-9]/ig, "") : ''
        const name = $(elements[el]).text()
        let sql = 'insert into singer(name, style, initial, category, catId) values(?,?,?,?,?)'
        let dataList = await query(sql, [name, style, index, category, catId])
      }
    }
  } catch (e) { console.log(item, index) }
}


collect().catch(error => console.log(error))
