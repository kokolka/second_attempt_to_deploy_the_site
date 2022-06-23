import appReducer, { setInitialized, getErrorLogin } from "../app-reducer";


let initialState = {
    initialized: false, 
    numberError: 0,
    messageError: ''
};

test('set initialized', () => {
    // 1) подготовка исходных данных - test date
    let action = setInitialized();

    // 2) Action 
    let newState = appReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.initialized).toBe(true); 
});
