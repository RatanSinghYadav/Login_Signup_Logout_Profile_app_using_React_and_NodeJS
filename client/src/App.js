import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './component/home';
import Signup from './component/signup';
import Login from './component/login';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        {/* <Route path='/profile' element = {<Profile/>}/> */}
      </Routes>
    </Router>      
    </div>
  );
}

export default App;
