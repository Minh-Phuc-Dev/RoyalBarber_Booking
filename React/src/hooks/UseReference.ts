import {useCallback, useRef} from "react";

function useReference<T>(value: T) {
    const ref = useRef<T>(value);

    const getRef = useCallback(
        () => ref.current,
        []
    )
    const setRef = useCallback(
        (value: T) => {
            ref.current = value
        },
        []
    )
    return {getRef, setRef, ref};
}

export default useReference;