import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home.js';
import Products from './Pages/Products/Products';
import Footer from './Pages/Shared/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='wrapper'>
      <Switch>
        <Route exact path='/'>
        <Home></Home>
        </Route>
        <Route path="/products">
          <Products></Products>
        </Route>
      </Switch>
      </div>
      <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
