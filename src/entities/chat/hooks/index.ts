import React from "react";
import { useTypedDispatch, useTypedSelector } from "model/store";
import { setActiveChat, setMessage } from "model/reducers/messagesSlice";
import api from "../api";
import { MessageDTO } from "../types";

export const useMessages = () => {
    const chats = useTypedSelector((state) => state.messages.activeChats);
    const userData = useTypedSelector((state) => state.auth.user);
    const dispatch = useTypedDispatch();

    // !messages.find((m) => m.receiptId === message.receiptId) &&

    const getNotifications = (callback?: () => void, instanceChanged?: () => void) => {
        userData &&
            api
                .getMessages(userData)
                .then((res) => {
                    const statusOk = res.status === 200 && res.data;
                    if (
                        statusOk &&
                        res.data.body.typeWebhook === "stateInstanceChanged"
                    ) {
                        userData && api.getInstance(userData)
                            .then(res => {
                                if(statusOk && res.data.stateInstance !== 'authorized') {
                                    instanceChanged && instanceChanged()
                                }
                            });

                    }
                    if (statusOk && res.data.body.typeWebhook === 'outgoingMessageStatus') {
                        deleteNotification(res.data.receiptId);
                    }
                    if (
                        statusOk &&
                        res.data.body.typeWebhook === "incomingMessageReceived"
                    ) {
                        const message = res.data;
                        dispatch(setMessage(message));
                        deleteNotification(message.receiptId);
                        if (
                            !chats.find(
                                (chat) =>
                                    chat.id === message.body.senderData.chatId
                            )
                        ) {
                            dispatch(
                                setActiveChat({
                                    id: message.body.senderData.chatId,
                                    name: message.body.senderData.senderName,
                                })
                            );
                        }
                    }
                })
                .finally(() => callback && callback());
    };

    const deleteNotification = (receiptId: number) => {
        userData && api.deleteNotification({ ...userData, receiptId });
    };

    const sendMessage = (messageData: MessageDTO, callback: () => void) => {
        userData &&
            api.sendMessage(userData, messageData).then((res) => {
                if (res.status === 200) {
                    callback();
                    dispatch(
                        setMessage({
                            body: {
                                idMessage: res.data.idMessage,
                                instanceData: {
                                    idInstance: 0,
                                    typeInstance: "",
                                    wid: "",
                                },
                                messageData: {
                                    textMessageData: {
                                        textMessage: messageData.message,
                                    },
                                    typeMessage: "",
                                },
                                senderData: {
                                    chatId: messageData.chatId,
                                    sender: "own",
                                    senderName: "Вы",
                                },
                                timestamp: Date.now(),
                                typeWebhook: "",
                            },
                            receiptId: 0,
                        })
                    );
                    if (!chats.find((chat) => chat.id === messageData.chatId)) {
                        dispatch(
                            setActiveChat({
                                id: messageData.chatId,
                                name: messageData.chatId,
                            })
                        );
                    }
                }
            });
    };

    return {
        sendMessage,
        getNotifications,
    };
};
