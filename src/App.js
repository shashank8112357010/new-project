import './App.css';
import Admin from './component/Admin';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
           <Route path="/admin" render={(props) => <Admin {...props} />} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
