import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./index";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface INotification extends FirebaseMessagingTypes.RemoteMessage {
  isRead: boolean;
}

export const resetAll = createAction("RESET_ALL");

const notificationAdapter = createEntityAdapter<INotification>({
  selectId: (item) => item.messageId!,
});

const initialState = notificationAdapter.getInitialState({
  currentMessage: undefined as INotification | undefined,
  token: undefined as string | undefined,
});

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification: (state, action: PayloadAction<INotification>) => {
      state.currentMessage = {
        ...state.currentMessage,
        ...action.payload,
      };
    },
    updateToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(resetAll, () => initialState);
  },
});

export const reducer = slice.reducer;
export const { updateNotification, updateToken } = slice.actions;

export const selecNotificationStatusThunkStatus = createSelector(
  (state: RootState) => {
    return {
      currentMessage: state.notification.currentMessage,
      token: state.notification.token,
    };
  },
  (result) => result
);
