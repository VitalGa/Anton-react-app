import './App.css';   
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton'; 
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './components/hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';


// const INITIAL_DATA = [
//     {
//       "id": "1",
//       "title": "Подготовка к обновлению курсов",
//       "text": "Горные походы открывают удивительные природные ландшафты.",
//       "date": "2014/3/3"     
//     },
//     {
//       "id": "2",
//       "title": "Поход в годы",
//       "text": "Основная же цель в горном походе – не покорение вершин, а преодоление перевалов.",
//       "date": "2024/5/6"
//     }      
//   ];

function App() {  
  const [items, setItems] = useLocalStorage('data'); 
  const [selectedItem, setSelectedItem] = useState({null});

  function mapItems(items) {
    if (!items) {
      return [];
    }
    return items.map(i => ({
      ...i,
      date: new Date(i.date)
    }));
  }

  const addItem = item => {
    if (!item.id) {
      setItems([...mapItems(items), {
          ...item,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map(i=>i.id)) + 1 : 1
      }]);
    } else {
      setItems([...mapItems(items).map(i => {
        if (item.id === item.id) {
          return {
            ...item
          };
        }
        return i;
      })]);
    }    
  };

  const deleteItem = (id) => {
    setItems([...items.filter(i => i.id !== id)]);
  };

  
  return (
    <UserContextProvider >
      <div className='app'>
        <LeftPanel>
          <Header/>
          <JournalAddButton clearForm={() => selectedItem(null)}/>
          <JournalList items={mapItems(items)} setItem={setSelectedItem}/>
          </LeftPanel>
          <Body>
            <JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}/>
          </Body>
      </div>
    </UserContextProvider>
    
  );
}

export default App;
