import './App.css';
import SignInOutContainer from './containers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Media from "react-media";
import Main from "./components/main"

const body = {backgroundColor:"#d5f8e7"}

function App() {

  return (
    <div style={body} className="App">
     <SignInOutContainer/>
    </div>
  );
}

export default App;
