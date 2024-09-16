import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import router from './routers';
import layouts from './compnents/layout';

function App() {


  console.log(router.user[0].element)
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={layouts.user }>
        {router.user.map((item) => (
        <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>

        

      </Routes>
       
    </BrowserRouter>
  );
}

export default App;
