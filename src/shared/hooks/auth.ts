import { UserData } from "entities/user/types"
import { logoutUser, setUser } from "model/reducers/authSlice"
import { useTypedDispatch, useTypedSelector } from "model/store"

export const useAuth = () => {
    const dispatch = useTypedDispatch()
    const user = useTypedSelector(state => state.auth.user)

    const login = (data: UserData) => {
        dispatch(setUser(data))
    }
    const logout = () => {
        dispatch(logoutUser())
    }
    
    return {
        user,
        login,
        logout
    }
}