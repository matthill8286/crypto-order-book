import renderer from 'react-test-renderer';
import React from 'react';
import OrderBook from './index'

describe('<OrderBook />', function () {

  it('Should render correctly', function() {
    const component = renderer.create(<OrderBook />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})
