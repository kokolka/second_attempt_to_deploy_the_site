import React from 'react';
import { connect } from 'react-redux';
import { getSizeApp } from '../../redux/app-selectors';
import {setSizeApp} from '../../redux/app-reducer'
import OnlyCatPage from './OnlyCatPage';
import setNamePage from '../common/SetNamePage/setNamePage';

const OnlyCatPageContainer = (props) =>{
    setNamePage('Infinite cats');
    return(
        <OnlyCatPage {...props}/>
    )
}

const mstp = (state) =>({
    sizeApp: getSizeApp(state)
})

export default connect(mstp, {setSizeApp})(OnlyCatPageContainer)