import styled from 'styled-components'

export const Container = styled.div`
    flex:1;
    flex-direction: row;
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    left:0; right:0;
    top: 56px; bottom:0;
`

export const LeftContainer = styled.div`
    width: 20em;
    background-color: lightslategray;
    padding: 20px;
`

export const RightContainer = styled.div`
    flex:1;
    padding: 30px;
`

export const HelloUser = styled.p`
    font-size: 30px;
    color: white;
`