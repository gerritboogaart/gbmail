import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16'

/* Components */
import { Emails, getDate, renderTags } from './Emails'

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

const MOCK_PROPS = {
  emails: [{id: 1, sender: 'test', date: new Date(), subject: 'hello world',  body: 'test'},
    {id: 2, sender: 'test2', date: new Date(), subject: 'bye world',  body: 'another test'}],
  selected: [],
  setOpenEmail: () => {},
  openMail: undefined,
  removeEmail: () => {},
  setSelected: () => {}
}

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Emails
    emails={MOCK_PROPS.emails}
    selected={[]}
    setOpenEmail={() => {}}
    openMail={undefined}
    removeEmail={() => {}}
    setSelected={() => {}}
  />)
  jest.clearAllMocks();
});


describe('Emails', () => {
  it('should render 2 rows of emails', () => {
    const rows = wrapper.find('tr')
    expect(rows).toHaveLength(2);
    expect(rows.first().text()).toBe('testhello worldOct 15');
  })
  it('should render nothing', () => {
    wrapper = shallow(<Emails
      emails={[]}
      selected={[]}
      setOpenEmail={() => {}}
      openMail={undefined}
      removeEmail={() => {}}
      setSelected={() => {}}
    />)
    const rows = wrapper.find('tr')
    expect(rows).toHaveLength(0);
  })

  it('should render second email', () => {
    wrapper = shallow(<Emails
      emails={MOCK_PROPS.emails}
      selected={[]}
      setOpenEmail={() => {}}
      openEmail={1}
      removeEmail={() => {}}
      setSelected={() => {}}
    />)
    const email = wrapper.find('div');
    const paragraphs = wrapper.find('p');
    const emailClass = email.first().props().children[1].props.className;
    expect(email).toHaveLength(6);
    expect(paragraphs).toHaveLength(3);
    expect(emailClass).toBe('single-email');
    expect(paragraphs.first().text()).toBe('bye world ');
  })

  it('should return date correctly', () => {
    const date = getDate('10/10/2010');
    expect(date).toBe('Oct 10');
  })

  it('should render tags', () => {
    const tags = renderTags(['Hello']);
    console.log(tags[0].props.children[2]);
    expect(tags[0].props.children[2]).toEqual('Hello');
  })

  it('should ignore no or empty tags', () => {
    const tags = renderTags([]);
    expect(tags.length).toBe(undefined);
  })

})