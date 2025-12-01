import {useCallback, useState} from "react";

type UseBooleanReturnType = [
    boolean,
    {
        on: () => void;
        off: () => void;
        toggle: () => void;
        force: (value: boolean) => void;
    }
]

const useBoolean = (initValue?: boolean): UseBooleanReturnType => {

    const [flag, setFlag] = useState(Boolean(initValue))

    const on = useCallback(() => {
        setFlag(true)
    }, [])

    const force = useCallback((value: boolean) => {
        setFlag(value)
    }, [])

    const off = useCallback(() => {
        setFlag(false)
    }, [])

    const toggle = useCallback(() => {
        setFlag(flag => !flag)
    }, [])

    return [flag, { on, off, toggle, force }]
}

export default useBoolean