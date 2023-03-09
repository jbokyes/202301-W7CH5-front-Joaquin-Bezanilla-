import { useDispatch, useSelector } from "react-redux";
import { UsersApiRepo } from "../repo/user.api.repo";
import * as ac from "../reducer/user/user.actions.creator";
import { User } from "../models/user.model";
import { AppDispatch, RootState } from "../store/store";

export function useUsers(repo: UsersApiRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const readAll = async (token: string) => {
    try {
      if (!token) throw new Error("Not authorized");
      const infoUsers = await repo.readAll(token);
      dispatch(ac.loadCreator(infoUsers.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const createUser = async (newUser: User) => {
    try {
      const user = await repo.createUser(newUser);
      if (!user) throw new Error("User not true");
      dispatch(ac.createUserCreator(user));
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  return {
    users,
    readAll,
    createUser,
  };
}
