import { connect } from 'react-redux';
import { getDialogsData } from '../../redux/dialog-selectors';
import {setIsButtonMenu} from '../../redux/app-reducer';
import Navbar from './Navbar';

let mepStateToProps = (state)=>{
    return{
        ff: getDialogsData(state)
    }
}

let NavbarContainer = connect(mepStateToProps, {
    setIsButtonMenu
})(Navbar);

export default NavbarContainer;