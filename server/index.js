const Koa = require('koa')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')

;(async () => {
    await connect().catch(err=> console.log(123, err))

    initSchemas()

    await initAdmin()

    require('./tasks/movie')
})()

const app = new Koa()

app.listen(9527)