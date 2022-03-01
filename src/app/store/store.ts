import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../slices/eventSlice";
import userReducer from "../slices/usersSlice"

export const store = configureStore({
  reducer: {
    events: eventReducer,
    users: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch