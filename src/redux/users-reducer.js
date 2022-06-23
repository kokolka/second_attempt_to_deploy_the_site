import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW/USERS';
const SET_USERS = 'SET_USERS/USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE/USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT/USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING/USERS';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS/USERS';

let initialState = {
    users: [
        //  { id: 1, firstName: 'Kirill', lastName: 'Balachoncev', location: { country: 'Russia', city: 'Tomsk' }, userStatus: 'Live is good', statusFriend: true, foto: 'https://aroundpet.ru/wp-content/uploads/kot-shartrez.jpg' },
        //  { id: 2, firstName: 'Kata', lastName: 'Mda', location: { country: 'Russia', city: 'Moskov' }, userStatus: 'Live is shop', statusFriend: false, foto: 'https://catnames.ru/sites/default/files/inline/images/medn_7.jpg' },
        //  { id: 3, firstName: 'Dima', lastName: 'Luzgin', location: { country: 'Russia', city: 'Tomsk' }, userStatus: 'Live is work', statusFriend: true, foto: 'https://lookw.ru/9/957/1566942074-72.jpg' }
    ],
    pageSize: 5,
    pageTotalCount: 0,
    currentPage: 1,
    isFetching: true,
    followingIsProgress: []
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userID) {
                        return { ...u, followed: action.following };
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state,
                //users: [...state.users, ...action.users]} //склеиваем два массива, тот который был и тот который прищёл
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.page }
        case SET_TOTAL_COUNT:
            return { ...state, pageTotalCount: action.pageTotalCount }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingIsProgress: action.isFetching
                    ? [...state.followingIsProgress, action.userId]
                    : state.followingIsProgress.filter(id => id !== action.userId)
                // если isFetching true, то в ...state.followingIsProgress добавляется action.userId
                // иначе из массива state.followingIsProgress уберём элемент action.userId
            }
        default:
            return state;
    }
};

export const acceptFollow = (userID, following) => {
    return { type: FOLLOW, userID, following};
};
export const setUsers = (users) => {
    return { type: SET_USERS, users };
};
export const setCurrentPage = (page) => {
    return { type: SET_CURRENT_PAGE, page };
};
export const setTotalCount = (pageTotalCount) => {
    return { type: SET_TOTAL_COUNT, pageTotalCount };
};
export const toggleIsFetching = (isFetching) => {
    return { type: TOGGLE_IS_FETCHING, isFetching };
};
export const toggleIsFollowingProgress = (isFetching, userId) => {
    return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    //.then(data => {
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleIsFetching(false));

}

const followUnfollowLogic = async (dispatch, userID, methodAPI, following) =>{
        dispatch(toggleIsFollowingProgress(true, userID));
        let data = await methodAPI(userID);
        // .then(data => {
        if (data.resultCode == 0) {
            dispatch(acceptFollow(userID, following));
        };
        dispatch(toggleIsFollowingProgress(false, userID));
}


export const follow = (userID) => {

    return async (dispatch) => {
        let methodAPI = await usersAPI.followUser.bind(usersAPI);

        followUnfollowLogic(dispatch, userID, methodAPI, true);
    }
}

export const unfollow = (userID) => {

    return async (dispatch) => {
        let methodAPI = await usersAPI.deleteUser.bind(usersAPI);

        followUnfollowLogic(dispatch, userID, methodAPI, false);
    }
}

export default usersReducer;