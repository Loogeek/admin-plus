const mongoose = require('mongoose')
const config = require('../config')
const { ip, name } = config.database
const db = `mongodb://${ip}/${name}`
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
    const User = mongoose.model('User')
    let user = await User.findOne({
        username: 'test'
    })

    if (!user) {
        user = new User({
            username: 'test',
            email: 'test@123.com',
            password: 'test123'
        })
    }

    await user.save()
}

exports.connect = () => {
    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }

        mongoose.connect(db)

        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库连接失败，请检测数据库')
            }
        })

        mongoose.connection.on('error', err => {
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库连接失败，请检测数据库')
            }
        })

        mongoose.connection.once('open', () => {
            resolve()
            console.log('MongoDB Connected Successfully!')
        })
    })
}