import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../js/Login'
import expect from 'expect';
import { shallow } from 'enzyme';


describe('Tests UABay', () => {
  it('Texto botón login', () => {
    const login = shallow(<Login />);
    expect(login.find('#login-button').text()).toEqual('Login');
  });
  it('Texto bienvenida', () => {
    const login = shallow(<Login />);
    expect(login.find('#welcome').text()).toEqual('Bienvenido a UABay');
  });
  it('Texto usuario no existe', () => {
    const login = shallow(<Login existUser={false}/>);
    expect(login.find('#userNotExist').text()).toEqual('Ese usuario no existe');
  });
});