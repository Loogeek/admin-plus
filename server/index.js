const Koa = require('koa')
const mongoose = require('mongoose')
const R = require('ramda')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
const MIDDLEWARES = ['router', 'parcel']
const port = process.env.PORT || 9527

const useMiddlewares = app => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ), 
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

;(async () => {
    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1) // To exit with a 'failure' code
    });

    await connect().catch(err=> console.log(err))

    initSchemas()

    await initAdmin()

    const app = new Koa()
    await useMiddlewares(app)
    

    app.listen(port)
})()
