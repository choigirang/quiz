import {
  Action,
  PayloadAction,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginSlice from './modules/loginSlice';
import selectStackSlice from './modules/quizStackSlice';
import quizSlice from './modules/quizSlice';
import sheetStackSlice from './modules/sheetStackSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginSlice', 'selectStackSlice', 'quizSlice', 'sheetStackSlice'],
};

const rootReducer = combineReducers({
  loginSlice: loginSlice.reducer,
  selectStackSlice: selectStackSlice.reducer,
  quizSlice: quizSlice.reducer,
  sheetStackSlice: sheetStackSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

const makeStore = () => {
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
