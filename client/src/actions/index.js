//import rootReducer from ("../reducers/index"); 
export const get_type ="get_type";
export const getThePokemons ="getThePokemons";
export const get_name ="get_name";
export const get_byFilter ="get_byFilter";
export const get_byType = "get_byType"
export const get_inOrder ="get_inOrder";
export const addPokemon ="addPokemon";
export const deletePokemon ="deletePokemon";

export const getTypes = () => {return async (dispatch) => {
  const response = await fetch("http://localhost:3000/types");
  //console.log(response);
  const data = await response.json();
  console.log(data);

  dispatch({ 
    type: get_type,
    payload: response.data,
  });
};
};

export const getPokemons = () => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/pokemons`);
  const data = await response.json();
  dispatch({
    type: "getThePokemons",
    payload: response.data,
  });
  console.log(data)
};


export const getByName = (name) => {return async (dispatch) => {
  const response = await fetch(
    `http://localhost:3000/pokemons?name=${name}`
  );
  const data = await response.json();
  dispatch({
    type: "get_name",
    payload:data.name,
  });
};
};

export const filters = (type) => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/pokemons/${type}`);
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

export const deleteThePokemon = (id) => async (dispatch) =>{
  await fetch(`http://localhost:3000/pokemons/${id}`, { method: 'DELETE' });
  dispatch({
    type: "deletePokemon"
  });
};
