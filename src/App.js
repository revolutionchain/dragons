import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import { useEffect } from 'react';

function App() {
  
  useEffect(() => {
    // 👇 add class to body element


    // 👇️ removing classes from body element
  }, []);
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component= {Home} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
