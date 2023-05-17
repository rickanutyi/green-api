import styled from "@emotion/styled";
import { useTypedSelector } from "model/store";
import SideBarItem from "./SideBarItem";
import { colors } from "shared/theme/colors";
import React, { useRef } from "react";
import Input from "shared/ui/input/Input";
import Button from "shared/ui/button/Button";
import { MaskedInput } from "shared/ui/input/Masked";
import { useMessages } from "entities/chat/hooks";

const SideBarWrapper = styled("div")<{ toggle: boolean }>(({ toggle }) => ({
    flex: "1",
    maxWidth: "400px",
    minWidth: "120px",
    height: "100%",
    borderRight: "1px solid #fff",
    paddingRight: "5px",
    "@media (max-width: 420px)": {
        visibility: toggle ? "visible" : "hidden",
        overflow: "hidden",
        position: "absolute",
        padding: "10px",
        top: "40px",
        left: "0px",
        right: "0px",
        bottom: "0px",
    },
}));

const StartChat = styled("button")({
    height: "60px",
    width: "100%",
    border: "1px solid #fff",
    backgroundColor: colors.gray,
    cursor: "pointer",
    color: colors.white,
    fontSize: "18px",
    margin: "10px 0",
    "&:active": {
        backgroundColor: colors.light,
    },
});

const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
});

const CheckboxLabel = styled("label")({
    color: colors.white,
    display: "flex",
    alignItems: "center",
    gap: "10px",
});

const ToggleBtn = styled(Button)({
    display: "none",
    "@media (max-width: 420px)": {
        display: "block",
        position: "absolute",
        top: '10px',
        left: '10px',
    },
});

export const SideBar = React.memo(() => {
    const [openForm, setOpenForm] = React.useState(false);
    const [number, setNumber] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [country, setCountry] = React.useState("ru");
    const [toggle, setToggle] = React.useState(false);
    const activeChats = useTypedSelector((state) => state.messages.activeChats);

    const { sendMessage, getNotifications } = useMessages();
    const timeoutId = useRef<any>({ id: 0 });
    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        sendMessage(
            {
                chatId: number.match(/\d/g)?.join("") + "@c.us",
                message: message,
            },
            () => {
                setNumber("");
                setMessage("");
                setOpenForm(false);
            }
        );
    };

    React.useEffect(() => {
        timeoutId.current.id = setInterval(() => {
            getNotifications(
                () => {},
                () => {
                    clearInterval(timeoutId.current.id);
                }
            );
        }, 5000);
        return () => clearInterval(timeoutId.current.id);
    }, []);
    return (
        <>
            <ToggleBtn onClick={() => setToggle(t => !t)}>{toggle ? "Скрыть" : "Раскрыть"}</ToggleBtn>
            <SideBarWrapper toggle={toggle}>
                {activeChats.map((chat) => (
                    <SideBarItem
                        key={chat?.id}
                        id={chat?.id}
                        name={chat?.name}
                    />
                ))}
                <StartChat onClick={() => setOpenForm((o) => !o)}>
                    {openForm ? "Закрыть" : "Начать новый чат"}
                </StartChat>

                {openForm ? (
                    <Form onSubmit={submit}>
                        <CheckboxLabel htmlFor="">
                            Russian
                            <input
                                checked={country === "ru"}
                                onChange={(e) => setCountry("ru")}
                                type="radio"
                            />
                        </CheckboxLabel>
                        <CheckboxLabel htmlFor="">
                            Kyrgyzstan
                            <input
                                checked={country === "ky"}
                                onChange={(e) => setCountry("ky")}
                                type="radio"
                            />
                        </CheckboxLabel>
                        <MaskedInput
                            mask={
                                country === "ru"
                                    ? "+7(000)000-000"
                                    : "+996(000)000-000"
                            }
                            lazy={false}
                            placeholder="Введите номер"
                            // value={number}
                            onAccept={(value, mask) => {
                                // mask.updateValue();
                                setNumber(value);
                            }}
                        />
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Введите сообщение"
                        />
                        <Button>Создать чат</Button>
                    </Form>
                ) : null}
                <Button
                    onClick={() => {
                        clearTimeout(timeoutId.current.id);
                    }}
                >
                    Остановить
                </Button>
            </SideBarWrapper>
        </>
    );
});
