import dotenv from 'dotenv';
import { MiniExpress } from "./utils/miniExpress.js";
import * as userController from "./controllers/usersControllers.js";


dotenv.config({ path: './.env' });
const PORT = Number(process.env.PORT) || 1234;

const app = new MiniExpress();

app.get('/api/users', userController.getUsers);


app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});