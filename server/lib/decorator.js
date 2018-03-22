const Router = require('koa-router')
const glob = require('glob')
const { resolve } = require('path')

const symbolPath = Symbol('symbolPath')
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
            const { target, method, path } = key
            value = Array.isArray(value) ? value : [value]
            let prefixPath = target[symbolPath]
            
            if (prefixPath) {
                prefixPath = normalizePath(prefixPath)
            }
            const routerPath = prefixPath + path

            this.router[method](routerPath, ...value)
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

export const controller = path => target => target.prototype[symbolPath] = path

export const get = path => router({
    method: 'get',
    path
})

export const post = path => router({
    method: 'post',
    path
})

export const put = path => router({
    method: 'put',
    path
})

export const del = path => router({
    method: 'delete',
    path
})

export const all = path => router({
    method: 'all',
    path
})

