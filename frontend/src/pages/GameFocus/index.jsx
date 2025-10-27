import "./index.css";
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const id = params.id;
  const game = await axios
    .get(`http://localhost:8000/game/${id}/`)
    .then((res) => res.data);
  const precos = await axios
    .get(`http://localhost:8000/price/${id}/`)
    .then((res) => res.data);

  return { game, precos };
}

export function trataImagem(props) {
  let im = props;
  // console.log(props);
  const link1 = im.slice(8, im.length);
  const link2 = link1.slice(0, link1.indexOf("%"));
  const resp = `https:/${link2}`;
  return resp;
}

export default function GameFocus(props) {
  const { game } = useLoaderData();
  const { precos } = useLoaderData();
  console.log(precos)
  const [titulo, setTitulo] = useState([game.name]);
  const [descricao, setDescricao] = useState([game.descricao]);
  const [image, setImage] = useState(trataImagem(game?.img));
  async function AdicionaColecao(event) {
    event.preventDefault();
    game.colecao = !game.colecao;
    axios.post(`http://localhost:8000/game/${game.api_id}/`, game)
    .then(alert(`${titulo} foi adicionado à sua coleção`))
    if(precos.hasOwnProperty("existe")){
    for(let item = 0; item <precos.length; item++){
      const precin = precos[item];
      axios.post(`http://localhost:8000/price/${game.api_id}/`,precin)
    }}
  }

  async function AdicionaWishList(event) {
    event.preventDefault();
    game.wishList = !game.wishList;
    axios.post(`http://localhost:8000/game/${game.api_id}/`,game)
    .then(alert(`${titulo} foi adicionado à sua Wish List`));
    if(precos.hasOwnProperty("existe")){
    for(let item = 0; item < precos.length; item++){
      const precin = precos[item];
      console.log(precin)
      axios.post(`http://localhost:8000/price/${game.api_id}/`,precin)
    }}

  }

  return (
    <main className="corpoGameFocus">
      <div id="foco">
        <img src={image} alt="Capa do jogo" className="capa" />
        <div id="infos" className="infos">
          <h1 className="title">{titulo}</h1>
          <p>{descricao}</p>
          <h3> precos</h3>
          <div>
            {precos.map((preco, index) => (
              <div key= {index}>
              <p> Preco {preco.price}</p>
              <p> desconto {preco.discount}</p>
              </div>
              ))}
          </div>
          <a href={`/semelhantes/${game.api_id}`} id="semelhantes">
            Ver semelhantes
          </a>
          <div id="options">
            <button onClick={AdicionaWishList}>
              <img src="/notebook.svg" alt="Wish" />
            </button>
            <button onClick={AdicionaColecao}>
              <img src="/bookshelf.svg" alt="Like" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
