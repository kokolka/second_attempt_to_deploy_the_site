import { addMessageActionCreator} from '../../redux/dialog-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import {withAuthRedirect} from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { getDialogsData, getMessagesData, getNewMessage } from '../../redux/dialog-selectors';
import { getIsButtonDialog, getSizeApp } from '../../redux/app-selectors';
import { changeIsButtonDialog, setIsButtonDialog } from '../../redux/app-reducer';


let mapStateToProps = (state) =>{
    return{
        dialogsData: getDialogsData(state),
        messagesData: getMessagesData(state),
        newMessage: getNewMessage(state),
        isButtonDialog: getIsButtonDialog(state),
        sizeApp: getSizeApp(state) 
    }
}

let mapDispatchToProps = (dispatch)=>{
    return{
        onSendMessage: (text) => {
            dispatch(addMessageActionCreator(text));
        },
        setIsButtonDialog: () => {
            dispatch(setIsButtonDialog());
        },
        changeIsButtonDialog: () => {
            dispatch(changeIsButtonDialog());
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);