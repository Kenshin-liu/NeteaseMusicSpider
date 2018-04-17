const cheerio = require('cheerio')

const { query } = require('./db')
const { get } = require('./util/http')
const { list, initial, api, filter } = require('./config/singer')

async function collect() {
  list.forEach(item => {
    const { style, category, id } = item
    initial.forEach(index => {
      await getElements(id, index)
    })
  })
}

async function getElements(id, index) {
  const response = await get(`http://music.163.com/discover/artist/cat`, { id: id, initial: index })
  const $ = cheerio.load(response.data)
  const elements = $('li .s-fc0')
  Object.keys(elements).forEach(async el => {
    await setQuery(el)
  })
}

async function setQuery(el) {
  const catId = $(elements[el]).attr('href') ? $(elements[el]).attr('href').replace(/[^0-9]/ig, "") : ''
  const name = $(elements[el]).text()
  if (!catId || filter.indexOf(el) > 0) return
  let sql = 'insert into singer(name, style, initial, category, catId) values(?,?,?,?,?)'
  let dataList = await query(sql, [name, style, index, category, catId])
}

collect().catch(error => console.log(error))
