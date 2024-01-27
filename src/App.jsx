import './App.css'; 
import React from 'react'; 
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton'; 
import JournalForm from './components/JournalForm/JournalForm';

const INITIAL_DATA = [
    // {
    //   id: 1,
    //   title: 'Подготовка к обновлению курсов',
    //   text: 'Горные походы открывают удивительные природные ландшафты.',
    //   date: new Date()     
    // },
    // {
    //   id: 2,
    //   title: 'Поход в годы',
    //   text: 'Основная же цель в горном походе – не покорение вершин, а преодоление перевалов.',
    //   date: new Date()
    // }      
  ];

function App() {  

  const [items, setItems] = React.useState(INITIAL_DATA);

  const addItem = item => {
    setItems(oldItems => [...oldItems, {
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: oldItems.length > 0 ? Math.max(...oldItems.map(i=>i.id)) + 1 : 1
    }]);
  };

  
  return (
    <div className='app'>
      <LeftPanel>
        <Header/>
        <JournalAddButton/>
        <JournalList items={items}/>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem}/>
        </Body>
    </div>
  );
}

export default App;