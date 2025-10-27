import axios from "axios";
import "./index.css";
import { useState } from "react";
import SideBar from "../../components/SideBar";
import { Link, useLoaderData } from "react-router-dom";
export async function loader({ params }) {
  const jogo = await axios
      .get(`http://localhost:8000/game/colecao`)
      .then((resp) => resp.data);
  return { jogo };
}
export function trataImagem(props) {
  let im = props;
  // console.log(props);
  const link1 = im.slice(8, im.length);
  const link2 = link1.slice(0, link1.indexOf("%"));
  const resp = `https:/${link2}`;
  return resp;
}
function Collection() {
  const {jogo} = useLoaderData();
  console.log(jogo)
  return (
    <main className="corpoColection">
      <SideBar className="sidebar" />
      <div className="main-area-colecao">
        {jogo.map((item) => (
          <div key={item.id} className="item-jogo">
          <Link to={`/gameFocus/${item.api_id}`}>
            <div className="jogo-colecao">
              <img src={trataImagem(item.img)} alt={`Capa de ${item.name}`} className="imagens"/>
              <p className="text-game">{item.name}</p>
            </div>
          </Link>
        </div>
        ))}
      </div>
    </main>
  );
}

export default Collection;
