export const getPostData = (state) =>{
    return state.profilePage.postsData;
}
export const getNewPostText = (state) =>{
    return state.profilePage.newPostText;
}
export const getProfile = (state) =>{
    return state.profilePage.profile;
}
export const getStatus = (state) =>{
    return state.profilePage.status;
}
export const getCurrentPageUser = (state) =>{
    return state.profilePage.currentPageUser;
}
export const getErrorMessageProfile = (state) =>{
    return state.profilePage.errorMessageProfile;
}