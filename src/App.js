
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Ventas from "./Ventas";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/ventas" component={Ventas} />

      </Switch>
  </Router>
    </div>
  );
}

export default App;
