const Koa = require('koa');
const app = new Koa();
const { query } = require('./db');

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('----------1')
  await next();
  const ms = Date.now() - start;
  console.log('----------2')
  ctx.set('X-Response-Time', `${ms}ms`);
});

async function selectAllData( ) {
  let sql = 'SELECT * FROM song'
  let dataList = await query( sql )
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  console.log( dataList )
}

getData()

// logger

app.use(async (ctx, next) => {
  console.log('----------3')
  const start = Date.now();
  await next();
  console.log('----------4')
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);