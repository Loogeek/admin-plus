const {
    controller,
    get,
    post
} = require('../lib/decorator')
const {
    checkPassword
} = require('../service/user')

@controller('/api/v1/user')
export class userController {
    @post('/')
    async login(ctx, next) {
        const { email, password } = ctx.request.body
        const matchData = await checkPassword(email, password)

        if (!matchData.user) {
            return (
                ctx.body = {
                    success: false,
                    code: -1,
                    mes: '用户不存在'
                }
            )
        }

        if (matchData.match) {
            return (
                ctx.body = {
                    success: true,
                    code: 0,
                    mes: '登录成功'
                }
            )
        } else {
            return (
                ctx.body = {
                    success: false,
                    code: -1,
                    mes: '密码不正常'                    
                }
            )
        }
    }
}