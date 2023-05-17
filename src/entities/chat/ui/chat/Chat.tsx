import styled from "@emotion/styled";
import { useMessages } from "entities/chat/hooks";
import { useTypedSelector } from "model/store";
import React, { useState } from "react";
import endpoints from "shared/api/endpoints";
import config from "shared/config";
import { colors } from "shared/theme/colors";
import Button from "shared/ui/button/Button";
import Input from "shared/ui/input/Input";

const Wrapper = styled("div")({
    flex: "1",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0b141a",
});

const ChatActions = styled("form")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    "& > input": {
        borderRadius: "0",
        flex: "1",
    },
    "& > button": {
        borderRadius: "0",
        height: "100%",
        flex: "1",
        maxWidth: "150px",
    },
});

const Messages = styled("div")({
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: '10px',
    padding: "15px",
});

const Message = styled("div")<{own: boolean}>(({own}) => ({
    color: colors.white,
    backgroundColor: colors.light,
    padding: "5px",
    borderRadius: "6px",
    maxWidth: "fit-content",
    marginLeft: own ? 'auto' : ''
}));

function ConversationPannel() {
    const [message, setMessage] = useState("");
    const currentChat = useTypedSelector((state) => state.messages.currentChat);
    const messages = useTypedSelector((state) => state.messages.messages);

    const filteredMessages = React.useMemo(() => {
        return messages.filter(
            (message) => message?.body?.senderData?.chatId === currentChat
        );
    }, [currentChat, messages]);

    const { sendMessage } = useMessages();

    return (
        <Wrapper>
            <Messages>
                {filteredMessages.map((message) => {
                    return (
                        <Message own={message.body.senderData.sender === 'own'}>
                            {
                                message.body.messageData.textMessageData
                                    .textMessage
                            }
                        </Message>
                    );
                })}
            </Messages>
            <ChatActions
                onSubmit={(e) => {
                    e.preventDefault();
                    message &&
                        currentChat &&
                        sendMessage({ chatId: currentChat, message: message }, () => setMessage(''));
                }}
            >
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите сообщение"
                />
                <Button type="submit">Отправить</Button>
            </ChatActions>
        </Wrapper>
    );
}

export default React.memo(ConversationPannel);
