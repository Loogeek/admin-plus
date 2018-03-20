const Router = require('koa-router')
const glob = require('glob')
const { resolve } = require('path')

const prefixPath = Symbol('prefixPath')
const routerMap = new Map()

const normalizePath = path => path.startsWith('/') ? path : `/${path}`

export class Route {
    constructor(app, apiPath) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init() {
        glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

        for (let [key, value] of routerMap) {
            const { target, methods, path } = key
            value = Array.isArray(value) ? value : [value]
            let prefixPath = target[prefixPath]
            
            if (prefixPath) {
                prefixPath = normalizePath(prefixPath)
            }
            
            const routerPath = prefixPath + path
            this.router[methods](routerPath, ...value)
        }

        this.app.use(this.router.routes())
                .use(this.router.allowedMethods())
    }
}

const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path)

    routerMap.set({
        target,
        ...conf
    }, target[key])
}

export const controller = path => target => target.prototype[prefixPath] = path

export const get = path => router({
    methods: 'GET',
    path
})

export const post = path => router({
    methods: 'POST',
    path
})

export const put = path => router({
    methods: 'PUT',
    path
})

export const del = path => router({
    methods: 'DELETE',
    path
})

export const all = path => router({
    methods: 'ALL',
    path
})

