import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16'

/* Components */
import { TopNav } from './TopNav'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

let wrapper;
beforeEach(() => {
  wrapper = shallow(<TopNav
    showFullEmailList={jest.fn()}
  />)
  jest.clearAllMocks();
});

describe('LeftRail', () => {
  it('should render nav elements', () => {
    const rows = wrapper.find('div');
    expect(rows.first().html()).toBe('<div class="top-nav"><span class="logo-holder"><i aria-hidden="true" class="mail big icon email-logo-icon"></i><span class="email-logo-text">GBMail</span></span><span class="search-box-holder"><div class="ui icon input"><input type="text" placeholder="Search..."/><i aria-hidden="true" class="search icon"></i></div></span></div>');
  });
})