/**
*
* Footer
*
*/

import React from 'react';
// import styled from 'styled-components';

import styled from 'styled-components';

const Container = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  margin-top: 100px;
  padding-left: 20px;
`;

const pText = styled.p`
  font-size: 15px;
  color: gray;
`;

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <pText>All right reserved by 김영진 (smilup2244@gmail.com), 이진명 (jinious1111@naver.com) </pText><br />
      </Container>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
