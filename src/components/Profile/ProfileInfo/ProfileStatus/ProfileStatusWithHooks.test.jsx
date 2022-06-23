import React from 'react';
import TestRenderer from 'react-test-renderer';
import s from './ProfileStatus.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

test('test span', () => {
    const testRenderer = TestRenderer.create(<ProfileStatusWithHooks/>);
    const testInstance = testRenderer.root;
    let span = testInstance.findAllByType('span');

    expect(span).not.toBeNull; 
}); 

test('test input', () => {
    const testRenderer = TestRenderer.create(<ProfileStatusWithHooks/>);
    const testInstance = testRenderer.root;

    expect(() => {
        let input = testInstance.findAllByType('input');
    }).toThrow; 
}); 

test('test status on profile', () => {
    const testRenderer = TestRenderer.create(
    <ProfileStatusWithHooks status={'test'}/>
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByProps({className: s.status_editModeOff}).children).toEqual(['test']); 
}); 

// test('edit mod on. check input', () => {
//     const testRenderer = TestRenderer.create(<ProfileStatusWithHooks status={'test'}/>);
//     const testInstance = testRenderer.root;

//     let span = testInstance.findByType("span");
//     span.props.onDoubleClick();

//     let input = testInstance.findByType("input");  

//     expect(input.props.value).toBe('test');
// });  