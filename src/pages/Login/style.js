import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';

export const Container = styled.section`
  color: #fafafa;
`;
export const ContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25vh;
`;
export const Wrapper = styled(Formik)`

`;
export const Forms = styled(Form)`
  margin: 20px 62px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #fafafa;
  padding: 20px;
`;
export const Input = styled(Field)`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #fafafa;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 10px 20px 10px;
  width: 100%;
`;

export const Label = styled.label`
  color: black;
  font-family: sans-serif;
  line-height: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Link = styled.a`
  color: black;
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
