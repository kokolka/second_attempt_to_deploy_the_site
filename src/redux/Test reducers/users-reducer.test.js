import usersReducer, { acceptFollow, setUsers, setCurrentPage, setTotalCount, toggleIsFetching, toggleIsFollowingProgress } from "../users-reducer";


let initialState = {
    users: [
        {name: 'Alexeysap', id: 24200, uniqueUrlName: null, photos: 'a', status: null, followed: true},
        {name: 'Say', id: 24202, uniqueUrlName: null, photos: 'b', status: null, followed: false}
    ],
    pageSize: 5,
    pageTotalCount: 0, 
    currentPage: 1,
    isFetching: true,
    followingIsProgress: [24200]
};

test('add friend', () => {
    // 1) подготовка исходных данных - test date
    let action = acceptFollow(24200, false);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.users[0].followed).toBe(false); 
});

test('delete friend', () => {
    // 1) подготовка исходных данных - test date
    let action = acceptFollow(24202, true);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.users[1].followed).toBe(true); 
});
 
test('add user in list', () => {
    // 1) подготовка исходных данных - test date
    let newUser = [{name: 'Kal', id: 24222, uniqueUrlName: null, photos: 'b', status: null, followed: false}]
    let action = setUsers(newUser);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.users[0].id).toBe(24222); 
});
 
test('set current page', () => {
    // 1) подготовка исходных данных - test date
    let action = setCurrentPage(24);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.currentPage).toBe(24); 
});

test('total count users', () => {
    // 1) подготовка исходных данных - test date
    let action = setTotalCount(1000);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.pageTotalCount).toBe(1000); 
});

test('fetching', () => {
    // 1) подготовка исходных данных - test date
    let action = toggleIsFetching(false);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.isFetching).toBe(false); 
});

test('add fetching user', () => {
    // 1) подготовка исходных данных - test date
    let action = toggleIsFollowingProgress(true, 24202);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.followingIsProgress.length).toBe(2); 
});

test('delete fetching user', () => {
    // 1) подготовка исходных данных - test date
    let action = toggleIsFollowingProgress(false, 24200);

    // 2) Action 
    let newState = usersReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.followingIsProgress.length).toBe(0); 
});