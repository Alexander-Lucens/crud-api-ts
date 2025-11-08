import { MiniExpressRouter } from "../utils/helper/miniRouter.ts";
import * as userController from "../controllers/usersControllers.ts";


const router = new MiniExpressRouter();

router.get('/', userController.getUsers);
router.post('/', userController.createUserFromBody);
/** Preferebly to use it with protection*/
router.delete('/', userController.deleteAllUsers);

router.get('/:id', userController.getUserByIdFromParams);
router.put('/:id', userController.putUserByIdFromParams);
router.delete('/:id', userController.deleteUserByIdFromParams);

export default router;