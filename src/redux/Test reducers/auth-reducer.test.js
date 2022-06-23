import authReducer, {setAuthUserData, setOutput} from '../auth-reducer'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

test('set user id', () => {
    // 1) подготовка исходных данных - test date
    let action = setAuthUserData(2, 'kirill-i_98@mail.ru', 'Kirill', true);

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.userId).toBe(2); 
});

test('set user email', () => {
    // 1) подготовка исходных данных - test date
    let action = setAuthUserData(2, 'kirill-i_98@mail.ru', 'Kirill', true);

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.email).toBe('kirill-i_98@mail.ru'); 
});

test('set user login', () => {
    // 1) подготовка исходных данных - test date
    let action = setAuthUserData(2, 'kirill-i_98@mail.ru', 'Kirill', true);

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.login).toBe('Kirill'); 
});

test('check is auth user', () => {
    // 1) подготовка исходных данных - test date
    let action = setAuthUserData(2, 'kirill-i_98@mail.ru', 'Kirill', true);

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.isAuth).toBe(true); 
});

test('in null user id', () => {
    // 1) подготовка исходных данных - test date
    let action = setOutput();

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.userId).toBe(null); 
});

test('in null user email', () => {
    // 1) подготовка исходных данных - test date
    let action = setOutput();

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.email).toBe(null); 
});

test('in null user login', () => {
    // 1) подготовка исходных данных - test date
    let action = setOutput();

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.login).toBe(null); 
});

test('in false is auth', () => {
    // 1) подготовка исходных данных - test date
    let action = setOutput();

    // 2) Action 
    let newState = authReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.isAuth).toBe(false); 
});