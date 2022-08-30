import styled from 'styled-components';

export const Container = styled.section`
  color: #fafafa;
`;
export const Wrapper = styled.div`
  margin-top: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.form`
  margin: 20px 62px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #fafafa;
  padding: 20px;
`;
export const Input = styled.input`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #fafafa;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
`;
export const Label = styled.label`
  color: black;
  font-family: sans-serif;
  line-height: 14px;
`;
export const LabelFotos = {
  padding: '5px 0px',
  background: '#303245',
  color: '#fafafa',
  textTransform: 'uppercase',
  textAlign: 'center',
  display: 'block',
  borderRadius: '12px',
  cursor:'pointer'
};
export const Button = styled.button`
  margin: 0 auto;
  padding: 5px;
  border-radius: 10px;
  width: 50%;
  transition: 0.5s;

  &:hover {
    background-color: transparent;
    color: #fafafa;
    cursor: pointer;
  }
`;
export const InputFile = {
  display: 'none',
};
