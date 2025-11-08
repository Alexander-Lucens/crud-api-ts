import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const PORT = Number(process.env.PORT) || 1234;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map