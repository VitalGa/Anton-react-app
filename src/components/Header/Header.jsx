import { useState } from 'react';
import Button from '../Button/Button';
import SelectUser from '../SelectUser/SelectUser'; 
import Logo from '../Logo/Logo';

const logos = ['/logo.svg', '/vite.svg'];

function Header() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [secontIndex, setSecontIndex] = useState(0);
  console.log(secontIndex);
  const toggleLogo =  () => {
    setLogoIndex(state => Number(!state));
    setSecontIndex(i => i + 1);
  };

  return (
    <>
      <Logo image={logos[logoIndex]}/>
      <SelectUser />
      <Button onClick={toggleLogo}>Сменить лого</Button>
    </>    
  );
}

export default Header;
