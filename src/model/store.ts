import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux/es/exports";
import { messagesSlice } from "./reducers/messagesSlice";
import { notificationApi } from "entities/chat/api";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        messages: messagesSlice.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({}).concat(notificationApi.middleware)
    },
    
})

type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch: () => typeof store.dispatch = useDispatch 