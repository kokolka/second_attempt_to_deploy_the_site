import { newsAPI } from "../api/api";

const SET_NEWS_EVERYTHING = 'SET_NEWS_EVERYTHING/news';
const SET_THEME = 'SET_THEME/news';

let initialState = {
    news: null,
    theme: '',
    date: ''
}

const newsAC = (state = initialState, action) =>{
    switch(action.type){
        case SET_NEWS_EVERYTHING:
            return {
                ...state,
                news: action.news
            }
        case SET_THEME:
            return{
                ...state,
                theme: action.theme,
                date: action.date
            }

        default:
            return state;
    }
}

export const setNewsEverything = (news) => {
    return{type: SET_NEWS_EVERYTHING, news};
}
export const setTheme = (theme, date) => {
    return{type: SET_THEME, theme, date};
}

export const getNewsEverything = (theme, date) => (dispatch) => {
    newsAPI.getNewsEverything(theme, date)
    .then(response => {
        if(response.status === 200){
            dispatch(setNewsEverything(response.data.articles))
        }
    })
}

export default newsAC;
