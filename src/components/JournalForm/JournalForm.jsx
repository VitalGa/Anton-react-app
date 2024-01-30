import React, { useContext, useEffect } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';


function JournalForm({ onSubmit }) { 
    const [formState, dispatchForm] = React.useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = React.useRef();
    const dateRef = React.useRef();
    const postRef = React.useRef();
    const { userId } = useContext(UserContext);
  
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

    useEffect(() => {
      dispatchForm({ type: 'SET_VALUE', payload: { userId }});
    }, [userId]);

    const onChange = (e) => {
      dispatchForm({ type: 'SET_VALUE', payload: {[ e.target.name ]: e.target.value }});
    };
  
    const addJournalItem=(e)=>{
    e.preventDefault();     
    dispatchForm({ type: 'SUBMIT' });        
  };

  return (  

            <form className={styles['journal-form']} onSubmit={addJournalItem}>
                  {userId}
                    <div>
                        <Input type="text" ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} name='title' appearence='title' /> 
                    </div>

                    <div className={styles['form-row']}>
                      <label htmlFor="date" >
                        <img src="/calendar.svg" alt="Иконка календаря" />
                        <span>Дата</span>
                      </label>
                      <Input type="date" ref={dateRef} isValid={isValid.date} onChange={onChange} value={values.date} name='date' id='data' /> 
                    </div>      
                    
                    <div className={styles['form-row']}>
                    <label htmlFor="tag"  >
                        <img src="/folder.svg" alt="Иконка папки" />
                        <span>Метки</span>
                      </label>
                      <Input type="text" id='tag'  onChange={onChange} value={values.tag} name='tag' className={styles['input']} />
                    </div>                    

                    <textarea name="post" ref={postRef} id="" onChange={onChange} value={values.post} cols="30" rows="10"  className={cn(styles['input'], {[styles['invalid']]: !isValid.post})}></textarea>

                    <Button text='Сохранить'/>

                  </form>

  );
}

export default JournalForm;