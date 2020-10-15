import React from 'react';
import { map } from 'lodash';
import { Icon } from 'semantic-ui-react';
import './LeftRail.css';

export const LeftRail = ( { tags = [], selectTag, showFullEmailList, selectedTag } ) => {
  const drawTags = () => (
    map(tags, tag => (
      <li
        className={tag === selectedTag ? 'selected-tag tag' : 'tag'}
        key={tag} onClick={() => selectTag(tag)}
      >
        <Icon name='tag' /> {tag}
      </li>
    ))
  )
  return (
    <div className='left-rail'>
      <ul>
        <li style={{ 'marginLeft': '6px' }}  className={!selectedTag ? 'selected-tag tag' : 'tag'} key='inbox' onClick={() => showFullEmailList()} ><Icon name='mail' />Inbox</li>
        {drawTags()}
      </ul>
    </div>
  )
}