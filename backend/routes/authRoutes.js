const {Router} = require('express');
const authController = require('../controllers/authController')
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();
router.post('/login',authController.handleLogin)
const dashboardRouter = Router();
router.use('/dashboard',dashboardRouter)
dashboardRouter.use(requireAuth)


dashboardRouter.post('/',authController.dashboard)
dashboardRouter.get('/manager',authController.getUsers )
module.exports = router;
