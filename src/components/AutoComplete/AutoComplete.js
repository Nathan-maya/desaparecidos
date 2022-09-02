import React, { useState } from 'react';
import { Li, Ul } from './style';
import { autoComplete } from '../../helpers/autoComplete';

export const AutoComplete = ({ inputValue,passChildEstado }) => {
  const searchState = autoComplete();
  let word = [];
  for (let i of searchState) {
    if (i.toLowerCase().startsWith(inputValue.toLowerCase())) {
      word.push(i.substr(inputValue));
      // listItem.innerHTML = word;
    }
  }
  return (
    <Ul>
      {word.map((word, index) => (
        <Li key={index} onClick={(e)=>passChildEstado(word)}>
          {word}
        </Li>
      ))}
    </Ul>
  );
};
