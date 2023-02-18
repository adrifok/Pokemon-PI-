export const getTypes = () => async (dispatch) => {
const response = await fetch("https://pokeapi.co/api/v2/type");
console.log(response);
const data = await response.json();
console.log(data);

dispatch({
    type: "get_type",
    payload: data,
});
};

export const getPokemons = () => async (dispatch) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = await response.json();
    dispatch({
        type: "get_pokemons",
        payload: data,
    });
};

export const getByName = (name) => async (dispatch) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?name=${name}`);
    const data = await response.json();
    dispatch({
        type: "get_name",
        payload: data,
    });
};

export const filters = (num) => async (dispatch) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?name=${num}`);
    const data = await response.json();
    dispatch({
        type: "get_byFilter",
        payload: data,
    });
};

export const type = (type) => dispatch =>{
    dispatch({
        type:"get_byType",
        payload: type,
    });
};

export const order = (order) => (dispatch) => {
    dispatch({
        type: "get_inOrder",
        payload: order,
    });
};

export const add = (pokemon) => (dispatch) =>{
    dispatch({
        type: "add",
        payload: pokemon,
    });
};
