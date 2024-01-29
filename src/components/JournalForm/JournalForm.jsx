import React from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';



function JournalForm({ onSubmit }) { 
    const [formState, dispatchForm] = React.useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = React.useRef();
    const dateRef = React.useRef();
    const postRef = React.useRef();

    const focusError = (isValid) => {
      switch(true) {
        case !isValid.title:
          titleRef.current.focus();
          break;
        case !isValid.date:
          dateRef.current.focus();
          break;
        case !isValid.post:
          postRef.current.focus();
          break;
      }
    };

    React.useEffect(() => {
      let timerId;
      if (!isValid.title || !isValid.date || !isValid.post) {
        focusError(isValid);
        timerId = setTimeout(()=>{
          dispatchForm({ type: 'RESET_VALIDITY' });
        }, 1000);

        return (() => {
          clearTimeout(timerId);
        });
      }   
    }, [isValid]);
  
    React.useEffect(() => {
      if (isFormReadyToSubmit) {
        onSubmit(values);
        dispatchForm({type: 'CLEAR'});
      }
    }, [isFormReadyToSubmit, values, onSubmit]);

    const onChange = (e) => {
      dispatchForm({ type: 'SET_VALUE', payload: {[ e.target.name ]: e.target.value }});
    };
  
    const addJournalItem=(e)=>{
    e.preventDefault();     
    dispatchForm({ type: 'SUBMIT' });        
  };

  return (  
      <form className={styles['journal-form']} onSubmit={addJournalItem}>

        <div>
          <input type="text" ref={titleRef} onChange={onChange}  value={values.title} name='title'  className={cn(styles['input-title'], {
          [styles['invalid']]: !isValid.title}
        )}/>
        </div>

        <div className={styles['form-row']}>
          <label htmlFor="date" className={styles['form-label']}>
            <img src="/public/calendar.svg" alt="Иконка календаря" />
            <span>Дата</span>
          </label>
          <input type="date" ref={dateRef} onChange={onChange} value={values.date} name='date' id='data' className={cn(styles['input'], {[styles['invalid']]: !isValid.date})}/> 
        </div>      
        
        <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
            <img src="/public/folder.svg" alt="Иконка папки" />
            <span>Метки</span>
          </label>
          <input type="text" id='tag'  onChange={onChange} value={values.tag} name='tag' className={styles['input']} />
        </div>
        

        <textarea name="post" ref={postRef} id="" onChange={onChange} value={values.post} cols="30" rows="10"  className={cn(styles['input'], {[styles['invalid']]: !isValid.post})}></textarea>

        <Button text='Сохранить'/>

      </form>
  );  
}

export default JournalForm;
