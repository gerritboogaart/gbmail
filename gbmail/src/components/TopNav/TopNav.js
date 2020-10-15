import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import './TopNav.css';


export const TopNav = ({ changeSearchTerm, showFullEmailList }) => {
  return (
    <div className='top-nav'>
      <span className='logo-holder'>
        <Icon name='mail' className='email-logo-icon' size='big' onClick={showFullEmailList} />
        <span className='email-logo-text'>GBMail</span>
      </span>
      <span className='search-box-holder'>
        <Input icon='search' placeholder='Search...' onChange={changeSearchTerm} />
      </span>
    </div>
  )
}