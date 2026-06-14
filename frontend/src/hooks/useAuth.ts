import { useSelector } from "react-redux";
import { useGetAuthUserQuery } from "../api/authApi";
import type { RootStore } from "../store/store";


const useAuth = () => {
    const token = useSelector((state:RootStore) => state.auth.token);
    
    const { data, isLoading, isError } = useGetAuthUserQuery(undefined, { skip: !token });

    return {
        user: data?.user,
        isLoading,
        isError,
        token,
        isAuth: !isError && !!token
    }
}

export default useAuth