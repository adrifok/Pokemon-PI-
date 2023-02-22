export const getTypes = () => async (dispatch) => {
  const response = await fetch("http://localhost:3000/types");
  console.log(response);
  const data = await response.json();
  console.log(data);

  dispatch({
    type: "get_type",
    payload: data,
  });
};

export const getPokemons = () => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/pokemons`);
  const data = await response.json();
  dispatch({
    type: "get_pokemons",
    payload: data,
  });
};


export const getByName = (name) => async (dispatch) => {
  const response = await fetch(
    `http://localhost:3000/pokemons?name=${name}`
  );
  const data = await response.json();
  dispatch({
    type: "get_name",
    payload: data,
  });
};

export const filters = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/pokemons/${id}`);
  const data = await response.json();
  dispatch({
    type: "get_byFilter",
    payload: data,
  });
};

export const type = (type) => (dispatch) => {
  dispatch({
    type: "get_byType",
    payload: type,
  });
};

export const order = (order) => (dispatch) => {
  dispatch({
    type: "get_inOrder",
    payload: order,
  });
};

export const add = (pokemon) => (dispatch) => {
  dispatch({
    type: "addPokemon",
    payload: pokemon,
  });
};
// export const deletePokemon = (id) => async (dispatch) =>{
//   const response = await fetch(`http://localhost:3000/pokemons/${id}`);
//   const data = await response.json();
//  dispatch({
//     type: "deletePokemon",
//     payload: pokemon,
//  });
// };