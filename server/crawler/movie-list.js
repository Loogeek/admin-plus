const { resolve } = require('path');
const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/%E7%A7%91%E5%B9%BB?start=20&type=R'

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    console.info('Start visit the target page')

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
    await sleep(2000)

    const result = await page.evaluate(() => {
        const $ = window.$
        const items = $('.item')
        let links = []

        if (items.length > 0) {
            items.each((index, item) => {
                const it = $(item)
                const doubanId = it.find('.nbg').attr('href').split('subject/')[1].split('/')[0]
                const title = $(it.find('.pl2 a')[0]).text().replace(/\n/g, '').replace(/\r/g, '').replace(/\//g, '').trim()
                const poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

                links.push({
                    doubanId,
                    title,
                    poster
                })
            })
        }

        return links
    })

    browser.close()
    process.send({result})
    process.exit(0)
})()