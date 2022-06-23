import axios from "axios"


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "7b2bf063-5f39-45d3-b53c-542238da0668"
    }
});
const instanceNews = axios.create({
    baseURL: 'https://newsapi.org/v2/',
});

const apiKeyForNews = "4e954c55f81e4146afe824bcfd5c7c2c";

//news
export const newsAPI = {
    getNewsEverything(theme, date){
        return instanceNews.get(`everything?q=${theme}&from=${date}&sortBy=publishedAt&apiKey=${apiKeyForNews}`);
    }
}


//app
export const usersAPI = {
    getUsers(page = 1, pageSize = 10){
        return instance.get(`users?page=${page}&count=${pageSize}`).then(response => response.data)
    },
    followUser(id){
        return instance.post(`follow/${id}`, {}).then(response => response.data)
    },
    deleteUser(id){
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
}

export const authAPI = {
    meGetUser(){
        return instance.get(`auth/me`);
    },
    postLogin(email, password, rememberMe = false, captcha = null){
        return instance.post('auth/login', {email, password, rememberMe, captcha}); //email, password, rememberMe
    },
    deleteLogOut(){ 
        return instance.delete('auth/login');
    }
}

export const securityAPI = {
    getUrlCaptcha(){
        return instance.get('security/get-captcha-url');
    }
}

export const profileAPI = {
    getUserPage(id){ 
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getUserStatus(id){
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    putUserStatus(status){
        return instance.put('profile/status', {status})
    },
    putMainPhoto(file){
        let formData = new FormData();
        formData.append('image', file);

        return instance.put('profile/photo', formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    putProfileInfoParam(profile){
        return instance.put('profile', profile);
    }
}