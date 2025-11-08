import dotenv from 'dotenv';
import { MiniExpress } from "./utils/helper/miniExpress.ts";
import userRouter from './routes/usersRoutes.ts';

dotenv.config({ path: './.env' });

const app = new MiniExpress();

app.use('/api/users', userRouter);

export default app;