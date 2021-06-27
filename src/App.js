import './App.css';
import Game from "./Components.js/Game"
import EnterGame from './Components.js/EnterGame';
import { useSelector } from 'react-redux';
const App = () => {
  const enter = useSelector(state => state.enterGame);
  return (<div>
    {enter ? <EnterGame /> : <Game />}
  </div>
  )

}

export default App;
