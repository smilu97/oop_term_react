import styled from 'styled-components';

export const MainContainer = styled.div`
    flex-direction: column;
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

export const SearchInput = styled.input`
    height: 50px;
    width: 100%; 
    font-size: 20px; 
    padding-left: 30px;
`;

export const ContactRow = styled.div`
    height: 70px;
    display: flex;
    flex-direction: row;
    border-bottom: thin solid black;
    border-radius: 5px;
    padding-left: 10px;
    margin: 0 10px;

    &:hover {
        background-color: #7da8ed;
        transition-duration: 0.25s;
    }
`;

export const ContactContent = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const ContactName = styled.p`
    font-size: 20px;
    color: black;
    margin-bottom: 0;
`;
export const ContactPhoneNumber = styled.p`
    font-size: 13px;
    color: black;
    margin-bottom: 0;
`;
export const ContactOptionContainer = styled.div`
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`;
