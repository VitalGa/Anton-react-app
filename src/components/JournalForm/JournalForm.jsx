import React from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';

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
      <form className={styles['journal-form']} onSubmit={addJournalItem}>

        <input type="text" name='title'  className={cn(styles['input'], {
          [styles['invalid']]: !formValidState.title}
        )} />

        <input type="date" name='date' className={cn(styles['input'], {[styles['invalid']]: !formValidState.date})}/>  

        <input type="text" name='tag' />

        <textarea name="post" id="" cols="30" rows="10"  className={cn(styles['input'], {[styles['invalid']]: !formValidState.post})}></textarea>

        <Button text='Сохранить'/>

      </form>    
  );  
}

export default JournalForm;
