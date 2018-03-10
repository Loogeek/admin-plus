const cp = require('child_process')
const { resolve } = require('path')
// const 

;(async () => {
    const script = resolve(__dirname, '../crawler/movie-list')
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
        const { result } = data
        result.forEach(async (item) => {
            // const movie = await Movie

        })

        console.log(result)

    })
})()