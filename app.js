const cheerio = require('cheerio')

const { query } = require('./db')
const { get } = require('./util/http')
const { list, initial, api, filter } = require('./config/singer')

function collect() {
  list.forEach(item => {
    const { style, category, id } = item
    initial.forEach(async index => {
      try {
        const response = await get(`http://music.163.com/discover/artist/cat`, { id: id, initial: index })
        const $ = cheerio.load(response.data)
        const elements = $('li .s-fc0')
        Object.keys(elements).forEach(async el => {
          if (filter.indexOf(el) > 0) return
          const catId = $(elements[el]).attr('href') ? $(elements[el]).attr('href').replace(/[^0-9]/ig, "") : ''
          const name = $(elements[el]).text()
          if (!catId) return
          let sql = 'insert into singer(name, style, initial, category, catId) values(?,?,?,?,?)'
          let dataList = await query(sql, [name, style, index, category, catId])
        })
      } catch (e) {
        console.log(e)
      }
    })
  })
}

collect()
