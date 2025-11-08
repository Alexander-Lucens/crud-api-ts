import { MiniExpressRouter } from "../utils/miniRouter.js";
import * as userController from "../controllers/usersControllers.js";


const router = new MiniExpressRouter();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserByIdFromParams);
router.put('/:id', userController.getUserByIdFromParams);
router.delete('/:id', userController.deleteUserByIdFromParams);

export default router;