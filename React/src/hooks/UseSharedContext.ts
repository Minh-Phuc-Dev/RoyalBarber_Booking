import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppState} from "contexts/root";

export const useSharedDispatch: () => AppDispatch = useDispatch
export const useSharedSelector: TypedUseSelectorHook<AppState> = useSelector