import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import NewsContainer from './components/News/NewsContainer';
import Setting from './components/Setting/Setting';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainerHook from './components/Profile/ProfileContainerHook';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';

import { initializeApp, setSizeApp, handleAppError } from './redux/app-reducer';
import { meUser } from './redux/auth-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './HOC/withSuspense';
import { getInitialized, getIsButtonMenu, getSizeApp } from './redux/app-selectors';
import { getIsAuth } from './redux/auth-selectors';
import cn from 'classnames';
import MusicConteiner from './components/Music/MusicConteiner';
import NoFoundPage from './components/NoFoundPage/NoFoundPage';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const OnlyCatPageContainer = React.lazy(() => import('./components/Infinity cat/OnlyCatPageContainer'));

const DialogsSuspense = withSuspense(DialogsContainer);
const OnlyCatSuspense = withSuspense(OnlyCatPageContainer);

class App extends React.Component {
  catchAllUnhandledErrors = (reason) => {
    this.props.handleAppError(reason)
  }

  componentDidMount() {
    this.props.initializeApp();
    this.props.setSizeApp(document.getElementById('root').offsetWidth);

    //подписываемся на перехват всех ошибок
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    //отписываемся от перехвата всех ошибок
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {

    const reSize = () => { //функция для изменения размера root элемента в state
      if(this.props.sizeApp != document.getElementById('root').offsetWidth){ //проверка, изменился ли азмер экрана
        this.props.setSizeApp(document.getElementById('root').offsetWidth);
      }
    }
    
    new ResizeObserver(reSize).observe(document.getElementById('root')); //подписывание на изменение размера экрана

    if (!this.props.initialized) { //online mode
    //if (this.props.initialized) { //offline mode
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <div className='app-wrapper__header'>
          <HeaderContainer />
        </div>
        <div className={cn('app-wrapper__nav', {'app-wrapper__visibility__mobile': this.props.isButtonMenu})}>
          <NavbarContainer />
        </div>
        <div className={cn('app-wrapper__content')}>
          <Routes>
            <Route path='/' element={<ProfileContainerHook />} />
            <Route path='/profile' element={<ProfileContainerHook />}>
              <Route path='/profile/:id' element={<ProfileContainerHook />} />
            </Route>
            <Route path='/dialogs/' element={<DialogsSuspense />} >
              <Route path='/dialogs/:id' element={<DialogsSuspense />} />
            </Route>
            <Route path='/news' element={<NewsContainer />} />
            <Route path='/music' element={<MusicConteiner />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<LoginContainer />} />
            <Route path='/infinityCat' element={<OnlyCatSuspense />} />
            <Route path='*' element={<NoFoundPage/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStareToProps = (state) => {
  return {
    initialized: getInitialized(state),
    sizeApp: getSizeApp(state),
    isAuth: getIsAuth(state),
    isButtonMenu: getIsButtonMenu(state)
  }
} 

export default connect(mapStareToProps, {
  initializeApp,
  meUser,
  setSizeApp,
  handleAppError
})(App);
