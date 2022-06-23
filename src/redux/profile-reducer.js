import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST/PROFILE';
const SET_USER_PROFILE = 'SET_USER_PROFILE/PROFILE';
const SET_CURRENT_ID_USER = 'SET_CURRENT_ID_USER/PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS/PROFILE';
const DELETE_POST = 'DELETE_POST/PROFILE';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS/PROFILE';
const SET_ERROR_MESSAGE_PROFILE = 'SET_ERROR_MESSAGE_PROFILE/PROFILE';
const RESET_ERROR_MESSAGE_PROFILE = 'RESET_ERROR_MESSAGE_PROFILE/PROFILE';

let initialState = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likeCounts: 10 },
        { id: 2, message: 'Are you busy?', likeCounts: 4 },
        { id: 3, message: 'I\'am not', likeCounts: 25 },
        { id: 4, message: 'Good', likeCounts: 1 }
    ],
    newPostText: '',
    profile: null,
    status: '',
    currentPageUser: '',
    errorMessageProfile: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            if (action.text != '') {

                let newPost = {
                    id: state.postsData.length + 1,
                    message: action.text,
                    likeCounts: 0
                };
                return {
                    ...state,
                    newPostText: '',
                    postsData: [...state.postsData, newPost]
                };
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_CURRENT_ID_USER: {
            return {
                ...state,
                currentPageUser: action.idUser
            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST:
            return {
                ...state, postsData: state.postsData.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: { ...state.profile, photos: action.photos }
            }
        case SET_ERROR_MESSAGE_PROFILE:
            return {
                ...state,
                errorMessageProfile: action.errorMessage
            }
        case RESET_ERROR_MESSAGE_PROFILE:
            return {
                ...state,
                errorMessageProfile: ''
            }
        default: return state;
    }
};

export const addPostActionCreator = (text) => {
    return { type: ADD_POST, text };
};
export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile };
};
export const setCurrentIdUser = (idUser) => {
    return { type: SET_CURRENT_ID_USER, idUser };
};
export const setUserStatus = (status) => {
    return { type: SET_USER_STATUS, status };
};
export const deletePost = (postId) => {
    return { type: DELETE_POST, postId };
};
export const savePhotoSuccess = (photos) => {
    return { type: SAVE_PHOTO_SUCCESS, photos };
};
export const setErrorMassageProfile = (errorMessage) => {
    return { type: SET_ERROR_MESSAGE_PROFILE, errorMessage };
};
export const resetErrorMassageProfile = () => {
    return { type: RESET_ERROR_MESSAGE_PROFILE };
};


export const getUserPageFunction = (id) => {
    return async (dispatch) => {
        let data = await profileAPI.getUserPage(id);
        dispatch(setUserProfile(data));
    }
}
export const getUserStatus = (id) => {
    return async (dispatch) => {
        let data = await profileAPI.getUserStatus(id);
        dispatch(setUserStatus(data));
    };
}
export const putUserStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.putUserStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (error) {
        console.log('ERROR with update state');
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.putMainPhoto(file);
    // .then(response => {
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
    // })
}
export const putProfileInfoParam = (profile) => async (dispatch) => {
    let response = await profileAPI.putProfileInfoParam(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserPageFunction(profile.userId));
        dispatch(resetErrorMassageProfile());
        return 0;
    }
    else {
        dispatch(setErrorMassageProfile(response.data.messages));
        return 1;
    }
}


export default profileReducer;