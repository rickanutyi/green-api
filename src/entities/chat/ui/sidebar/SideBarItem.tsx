import styled from "@emotion/styled";
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { setCurrentChat } from "model/reducers/messagesSlice";
import { useTypedDispatch, useTypedSelector } from "model/store";
import { colors } from "shared/theme/colors";

const StyledSideBarItem = styled("div")<{active: boolean}>(({ active }) => ({
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: active ? colors.light : colors.gray,
    transition: "background 200ms easy",
    margin: '5px 0px',
    "&:hover": {
        cursor: "pointer",
        background: colors.light,
    },
    "& svg": {
        width: "40px",
        height: "40px",
    },
}));

const ChatName = styled("p")({
    color: colors.white,
});

type SideBarItemProps = {
    name: string;
    id: string;
};
function SideBarItem({ id, name }: SideBarItemProps) {
    const dispatch = useTypedDispatch();
    const currentChat = useTypedSelector((state) => state.messages.currentChat);
    const isActiveChat = currentChat === id;
    return (
        <StyledSideBarItem active={isActiveChat} onClick={() => dispatch(setCurrentChat(id))}>
            <AvatarIcon />
            <ChatName>{name}</ChatName>
        </StyledSideBarItem>
    );
}

export default SideBarItem;
