import profileReducer, { addPostActionCreator, deletePost, setUserProfile, setUserStatus, setCurrentIdUser } from "../profile-reducer";

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
    currentPageUser: ''
};

test('add new post in profileReducer', () => {
    // 1) подготовка исходных данных - test date
    let action = addPostActionCreator('test post');

    // 2) Action 
    let newState = profileReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.postsData.length).toBe(5);
});

test('test on correct message', () => {
    // 1) подготовка исходных данных - test date
    let action = addPostActionCreator('test post'); 

    // 2) Action 
    let newState = profileReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.postsData[4].message).toBe('test post');
});

test('test of delete post', () => {
    // 1) подготовка исходных данных - test date
    let action = setUserProfile('Test')

    // 2) Action 
    let newState = profileReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.profile).toBe('Test'); 
});

test('set id user', () => {
    // 1) подготовка исходных данных - test date
    let action = setCurrentIdUser(42)

    // 2) Action 
    let newState = profileReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.currentPageUser).toBe(42); 
});

test('set status for profile', () => {
    // 1) подготовка исходных данных - test date
    let action = setUserStatus('test status')

    // 2) Action 
    let newState = profileReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.status).toBe('test status');
});

test('test of delete post', () => {
    // 1) подготовка исходных данных - test date
    let action = deletePost(1);

    // 2) Action 
    let newState = profileReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.postsData.length).toBe(3);
});