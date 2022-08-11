import './App.css';
import './styles/home.css';
import './styles/files.css'
import './styles/login.css';
import './components/nav-top/navTop.css';
import './components/table-sales/tableSales.css';
import './components/cards-info-percent/cardsInfoPercent.css';
import './components/cards-info-percent/circle-percent/circlePercent.css';
import './components/cards-info-percent/investments/investments.css';
import './components/cards-info-advisers/cardsInfoAdvisers.css';
import './components/cards-info-advisers/table-advisers/tableAdviser.css';
import './components/nav-left/navLeft.css';
import './components/reloj/reloj.css';
import './components/create/create.css';
import './components/alerts/alerts.css';
import './components/files/upload/upload.css';
import './components/files/download/download.css';
import './components/files/shared/shared.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoutes from './components/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loggin } from './store/slices/loged.slice';
import Input from './pages/Input';
import Files from './pages/Files';
import Success from './components/alerts/Success';
import Danger from './components/alerts/Danger';
import Loader from './components/Loader';

function App() {

  const successOrError = useSelector(state=>state.successOrError);
  const isLoadding = useSelector(state=>state.isLoadding);
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("token"));

  if (token) {
    dispatch(loggin(true))
  };

  return (
    <HashRouter>
        <div className='body-page'>
          {
            successOrError === 'success' ?
              <Success />
            :
              <></>
          }
          {
            successOrError === 'error' ?
              <Danger />
            :
              <></>
          }
          {
            isLoadding ?
              <Loader />
            :
              <></>
          }

            <Routes>

              <Route path='/' element={<Login />}/>

                  <Route element={<ProtectedRoutes />}>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/input' element={<Input />}/>
                    <Route path='/files' element={<Files />}/>
                  </Route>

            </Routes>
        </div>
    </HashRouter>
  );
}

export default App;
