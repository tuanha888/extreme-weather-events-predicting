import imageReducer from "./features/imageSlice";
import loadingReducer from "./features/loadingSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  image: imageReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
