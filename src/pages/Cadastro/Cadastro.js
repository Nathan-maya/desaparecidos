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
import { uploadFile } from '../../redux/fileSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { clearFile } from '../../redux/fileSlice';

const Cadastro = () => {
  const [inputs, setInputs] = useState('');
  const [files, setFiles] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector((state) => {
    return state.files;
  });

/**
 * It takes the event object, and then it sets the state of the inputs to the previous state, and then
 * it returns the previous state with the new value of the input.
 * @param e - the event object
 */
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (selector.files.length > 0) {
      dispatch(clearFile());
    }
  };

  /**
   * It takes the files from the input and adds them to the state.
   * @param e - the event object
   */

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setFiles((prevState) => [...prevState, newImage]);
    }
  };

  /**
   * It takes the files from the input field, and uploads them to firebase storage.
   * @param e - The event object.
   */
  const handleClick = async (e) => {
    e.preventDefault();
    /* Uploading the files to firebase storage. */
    uploadFile(files, dispatch);
  };
  /* A hook that is called when the component is mounted. It is checking if the files are uploaded to
firebase storage, if they are, it is adding the missing person to the database. */
  useEffect(() => {
    if (selector.files.length > 0) {
      const missing = { ...inputs, img: selector.files };
      addMissing(missing, dispatch);
      setInputs('')
      setFiles([]);
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
