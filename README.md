#### 背景
最近网易云的日推越来越不走心了，歌单里头按评论排的序也不大完善，估想着自己跑一遍评论，就找评论高的歌听

api网址：https://github.com/Binaryify/NeteaseCloudMusicApi

node app.js  // 抓取歌手信息
node song.js  // 抓取歌曲信息

网易会对同一ip频繁的请求屏蔽掉，故程序想要完美运行还需添加代理池
