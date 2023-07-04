import {
  Action,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import { incomingCorrespondenceReducer } from "./incomingCorrespondenceReducer";

let rootReducers = combineReducers({
  // app: appReducer,
  incomingCorrespondencePage: incomingCorrespondenceReducer,
  // outgoingCorrespondencePage: outgoingCorrespondenceReducer,
  form: formReducer,
});

type RootReducerType = typeof rootReducers; // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

// type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T> = ReturnType<PropertiesType<T>>
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// @ts-ignore
window.__store__ = store;

// let store = configureStore(rootReducers);
// let store = configureStore({
//     reducer: {
//         profilePage: profileReducer, messagesPage: dialogsReducer
//     },
//     middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(),
// });

export default store;
