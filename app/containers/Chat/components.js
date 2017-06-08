import styled from 'styled-components';

// import components

// import reactstrap components
import {
    Button,
} from 'reactstrap';

export const MainContainer = styled.div`
    flex-direction: column;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;
export const MessageInputContainer = styled.div`
    display: flex;
    height: 70px;
    margin: 20px 0 0 0;
    align-items: center;
`;
export const MessageInput = styled.input`
    flex-grow: 3;
    height: 70px;
    font-size: 25px;
    background-color: lightgray;
    margin-right: 10px;
`;
export const SendMessageButton = styled(Button)`
    flex: 1;
    flex-grow: 1;
    height: 70px;
`;
export const MessageRow = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0 5px 0;
`;
export const MessageBox = styled.div`
    display: flex;
    justify-content: center;
`;
export const MessageText = styled.p`
    border: 1px solid black;
    border-radius: 3px;
    padding: 5px;
`;
export const MessageTextBox = styled.div`
    margin: 0 10px;
`;
export const MessageThumbBox = styled.div`
    width: 50px;
`;
export const MessageUsername = styled.p`
    font-weight: bold;
    margin: 0; padding: 0;
`;
export const MessageThumb = styled.img`
`;
export const Title = styled.p`
    font-size: 20px;
`;
export const TabItemContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

