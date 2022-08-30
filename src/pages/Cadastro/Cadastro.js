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
import app from '../../redux/firebase';
import { addMissing } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const Cadastro = () => {
  const [inputs, setInputs] = useState('');
  const [files, setFiles] = useState('');
  const [urls, setUrls] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setFiles((prevState) => [...prevState, newImage]);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const promises = [];
    files.map((file, index) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prevState) => [...prevState, downloadURL]);
            console.log(downloadURL);
          });
        },
      );
    });
  };

  useEffect(() => {
    if (urls.length !== files.length || files.length === 0) return;

    const missing = { ...inputs, img: urls };
    addMissing(missing, dispatch);
    setFiles('');
    setUrls('');
  }, [urls]);

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
            Enviar fotos
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
