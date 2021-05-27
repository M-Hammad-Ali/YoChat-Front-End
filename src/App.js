import './App.css';
import Login from './components/login';
import Register from "./components/register"
import Test from "./components/test"
import SignInOutContainer from './containers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Media from "react-media";
import Main from "./components/main"

const body = {backgroundColor:"#d5f8e7"}

function App() {

  return (
    <div style={body} className="App">
     <Main/>
    </div>
  );
}

export default App;
