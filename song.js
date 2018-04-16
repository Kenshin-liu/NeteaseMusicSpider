const { query } = require('./db')
const { get } = require('./util/http')

async function selectAllData() {
  const sql = 'select * from singer'
  const dataList = await query(sql)
  return [{
    id: 99,
    name: 'Harlequin',
    style: '韩国组合/乐队',
    initial: 72,
    category: '韩国',
    catId: 126906
  }]
}

async function getData() {
  const datas = await selectAllData()
  datas.forEach(async singer => {
    const songs = await get('http://localhost:3000/artists', { id: singer.catId })
    setData(songs.data.hotSongs, singer)
  })
}

function setData(hotSongs, singer) {
  const { id, name, style, category, catId } = singer
  hotSongs.forEach(async song => {
    const comments = await get('http://localhost:3000/comment/music', { id: song.id,limit: 1})
    console.log(comments.data.total)
  })
}

getData().catch(error => console.log(error))