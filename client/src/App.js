import './App.scss';
import SignIn from './components/account/Signin';
import SignUp from './components/account/SignUp';
import Home from './components/home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
