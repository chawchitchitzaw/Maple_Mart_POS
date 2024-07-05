import {
  applyMiddleware,
  combineReducers,
  configureStore,
  createStore,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {thunk} from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import CounterSlice from '../Slice/CounterSlice';
import UserSlice from '../Slice/UserSlice';
import productReducer from '../../store/productSlice';
import cartReducer from '../../store/cartSlice';
// export const store = configureStore({
//   reducer: {
//     counter: CounterSlice,
//   },
// });

const rootReducer = combineReducers({
  counter: CounterSlice,
  user: UserSlice,
  products: productReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['counter', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
