import './App.css';
import SignInOutContainer from './containers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Media from "react-media";
import Home from "./components/home.js"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const body = {backgroundColor:"#d5f8e7"}

function App() {

  return (
    <Router>
          <Switch>
            <Route exact path="/" render={()=><div style={body} className="App"><SignInOutContainer/></div>}/>
            <Route exact path="/home" component={Home}/>
          </Switch>
    </Router>
  );
}

export default App;
