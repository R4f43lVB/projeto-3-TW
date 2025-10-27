import './index.css';
import axios from "axios";
import SideBar from '../../components/SideBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [titulo, setTitulo] = useState([])
  const [lista, setLista] = useState([])
  const pesquisar = (event) => {
    event.preventDefault();
    axios
      .get(`http://127.0.0.1:8000/game/search/${titulo}`)
      .then((resp) => {setLista(resp.data.search), console.log(resp.data.search)});

  }
  return (
    <>
      <main className='corpoSearch'>
      <SideBar className = "sidebar"/>
      <div className="main-area">
        <form className="form-card" onSubmit={pesquisar}>
          <input
            className="form-card-title"
            type="text"
            name="game-name"
            placeholder="Procurar jogo"
            onChange={(event) => setTitulo(event.target.value)}
            value={titulo}
          />
          <button className="btn" type="submit">Pesquisar</button>
        </form>
        <div className="jogos">
        {lista.map((item) =>(
          <div key={item.id}  className="jogo">
          <Link to={`/gameFocus/${item.id}` }>
          <div className='j'>
          <img src={item.image} className="imgjogo"/>
          <p className="texto-game">{item.name}</p>
          </div>
          </Link>
          </div>
        ))}
        </div>
      </div>
    </main>
  </>
  );
}

export default Search;