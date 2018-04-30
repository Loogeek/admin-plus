const { connect, initSchemas, initAdmin } = require('../../database/init')

;(async () => {
    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1) // To exit with a 'failure' code
    });
    
    await connect().catch(err=> console.log(err))
    
    initSchemas()
    
    await initAdmin()
    
    // require('./movies')
    // require('./api')
    require('./video')
    require('./qiniu')
})()