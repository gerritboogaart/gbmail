import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16'

/* Components */
import { LeftRail } from './LeftRail'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

let wrapper;
beforeEach(() => {
  wrapper = shallow(<LeftRail
    tags={['First', 'Second']}
    selectTag={() => jest.fn()}
    showFullEmailList={jest.fn()}
  />)
  jest.clearAllMocks();
});

describe('LeftRail', () => {
  it('should render three elements', () => {
    const rows = wrapper.find('li')
    expect(rows).toHaveLength(3);
    expect(rows.first().text()).toBe('<Icon />Inbox');
    expect(rows.last().text()).toBe('<Icon /> Second');
  });

  it('should render only inbox', () => {
    wrapper = shallow(<LeftRail />)
    const rows = wrapper.find('li')
    expect(rows).toHaveLength(1);
    expect(rows.first().text()).toBe('<Icon />Inbox');
  })

  it('should select inbox', () => {
    const rows = wrapper.find('li');
    expect(rows.last().html()).toBe('<li class="tag"><i aria-hidden="true" class="tag icon"></i> Second</li>');
    expect(rows.first().html()).toBe('<li style="margin-left:6px" class="selected-tag tag"><i aria-hidden="true" class="mail icon"></i>Inbox</li>');
  })

  it('should select inbox', () => {
    wrapper = shallow(<LeftRail
      tags={['First', 'Second']}
      selectTag={() => jest.fn()}
      showFullEmailList={jest.fn()}
      selectedTag={'Second'}
    />)
    const rows = wrapper.find('li');
    expect(rows.last().html()).toBe('<li class=\"selected-tag tag\"><i aria-hidden=\"true\" class=\"tag icon\"></i> Second</li>');
    expect(rows.first().html()).toBe('<li style="margin-left:6px" class="tag"><i aria-hidden="true" class="mail icon"></i>Inbox</li>');
  })
})