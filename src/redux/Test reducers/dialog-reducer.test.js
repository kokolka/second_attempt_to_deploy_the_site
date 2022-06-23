import dialogReducer, { addMessageActionCreator } from "../dialog-reducer";


let initialState = {
    dialogsData: [
        { act: 0, id: 1, name: 'Kirill', foto: 'https://avatars.mds.yandex.net/i?id=9b771e9d8999bece7b6aa0fdd258cc60-5150842-images-thumbs&n=13' },
        { act: 0, id: 2, name: 'Anna', foto: 'https://pv1.narvii.com/uploaded_cover/7174/20be9783bffd3b9c915dda2a2fdf5982290ac86ar1-720-1280_raw.jpg' },
        { act: 0, id: 3, name: 'Dimon', foto: 'https://slovnet.ru/wp-content/uploads/2018/12/16-73.jpg' },
        { act: 0, id: 4, name: 'Serj', foto: 'https://w7.pngwing.com/pngs/784/201/png-transparent-avatar-the-last-airbender-aang-katara-youtube-roku-avatar-heroes-fictional-character-last-airbender.png' },
        { act: 0, id: 5, name: 'Diana', foto: 'https://pbs.twimg.com/media/Dj097YcX4AAgJ5G.jpg' }
    ],
    messagesData: [
        { id: 1, message: 'Hi', who: 1 },
        { id: 2, message: 'Hi', who: 2 },
        { id: 3, message: 'How are you?', who: 1 }
    ],
    newMessage: ''
};

test('increse array message', () => {
    // 1) подготовка исходных данных - test date
    let action = addMessageActionCreator('test text');

    // 2) Action 
    let newState = dialogReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.messagesData.length).toBe(4); 
});

test('add test message', () => {
    // 1) подготовка исходных данных - test date
    let action = addMessageActionCreator('test text');

    // 2) Action 
    let newState = dialogReducer(initialState, action);

    // 3) Ожиданый результат - Expectation
    expect(newState.messagesData[3].message).toBe('test text'); 
});