import AuthenticateService from "@services/AuthenticateService.js";
import { isEmpty } from "lodash";
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

export const AuthenticateContext = createContext(
    {
        store: {
            user: null,
            status: "UNAUTHENTICATED"
        },
        setStore: () => { },
        clear: () => { }
    }
);

export const AUTHENTICATE_STATUS = {
    AUTHENTICATED: "AUTHENTICATED",
    UNAUTHENTICATED: "UNAUTHENTICATED",
    LOADING: "LOADING"
};


export const useAuthenticate = () => {
    return useContext(AuthenticateContext);
}

export const AuthenticateProvider = ({ children }) => {
    const [store, setStore] = useState(
        {
            user: null,
            status: AUTHENTICATE_STATUS.UNAUTHENTICATED,

        }
    );


    useEffect(() => {
        const initializeAuth = async () => {

            const token = localStorage.getItem('token');


            if (isEmpty(token)) {
                return;
            }

            setStore(
                (store) => (
                    {
                        ...store,
                        status: AUTHENTICATE_STATUS.LOADING
                    }
                )
            )

            const { error, payload } = await AuthenticateService.getProfile()

            if (error) {
                setStore(
                    (store) => (
                        {
                            ...store,
                            status: AUTHENTICATE_STATUS.UNAUTHENTICATED
                        }
                    )
                )
                return
            }

            setStore(
                {
                    user: payload,
                    status: AUTHENTICATE_STATUS.AUTHENTICATED
                }
            )

        };

        initializeAuth();
    }, []);

    const clear = useCallback(() => {
        localStorage.removeItem("token");
        setStore(
            {
                user: null,
                status: AUTHENTICATE_STATUS.UNAUTHENTICATED
            }
        );
        toast.success("Đăng xuất thành công!");
    }, []);


    return (
        <AuthenticateContext.Provider value={{ store, setStore, clear }}>
            {children}
        </AuthenticateContext.Provider>
    );
};
