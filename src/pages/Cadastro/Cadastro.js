import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Mistakes,
  Form,
  Input,
  InputFile,
  Label,
  LabelFotos,
  Wrapper,
} from './styleCadastro';

import { useForm } from 'react-hook-form';
import { addMissing } from '../../redux/apiCalls';
import { uploadFile } from '../../redux/fileSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { clearFile } from '../../redux/fileSlice';
import validationInputs from '../../helpers/validationInputs';

const Cadastro = () => {
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: '',
      idade: '',
      endereco: '',
      email: '',
      data: '',
      municipio: '',
    },
  });
  const selector = useSelector((state) => {
    return state.files;
  });
  const requiredMessage = Object.values(errors);

  /* It takes the event object, and then it sets the state of the inputs to the previous state, and then
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
    /* Uploading the files to firebase storage. */
    await uploadFile(files, dispatch);

    if (Object.keys(inputs).length >= 6) {
      setError(validationInputs(inputs));
    }
    if (selector.files.length === 0) {
      setError(['Por favor, envie fotos da pessoa!']);
    }
  };
  /* A hook that is called when the component is mounted. It is checking if the files are uploaded to
firebase storage, if they are, it is adding the missing person to the database. */
  useEffect(() => {
    if (selector.files.length > 0) {
      const missing = { ...inputs, img: selector.files };
      addMissing(missing, dispatch);

      setInputs('');
      setFiles([]);
      dispatch(clearFile());
    }
  }, [selector, dispatch, inputs]);

  return (
    <Container>
      <Header />
      <Wrapper>
        <Form onSubmit={handleSubmit(handleClick)}>
          <Label htmlFor="nome">Nome Completo:</Label>
          <Input
            {...register('nome', {
              required: { value: true, message: 'Inserir um nome!' },
            })}
            placeholder="João Gabriel"
            type="text"
            onChange={handleChange}
          />
          <Label htmlFor="idade">Idade:</Label>
          <Input
            {...register('idade', {
              required: { value: true, message: 'Inserir a idade!' },
            })}
            placeholder="23"
            type="text"
            onChange={handleChange}
          />
          <Label htmlFor="endereco">Endereço:</Label>
          <Input
            {...register('endereco', {
              required: { value: true, message: 'Inserir um endereço!' },
            })}
            placeholder="Rua Exemplo, 123"
            type="text"
            onChange={handleChange}
          />
          <Label htmlFor="endereco">E-mail de contato:</Label>
          <Input
            {...register('email', {
              required: {
                value: true,
                message: 'Inserir um email',
              },
            })}
            placeholder="exemplo@gmail.com"
            type="email"
            onChange={handleChange}
          />
          <Label htmlFor="data">Data Do Desaparecimento:</Label>
          <Input
            {...register('data', {
              required: {
                value: true,
                message: 'Inserir a data do desaparecimento!',
              },
            })}
            type="date"
            placeholder="23/05/1999"
            onChange={handleChange}
          />
          <Label>Municipio:</Label>
          <Input
            {...register('municipio', {
              required: { value: true, message: 'Inserir o municipio!' },
            })}
            placeholder="São Paulo - SP"
            type="text"
            onChange={handleChange}
          />
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
            alt="fotos de desaparecidos"
          />

          <Input type="submit" />
          {/* <Button onClick={handleClick} type="submit">
            Enviar
          </Button> */}
          {error
            ? error.map((erro) => <Mistakes key={erro}>{erro}</Mistakes>)
            : null}
          {requiredMessage
            ? requiredMessage.map((erro) => (
                <Mistakes key={erro}>{erro.message}</Mistakes>
              ))
            : null}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Cadastro;
