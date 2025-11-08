import dotenv from 'dotenv';
import { MiniExpress } from "./utils/helper/miniExpress.js";
import userRouter from './routes/usersRoutes.js';
dotenv.config({ path: './.env' });
const app = new MiniExpress();
app.use('/api/users', userRouter);
export default app;
//# sourceMappingURL=app.js.map