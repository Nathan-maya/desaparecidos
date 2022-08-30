import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  Input,
  InputFile,
  Label,
  LabelFotos,
  Wrapper,
} from './styleCadastro';

import { addMissing } from '../../redux/apiCalls';
import { uploadFile } from '../../redux/firebaseCall';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { clearFile } from '../../redux/fileRedux';

const Cadastro = () => {
  const [inputs, setInputs] = useState('');
  const [files, setFiles] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector((state) => {
    return state.files;
  });
  console.log(selector.files.length);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (selector.files.length > 0) {
      dispatch(clearFile());
    }
  };

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setFiles((prevState) => [...prevState, newImage]);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await uploadFile(files, dispatch);
  };
  useEffect(() => {
    if (selector.files.length > 0) {
      const missing = { ...inputs, img: selector.files };
      addMissing(missing, dispatch);

      setFiles('');
      dispatch(clearFile());
    }
  }, [selector, dispatch, inputs]);

  return (
    <Container>
      <Header />
      <Wrapper>
        <Form>
          <Label htmlFor="nome">Nome:</Label>
          <Input name="nome" type="text" onChange={handleChange} />
          <Label htmlFor="idade">Idade:</Label>
          <Input name="idade" type="text" onChange={handleChange} />
          <Label htmlFor="endereco">Endereço:</Label>
          <Input name="endereco" type="text" onChange={handleChange} />
          <Label htmlFor="data">Data Do Desaparecimento:</Label>
          <Input name="data" type="date" onChange={handleChange} />
          <Label>Municipio:</Label>
          <Input name="municipio" type="text" onChange={handleChange} />
          <Label htmlFor="img" style={LabelFotos}>
            Fotos
          </Label>
          <Input
            type="file"
            id="img"
            name="img"
            multiple
            style={InputFile}
            onChange={onFileChange}
          />
          <Button onClick={handleClick} type="submit">
            Enviar
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Cadastro;
