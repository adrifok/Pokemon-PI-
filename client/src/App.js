//configuracion de react router dom:
import { Switch, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LandingPage } from "./Pages/LandingPage/index";
import { Details } from "./Pages/Details/Details.jsx";
import { Create } from "./Pages/Create/Create.jsx";
import { Team } from "./Pages/Team/Team.jsx";
import { Pokemon } from "./components/Pokemon/Pokemon.jsx";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { getTypes, getPokemons } from "./actions";

export default function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  });

  //envuelvo toda mi app pasandole el browser router en un return
  return (
    // <>
    //   <NavBar />
    //   <Route exact path="/">
    //     <LandingPage />
    //   </Route>
    //   <Route exact path="/pokemon/:id">
    //     <Pokemon />
    //   </Route>
    //   <Route exact path="/home">
    //     <Details />
    //   </Route>
    //   <Route exact path="/create">
    //     <Create />
    //   </Route>
    //   <Route exact path="/team">
    //     <Team />
    //   </Route>
    // </>
    //export default App;
    
    <div className="App">
      {pathname !== "/" && <NavBar/>}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Details} />
        <Route exact path="/pokemon/:id" component={Pokemon} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/team" component={Team} />
    
      </Switch>
    </div>
  );
}
