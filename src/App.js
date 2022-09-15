import './App.css';
import Admin from './component/Admin';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import Forgetpassword from './component/Forgetpassword';
import AdminNavbar from './component/AdminNavbar';
import Landing from './component/Landing';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <AdminNavbar /> <Login/>
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/forgetpassword">
            <Forgetpassword />
          </Route>
           <Route path="/admin" render={(props) => <Admin {...props} />} /> 
        </Switch>
      </BrowserRouter> */}
      <Landing/>
    </div>
  );
}

export default App;
