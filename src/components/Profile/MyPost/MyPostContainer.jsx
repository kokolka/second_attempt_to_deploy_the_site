import { addPostActionCreator } from '../../../redux/profile-reducer';
import MyPost from './MyPost';
import { connect } from 'react-redux';


let mapStateToProps = (state) =>{
    return{ 
        pd: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage
    }
}

let mapDispatchToProps =(dispatch)=>{
    return{
        AddPost:(text)=>{
            dispatch(addPostActionCreator(text));
        }
    }
}

let MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostContainer;