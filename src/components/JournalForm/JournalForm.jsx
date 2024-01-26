import React from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm({ onSubmit }) {   
    const [formValidState, setFormValidState] = React.useState({
        title: true,
        post: true,
        date: true
    });
  
    const addJournalItem=(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;
    if (!formProps.title?.trim().length) {
      setFormValidState(state => ({...state, title: false}));
      isFormValid = false;
    } else {setFormValidState(state => ({...state, title: true}));
  }
    if (!formProps.post?.trim().length) {
      setFormValidState(state => ({...state, post: false}));
      isFormValid = false;
    } else {setFormValidState(state => ({...state, post: true}));
  }
    if (!formProps.date) {
      setFormValidState(state => ({...state, date: false}));
      isFormValid = false;
      console.log(formValidState);
    } else {setFormValidState(state => ({...state, date: true}));
  }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);    
  };

  return (  
      <form className='journal-form' onSubmit={addJournalItem}>
        <input type="text" name='title' style={{border: formValidState.title ? undefined : '2px solid red'}}/>   
        <input type="date" name='date' style={{border: formValidState.date ? undefined : '2px solid red'}}/>   
        <input type="text" name='tag' />
        <textarea name="post" id="" cols="30" rows="10" style={{border: formValidState.post ? undefined : '2px solid red'}}></textarea>   
        <Button text='Сохранить'/>
      </form>    
  );  
}

export default JournalForm;
