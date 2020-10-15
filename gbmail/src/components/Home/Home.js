import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get, uniq } from 'lodash';
import './Home.css';
import { LeftRail } from '../LeftRail/LeftRail';
import { TopNav } from '../TopNav/TopNav';
import { Emails } from '../Emails/Emails';

export const Home = () => {
  const [emails, setEmails] = useState();
  const [filteredEmails, setFilteredEmails] = useState();
  const [tags, setTags] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [openEmail, setOpenEmail] = useState(undefined);
  const [selected, setSelected] = useState([]);

  const getEmails = async () => {
    try {
      const res = await axios.get('/emails');
      const mail = get(res.data, 'messages', []);
      const tagsList = mail.reduce((acc, email) => {
        acc.push(...email.tags);
        return acc;
      }, []);
      setEmails(mail);
      setFilteredEmails(mail);
      setTags(uniq(tagsList));
    }
    catch (e) {
      alert('We were not able to retrieve your emails', e);
    }
  }

  useEffect(() => {
    if (!emails) {
      getEmails();
    }
  }, [emails])

  useEffect(() => {
    if (emails) {
      const filtered = emails.filter( email => {
        if (selectedTag && !email.tags.includes(selectedTag)) return false;
        if (!searchTerm || searchTerm.length < 1) return true;
        return email.subject.toLowerCase().includes(searchTerm) ||
          email.sender.toLowerCase().includes(searchTerm) ||
          email.body.toLowerCase().includes(searchTerm);
      });
      setFilteredEmails(filtered);
    }
  }, [searchTerm, selectedTag])

  const selectTag = (tag) => {
    setOpenEmail(undefined);
    setSelectedTag(tag);
    setSelected([])
  }

  const showFullEmailList = () =>  {
    setOpenEmail(undefined);
    setSelectedTag();
    setSelected([]);
  }

  const changeSearchTerm = (e) => {
    const term = e.target.value || '';
    setSearchTerm(term.toLowerCase());
  }

  const removeEmail = (id) => {
    if (typeof(id) === 'number') {
      setEmails(emails.filter(email => email.id !== id ))
      setFilteredEmails(filteredEmails.filter(email => email.id !== id ))
      setOpenEmail(undefined);
    } else {
      setEmails(emails.filter(email => !id.includes(email.id) ))
      setFilteredEmails(filteredEmails.filter(email => {
        return !id.includes(email.id) }
        ));
      setSelected([]);
      setOpenEmail(undefined);
    }
  }
  return (
    <div className='main-page'>
      <TopNav changeSearchTerm={changeSearchTerm} showFullEmailList={showFullEmailList}/>
      <div className='main-page-center'>
        <LeftRail selectTag={selectTag} selectedTag={selectedTag} showFullEmailList={showFullEmailList} tags={tags} />
        <Emails
          emails={filteredEmails}
          openEmail={openEmail}
          setOpenEmail={setOpenEmail}
          removeEmail={removeEmail}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  )
}