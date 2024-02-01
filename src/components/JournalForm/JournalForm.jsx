import React, { useContext, useEffect } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';


function JournalForm({ onSubmit, data, onDelete }) { 
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
      if (!data) {
        dispatchForm({type: 'CLEAR'});
        dispatchForm({ type: 'SET_VALUE', payload: { userId }});
      }
      dispatchForm({ type: 'SET_VALUE', payload: { ...data }});
    }, [data]);

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
        dispatchForm({ type: 'SET_VALUE', payload: { userId }});
      }
    }, [isFormReadyToSubmit, values, onSubmit, userId ]);

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

  const deleteJournalItem=()=>{
    onDelete(data.id);
    dispatchForm({type: 'CLEAR'});
    dispatchForm({ type: 'SET_VALUE', payload: { userId }});
  };
  

  return (
            <form className={styles['journal-form']} onSubmit={addJournalItem}>
                    <div className={styles['form-row']}>
                        <Input appearence="title" type="text" ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} name='title'  /> 
                        {data?.id && <button>
                          <img src="/archive.svg" alt="Кнопка удалить" 
                          className={styles['delete']}
                          type="button"
                          onClick={() => deleteJournalItem}/>
                        </button>}
                    </div>

                    <div className={styles['form-row']}>
                      <label htmlFor="date" >
                        <img src="/calendar.svg" alt="Иконка календаря" />
                        <span>Дата</span>
                      </label>
                      <Input type="date" ref={dateRef} isValid={isValid.date} onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} name='date' id='data' /> 
                    </div>      
                    
                    <div className={styles['form-row']}>
                    <label htmlFor="tag"  >
                        <img src="/folder.svg" alt="Иконка папки" />
                        <span>Метки</span>
                      </label>
                      <Input type="text" id='tag'  onChange={onChange} value={values.tag} name='tag' className={styles['input']} />
                    </div>                    

                    <textarea name="post" ref={postRef} id="" onChange={onChange} value={values.post} cols="30" rows="10"  className={cn(styles['input'], {[styles['invalid']]: !isValid.post})}></textarea>

                    <Button>Сохранить</Button>   

                  </form>

  );
}

export default JournalForm;