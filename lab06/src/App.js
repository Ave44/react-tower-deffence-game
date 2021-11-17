import './App.css';
import Cookies from 'js-cookie';
import { useState } from 'react';

function App() {

  const [isLogged, setIsLogged] = useState(false)

  function handleClick() {
    const user = document.getElementById('name').value + document.getElementById('surname').value
    const liczbaOdwiedzin = Cookies.get(user)
    if (liczbaOdwiedzin !== undefined) {
      Cookies.set(user, parseInt(liczbaOdwiedzin) + 1, { expires: 7 })
    }
    else (
      Cookies.set(user, '1', { expires: 7 })
    )
    setIsLogged(true)
    console.log(liczbaOdwiedzin)
    console.log(user)
  }

  function greet(isLogged) {
    if (isLogged === false) {
      return <div></div>
    }
    const user = document.getElementById('name').value + document.getElementById('surname').value
    return <div>Witaj {user} , odwiedziłeś naszą stronę {Cookies.get(user)} razy.</div>
  }

  return (
    <div>
      <div>{greet(isLogged)}</div>
      <h2>Imie</h2>
      <input type='text' id='name'/>
      <h2>Nazwisko</h2>
      <input type='text' id='surname'/>
      <button onClick={()=>{handleClick(0)}}>Potwierdź</button>
    </div>
  );
}

export default App;
