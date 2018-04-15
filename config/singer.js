const config = {
  api: 'http://music.163.com/discover/artist/cat?',
  filter: ['options', '_root', 'length', 'prevObject', 'undefined'],
  list: [{
    style: '华语男歌手',
    category: '华语',
    id: '1001'
  }, {
    style: '华语女歌手',
    category: '华语',
    id: '1002'
  }, {
    style: '华语组合/乐队',
    category: '华语',
    id: '1003'
  }, {
    style: '欧美男歌手',
    category: '欧美',
    id: '2001'
  }, {
    style: '欧美女歌手',
    category: '欧美',
    id: '2002'
  }, {
    style: '欧美组合/乐队',
    category: '欧美',
    id: '2003'
  }, {
    style: '日本男歌手',
    category: '日本',
    id: '6001'
  }, {
    style: '日本女歌手',
    category: '日本',
    id: '6002'
  }, {
    style: '日本组合/乐队',
    category: '日本',
    id: '6003'
  }, {
    style: '韩国男歌手',
    category: '韩国',
    id: '7001'
  }, {
    style: '韩国女歌手',
    category: '韩国',
    id: '7002'
  }, {
    style: '韩国组合/乐队',
    category: '韩国',
    id: '7003'
  }, {
    style: '其他男歌手',
    category: '其他',
    id: '4001'
  }, {
    style: '其他女歌手',
    category: '其他',
    id: '4002'
  }, {
    style: '其他组合/乐队',
    category: '其他',
    id: '4003'
  }],
  initial: [0]
}
for (let index = 65; index <= 90; index++) {
  config.initial.push(index)
}

module.exports = config
