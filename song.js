const { query } = require('./db')
const { get } = require('./util/http')

async function selectAllData() {
  const sql = 'select * from singer'
  const dataList = await query(sql)
  return dataList
}

async function getHotSongs() {
  let errorId = ''
  const datas = await selectAllData()
  for (let singer of datas) {
    try {
      const songs = await get('http://localhost:3000/artists', { id: singer.catId })
      errorId = singer.catId
      await getSong(songs.data.hotSongs, singer)
    } catch (e) {
      console.log('error singerId:' + errorId)
    }
  }
}

async function getSong(hotSongs, singer) {
  let errorId = ''
  for (let song of hotSongs) {
    try {
      errorId = song.id
      const comments = await get('http://localhost:3000/comment/music', { id: song.id, limit: 1 })
      const total = comments.data.total
      if (total && total < 10000) return
      await getComment(total, song, singer).catch(error => console.log(error))
    } catch (e) {
      console.log('error songId:' + errorId)
    }
  }
}

async function getComment(total, song, singer) {
  const { id, name, style, category, catId } = singer
  let sql = 'insert into song(singer, singerId, style, songId, name, comment) values(?,?,?,?,?,?)'
  let result = await query(sql, [name, id, style, song.id, song.name, total])
}

getHotSongs().catch(error => console.log(error))