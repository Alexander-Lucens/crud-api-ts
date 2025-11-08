import { MiniExpressRouter } from "../utils/helper/miniRouter.js";
import * as userController from "../controllers/usersControllers.js";
const router = new MiniExpressRouter();
router.get('/', userController.getUsers);
router.post('/', userController.createUserFromBody);
/** Preferebly to use it with protection*/
router.delete('/', userController.deleteAllUsers);
router.get('/:id', userController.getUserByIdFromParams);
router.put('/:id', userController.putUserByIdFromParams);
router.patch('/:id', userController.patchUserByIdFromParams);
router.delete('/:id', userController.deleteUserByIdFromParams);
export default router;
//# sourceMappingURL=usersRoutes.js.map