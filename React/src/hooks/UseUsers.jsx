import UserService from "@services/UserService.js";
import { useCallback, useEffect, useState } from "react";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        async () => {
            try {
                const { payload, success } = await UserService.getUsers()
                setLoading(false);
                if (success) {
                    setUsers(payload);
                }
            } catch (error) {
                setError(error)
            }
        },
        []
    )


    useEffect(() => {
        fetch()
    }, [fetch]);

    return { users, loading, error, fetch, setUsers, setLoading, setError };
}

export {
    useUsers
};
