import dotenv from 'dotenv';
import { MiniExpress } from "./utils/helper/miniExpress.js";
import userRouter from './routes/usersRoutes.js';

dotenv.config({ path: './.env' });
const PORT = Number(process.env.PORT) || 1234;

const app = new MiniExpress();

app.use('/api/users', userRouter);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});