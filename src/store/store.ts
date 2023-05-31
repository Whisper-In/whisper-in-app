import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"
import chatsReducers from "./slices/chats/index";
import userReducer from "./slices/user"
import { initAxiosInterceptors } from "./services/axiosInstance";

const rootReducer = combineReducers({
  user: userReducer,
  chats: chatsReducers,  
});

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
});

initAxiosInterceptors(store);

export const persistor = persistStore(store);

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => (AppDispatch) = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

persistor.purge();