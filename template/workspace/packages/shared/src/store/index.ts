import {
  combineReducers,
  ThunkDispatch,
} from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { reducer as appConfig } from "./appConfigSlice";
import { reducer as notification } from "./notificationSlice";
import type { CombinedState } from "@reduxjs/toolkit";

type CleanState<T> = T extends CombinedState<infer S>
  ? { [K in keyof S]: CleanState<S[K]> }
  : T;

export {
  appConfig,
  notification,
};

const reducers = combineReducers({
  appConfig,
  notification,
});

export type RootState = CleanState<ReturnType<typeof reducers>>;
export const useAppDispatch: () => ThunkDispatch<RootState, any, any> =
  useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export * from "./types";
