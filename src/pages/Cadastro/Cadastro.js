import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Mistakes,
  Form,
  Input,
  InputFile,
  Label,
  LabelFotos,
  Wrapper,
  Success,
  Ul,
  Li,
} from './styleCadastro';

import { addMissing } from '../../redux/apiCalls';
import { uploadFile } from '../../redux/fileSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { clearFile } from '../../redux/fileSlice';
import validationInputs from '../../helpers/validationInputs';
import formatDate from '../../helpers/formatDate';
import { autoComplete } from '../../helpers/autoComplete';

const Cadastro = () => {
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const maxDate = new Date().toISOString().split('T')[0];
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

  /* Taking the errors from the form and putting them in an array. */
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
    setSuccess(false);
    setError([]);
    requiredMessage.push();

    /* Uploading the files to firebase storage. */
    await uploadFile(files, dispatch);

    if (Object.keys(inputs).length >= 6) {
      setError(validationInputs(inputs));
    }
    if (files.length === 0) {
      setError((prevState) => [
        ...prevState,
        'Por favor, envie fotos da pessoa!',
      ]);
    }
  };

  /* A hook that is called when the component is mounted. It is checking if the files are uploaded to
firebase storage, if they are, it is adding the missing person to the database. */
  useEffect(() => {
    if (
      selector.files.length > 0 &&
      Object.keys(inputs).length >= 6 &&
      error.length === 0
    ) {
      const missing = { ...inputs, img: selector.files };
      missing.data = formatDate(missing.data);

      async function fetchUpload() {
        console.log('realizando fetch');
        await addMissing(missing, dispatch);
      }
      console.log('chamando fetchUpload');
      fetchUpload();

      error.length === 0 ? setSuccess(true) : setSuccess(false);
      setInputs('');
      setFiles([]);
    }
  }, [selector, dispatch, inputs, error, files]);

  //AUTOCOMPLETE
  const [showSuggestions, setShowSuggestions] = useState(false);
  const getAllSuggestions = autoComplete();
  const suggestions = getAllSuggestions.filter((option) =>
    option.toLowerCase().includes(inputs.municipio?.toLowerCase()),
  );
  const handleSuggestionClick = (suggestion) => {
    inputs.municipio = suggestion;
    setShowSuggestions(false);
  };
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
            maxLength={2}
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
            max={maxDate}
            id="formatMaxDate"
          />
          <Label>Municipio:</Label>
          <Input
            
            {...register('municipio', {
              required: { value: true, message: 'Inserir o municipio!' },
            })}
            placeholder="São Paulo - SP"
            type="text"
            value={inputs.municipio || ''}
            onFocus={() => {
              setShowSuggestions(true);
            }}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {showSuggestions && (
            <Ul>
              {suggestions.map((suggestion) => (
                <Li onClick={() => handleSuggestionClick(suggestion)} key={suggestion}>
                  {suggestion}
                </Li>
              ))}
            </Ul>
          )}
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
            ? requiredMessage.map((erro, index) => (
                <Mistakes key={index}>{erro.message}</Mistakes>
              ))
            : null}
          {success ? (
            <Success>
              Cadastrado com sucesso em nosso banco de dados! Caso o
              identifiquemos, entraremos em contato!
            </Success>
          ) : (
            false
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Cadastro;
