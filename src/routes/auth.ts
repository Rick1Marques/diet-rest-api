import { Router } from "express";
import * as authControllers from '../controllers/auth'

const router = Router()

router.post('/signup', authControllers.postSignup)

export default router