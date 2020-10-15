import React from 'react';
import { map } from 'lodash';
import parse from 'html-react-parser';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';
import './Emails.css';

//exporting these functions for testing purposes; TODO break them out to emails-helper.js

export const getDate = (date) => {
  const day = new Date(date);
  return moment(day).format('MMM DD');
}

export const renderTags = (tags) => {
  if (!tags || tags.length < 1) return <span />;
  return map(tags, tag => <span key={tag} className='email-tag'><Icon name='tag' /> {tag}</span>);
}

export const Emails = ({ emails = [], setOpenEmail, openEmail, removeEmail, selected, setSelected }) => {
  const selectRow = (i) => {
    const arr = !selected.includes(i) ? [...selected, i] : selected.filter(index => index !== i);
    setSelected(arr);
  }

  const drawEmails = emails => {
    return map(emails, (email, i) => {
      return (
        <tr key={`row${i}`} className={selected.includes(i) ? 'selected-row' : ''}>
          <td className='td-select'><input type='checkbox' onChange={() => selectRow(email.id)} checked={selected.includes(email.id)} /></td>
          <td className='td-sender' onClick={() => setOpenEmail(i)}>{email.sender}</td>
          <td className='td-subject' onClick={() => setOpenEmail(i)}>{email.subject}</td>
          <td className='td-date' onClick={() => setOpenEmail(i)}>{getDate(email.date)}</td>
        </tr>
      )
    })
  }

  const drawEmailContent = () => {
    const email = emails[openEmail];
    return (
      <div className='single-email'>
        <div className='email-top'>
          <Icon link name='arrow left' onClick={() => setOpenEmail(undefined)} />
          <Icon link name='trash alternate' onClick={() => removeEmail(email.id)} />
          <span className='prev-next' style={{ display: 'inline-block', float: 'right' }}>
            <Icon disabled={openEmail === 0} link name='arrow alternate circle left outline' title='previous email' onClick={() => setOpenEmail(openEmail - 1)} />
            <Icon disabled={openEmail === emails.length - 1} link name='arrow alternate circle right outline' title='next email' onClick={() => setOpenEmail(openEmail + 1)} /></span>
        </div>
        <div className='email-full'>
          <div className='email-header'>
            <p className='email-subject'>{email.subject} <span>{renderTags(email.tags)}</span></p>
            <p className='email-info'>Date sent: {moment(email.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
            <p className='email-info'>From: {email.sender}</p>
          </div>
          <div className='email-body'>
            {parse(email.body)}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='main-emails'>
      { emails.length && openEmail === undefined && (
        <React.Fragment>
          { selected && selected.length > 0 && (
            <React.Fragment>
              <Icon link name='trash alternate' style={{ color: 'white' }} onClick={() => removeEmail(selected)} />
            </React.Fragment>
          )}
          <table className='email-table'>
            <tbody>
              {drawEmails(emails)}
            </tbody>
          </table>
        </React.Fragment>

      )}
      {
        openEmail >= 0 && drawEmailContent()
      }
    </div>
  )
}