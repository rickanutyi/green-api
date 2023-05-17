import styled from '@emotion/styled'
import { useMessages } from 'entities/chat/hooks';
import { ConversationPannel, SideBar } from 'entities/chat/ui';
import React from 'react';

const Wrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
})
function ChatPage() {
    return ( 
        <Wrapper>
            <SideBar/>
            <ConversationPannel/>
        </Wrapper>
     );
}

export default ChatPage;