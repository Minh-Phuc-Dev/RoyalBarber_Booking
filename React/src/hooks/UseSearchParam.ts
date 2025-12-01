import {isEmpty, isNull} from "lodash";
import {useCallback, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

/**
 * Returns a stateful value and a function to update it, persisted in the URL query params.
 *
 * @param {string} key - The key of the query parameter.
 * @param {string} [defaultValue] - The default value of the query parameter.
 * @return {[string, (value: string) => void]} An array containing the current value and a function to update it.
 */
const useSearchParam = (key: string, defaultValue?: string): [string, (value: string) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get(key)

    useEffect(
        () => {
            if (isEmpty(defaultValue)){
                return
            }
            if (isNull(value)){
                setSearchParams(
                    params => {
                        params.set(key, defaultValue as string)
                        return params
                    }
                )
            }
        }, [value, defaultValue, setSearchParams, key]
    )

    const setSearchParam = useCallback(
        (value: string) => {
            setSearchParams(
                params => {
                    params.set(key, value)
                    return params
                }
            )
        }, [key, setSearchParams]
    )
    return [value as string, setSearchParam]
};

export default useSearchParam