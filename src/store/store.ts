import {
  Action,
  PayloadAction,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import loginSlice from './modules/loginSlice';

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    loginSlice: loginSlice.reducer,
  })(state, action);
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const makeStore = () => {
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
