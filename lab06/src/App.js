import './App.css';
import Cookies from 'js-cookie';
import { useState } from 'react';

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState("")
  const [liczba, setLiczba] = useState(0)

  // const inMinute = new Date(new Date().getTime() + 1 * 60 * 1000); // sposób na ustawienie czasu życia ciastka na 1 minutę

  function handleClick() {
    const user = document.getElementById('name').value + ' ' + document.getElementById('surname').value
    const liczbaOdwiedzin = Cookies.get(user)
    if (liczbaOdwiedzin !== undefined) {
      Cookies.set(user, parseInt(liczbaOdwiedzin) + 1, { expires: 7 })
    }
    else {
      Cookies.set(user, '1', { expires: 7 })
    }
    setIsLogged(true)
    setUser(document.getElementById('name').value + " " + document.getElementById('surname').value)
    setLiczba(Cookies.get(user))
  }

  function handleRemove() {
    const cookies = Cookies.get()
    for(const cookie in cookies) {
      Cookies.remove(cookie)
    }
    setIsLogged(false)
    document.getElementById('name').value = ""
    document.getElementById('surname').value = ""
  }

  function greet(isLogged, user, liczba) {
    if (isLogged === false) { return <div></div> }
    return <h3>Witaj {user} , odwiedziłeś naszą stronę {liczba} razy.</h3>
  }

  return (
    <div>
      <div>{greet(isLogged, user, liczba)}</div>
      <h2>Imie</h2>
      <input type='text' id='name'/>
      <h2>Nazwisko</h2>
      <input type='text' id='surname'/>
      <button onClick={()=>{handleClick()}}>Potwierdź</button>
      <button onClick={()=>{handleRemove()}}>Usun wszystkie ciasteczka</button>
    </div>
  );
}

export default App;
