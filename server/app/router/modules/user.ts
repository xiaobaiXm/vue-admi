import Router from 'koa-router'
import userController from '../../controller/userController'
import { auth } from '../../middleware/authMiddleware'
import { verifyLogin } from '../../middleware/userMiddleware'
// import { validata } from '../../middleware/validateMiddleware'
const router = new Router({
  prefix: '/user'
})

router.post('/login', verifyLogin, userController.login).get('/', auth, userController.gerUserInfo)

export default router
