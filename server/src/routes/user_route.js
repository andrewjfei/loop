import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { UserController } from "../controllers/mod.js";

const userRouter = new Router();

userRouter.post("/", UserController.addUser);
userRouter.get("/", UserController.fetchAllUsers);
userRouter.get("/:userId", UserController.fetchSingleUser);
userRouter.put("/:userId", UserController.modifyUser);
userRouter.delete("/:userId", UserController.removeUser);

export { userRouter };
