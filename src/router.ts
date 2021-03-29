import { Router } from 'express';
import { UserRouter } from './user/user.router';
import { AuthRouter } from './auth/auth.action'

const AppRouter: Router = Router();

AppRouter.use('/api/Account', UserRouter);

AppRouter.use('/api/Account', AuthRouter)

AppRouter.use('/isAlive', (req, res) => {
  res.status(200).send('alive');
});

AppRouter.use('*', (req, res) => {
  res.status(404).send('Invalid Route');
});

export { AppRouter };
