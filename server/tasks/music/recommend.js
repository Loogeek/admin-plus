const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Recommend = mongoose.model('Recommend')

;(async () => {
    const script = resolve(__dirname, '../../crawler/music/recommend')
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

    child.on('message', async data => {
        const { result = [] } = data
        let recommend = await Recommend.findOne({name: 'recommend'})

        if (!recommend) {
           recommend = new Recommend({
               name: 'recommend',
               slider: result
           }) 
        } else {
            let { slider } = recommend
            
            result.forEach(async item => {
                const noData = slider.every(target => item.picUrl !== target.picUrl)
                
                if (noData) {
                    slider.push(item)     
                }
            })
        }

        await recommend.save()
    })
})()