import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 20px 62px;
  align-items: center;
  background-color: #424242

;
  height: 80px;
  border-bottom:solid white 1px;
`;

export const Logo = styled.img`
  cursor: pointer;
  width: 200px;
  max-width: 100%;
  object-fit: cover;
`;
export const Cabecalho = styled.div``;
export const NavTitle = styled.h1`
  position: absolute;
  top: 60px;
  right: 82px;
  font-size: 20px;
  font-weight: bold;
  color: #fafafa;
`;

export const Nav = styled.nav`
  background-color: #424242
;
`;
export const Ul = styled.ul`
  ${(props) => {
    switch (props.nav) {
      case 'nav-superior':
        return `  display: flex;
  justify-content: flex-end;
  margin-top: -45px;
        `;
      default:
        return `  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 67px;
  `;
    }
  }}
`;
export const Li = styled.li`
  ${(props) => {
    switch (props.nav) {
      case 'nav-superior':
        return `  font-size: 14px;
  margin-right: 20px;
  color: #fafafa;
  cursor:pointer;
  `;
      default:
        return `text-transform: uppercase;
  font-weight: 400;
  font-size: 16px;
  color: #fafafa;
  margin-right: 20px;
  padding: 10px 0px;
  cursor:pointer`;
    }
  }}
`;
