import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Message } from "entities/chat/types";

type InitialState = {
    messages: Message[],
    activeChats: { id: string, name: string }[],
    currentChat: string | null
}
const initialState: InitialState = {
    messages: [],
    activeChats: [],
    currentChat: null
}
export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload)
        },
        setActiveChat(state, action: PayloadAction<{ id: string, name: string }>) {
            state.activeChats.push(action.payload)
        },
        setCurrentChat(state, action: PayloadAction<string>) {
            state.currentChat = action.payload
        }
    }
})

export const { setMessage, setActiveChat, setCurrentChat } = messagesSlice.actions