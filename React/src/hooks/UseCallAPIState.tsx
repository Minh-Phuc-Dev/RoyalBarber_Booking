import {isFunction, isUndefined, toLower} from "lodash";
import {useCallback, useState} from "react";

export const CALL_API_STATUS = {
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    LOADING: "LOADING",
    IDLE: "IDLE"
}

type Status = typeof CALL_API_STATUS[keyof typeof CALL_API_STATUS];

export type State<T = any> = {
    idle: boolean
    success: boolean
    error: boolean
    loading: boolean
    data: T
}

export type Callback<T> = (data: T) => T
export type UpdateState<T> = (status: Status, data?: T) => void | T
export type UpdateData<T> = (data: (T | Callback<T>)) => void | T

function useCallAPIState<T = any>(initial: { status: Status, data: T }): [State<T>, UpdateState<T>, UpdateData<T>] {
    const [state, setState] = useState<State<T>>(
        () => {
            const {data, status} = initial
            const state = {
                idle: false,
                success: false,
                error: false,
                loading: false,
                data: data
            }
            //@ts-ignore
            state[toLower(status)] = true
            return state
        }
    )

    const updateState = useCallback((status: Status, data?: T) => {
        const state = {
            idle: false,
            error: false,
            loading: false,
            success: false
        }
        state[toLower(status) as keyof typeof state] = true
        setState(
            ({data: currentData}) => ({...state, data: isUndefined(data) ? currentData : data})
        )
    }, [])

    const updateData = useCallback<UpdateData<T>>((data) => {


        if (isFunction(data)) {
            setState(
                (state) => (
                    {
                        ...state,
                        data:  data(state.data)
                    }
                )
            )
            return
        }
        setState(
            (state) => (
                {
                    ...state,
                    data: data as T
                }
            )
        )
    }, [])

    return [state, updateState, updateData]
}

export default useCallAPIState