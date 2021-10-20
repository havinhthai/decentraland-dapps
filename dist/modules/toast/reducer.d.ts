import { RenderToastAction, HideToastAction } from './actions';
export declare type ToastState = number[];
export declare type ToastReducerAction = RenderToastAction | HideToastAction;
export declare function toastReducer(state: ToastState | undefined, action: ToastReducerAction): ToastState;
