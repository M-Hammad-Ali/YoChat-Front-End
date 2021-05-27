import './App.css';
import SignInOutContainer from './containers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Media from "react-media";
import Main from "./components/main"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const body = {backgroundColor:"#d5f8e7"}

function App() {

  return (
    <Router>
        <div style={body} className="App">
          <Switch>
            <Route exact path="/" component={SignInOutContainer}/>
            <Route exact path="/home" component={Main}/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
