import { estados } from '../dataEstadosMunicipios';

export function autoComplete() {
  let filterState = []
  estados.forEach((todosEstados) => {
    todosEstados.forEach((estados)=>{
      filterState.push(estados.toLowerCase())
    })
  });
  return filterState
}
