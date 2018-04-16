const { query } = require('./db')
const { get } = require('./util/http')

async function selectAllData() {
  const sql = 'select * from singer limit 300'
  const dataList = await query(sql)
  return dataList
}

async function getData() {
  const datas = await selectAllData()
  datas.forEach(async singer => {
    const songs = await get('http://localhost:3000/artists', { id: singer.catId })
    await setData(songs.data.hotSongs, singer)
  })
}

async function setData(hotSongs, singer) {
  hotSongs.forEach(async song => {
    const comments = await get('http://localhost:3000/comment/music', { id: song.id, limit: 1 })
    const total = comments.data.total
    console.log(total)
    if (total < 5000) return
    await setMysql(total, song, singer).catch(error => console.log(error))
  })
}

async function setMysql(total, song, singer) {
  const { id, name, style, category, catId } = singer
  let sql = 'insert into song(singer, singerId, style, songId, name, comment) values(?,?,?,?,?,?)'
  let result = await query(sql, [name, id, style, song.id, song.name, total])
}

getData().catch(error => console.log(error))