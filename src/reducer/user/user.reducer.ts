import { createReducer } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";
import * as ac from "./user.actions.creator";

const initialState: User[] = [];

export const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  builder.addCase(ac.createUserCreator, (state, { payload }) => [
    ...state,
    payload,
  ]);
  builder.addDefaultCase((state) => state);
});
