const cp = require('child_process')
const { resolve } = require('path')
// const 

;(async () => {
    const script = resolve(__dirname, '../crawler/video')
    const child = cp.fork(script, [])
    let invoked = false

    child.on('error', err => {
        if (invoked) return

        invoked = true
        console.error(err)
    })

    child.on('exit', code => {
        if (invoked) return

        invoked = true
        let err = code === 0 ? null : new Error(`exit code ${code}`)

        console.error(err)
    })

    child.on('message', data => {
        const { doubanId } = data

        console.log(11, data)

    })

    // child.send(movies)
})()