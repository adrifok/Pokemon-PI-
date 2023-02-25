//configuro un estado inicial con un a fn que no se modificara (initialState)
//los reducers devuelven un nuevo estado sin modificar el actual
//devuelven una nueva instancia (update) del estado inicial
//el reducer es una funcion

const initialState = {
  types: [],
  pokemons: [],
  type: "",
  order: "",
  team: [],
};

//console.log(store.getState())
const rootReducer = (state = initialState, action) => {
  //actions only tell what to do: reducers take the current state and action and return the new state 

  //otra opcion es armarlos con'if'
  //if(action.type === "get_type"){return {types:[...state.types.,action.payload]}};
  switch (action.type) {
    case "get_type":
      return {
        ...state,
        types: action.payload,
        //payload is the data that reducer will use to update the state
      };
    case "get_pokemons":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "get_name":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "get_byFilter":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "get_byType":
      return {
        ...state,
        order: action.payload,
      };
    case "get_inOrder":
      return {
        ...state,
        order: action.payload,
      };
    case "addPokemon":
      if(state.team.lenght === 8) state.team.shift();
      return {
        ...state,
        team:[...state.team,action.payload] 
      };
      case "deletePokemon":
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};
//console.log(store.getState())

export default rootReducer;
