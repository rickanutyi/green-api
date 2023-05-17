import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from "entities/user/types"

type InitialState= {
    user: UserData | null
}
const initialState: InitialState = {
    user: null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserData>) {
            state.user = action.payload
        },
        logoutUser(state) {
            state.user = null
        }
    } 
})

export const { setUser, logoutUser } = authSlice.actions