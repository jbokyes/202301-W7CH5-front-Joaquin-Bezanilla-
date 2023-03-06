import { createAction } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";
import { userActions } from "./user.actions.types";

export const loadCreator = createAction<User[]>(userActions.loadUsers);

export const loadUserCreator = createAction<User>(userActions.loadUser);

export const deleteUserCreator = createAction<User>(userActions.deleteUser);

export const updateUserCreator = createAction<User>(userActions.updateUser);

export const createUserCreator = createAction<User>(userActions.createUser);
