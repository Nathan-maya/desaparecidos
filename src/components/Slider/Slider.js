import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

import { images } from '../../images';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  Container,
  SlideContent,
  Title,
  slide,
  ContainerAviso,
  number,
  span,
} from './styleSlide';

const Slider = () => {
  return (
    <Container>
      <ContainerAviso>
        <Title>SE VOCÊ TEM INFORMAÇÕES SOBRE PESSOAS DESAPARECIDAS</Title>
        <span style={span}>
          Ligue: <b style={number}>0800-2828-197</b>
        </span>
      </ContainerAviso>

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={6}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        style={slide}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <SlideContent>
              <img src={image.img} alt="foto de pessoa desaparecida" />
            </SlideContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Slider;
