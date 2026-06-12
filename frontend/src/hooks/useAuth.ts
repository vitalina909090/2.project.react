import { useSelector } from "react-redux";
import { useGetAuthUserQuery } from "../api/authApi";


const useAuth = () => {
    const token = useSelector(state => state.auth.token);
    
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