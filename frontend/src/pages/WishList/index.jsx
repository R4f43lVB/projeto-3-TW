import axios from "axios";
import "./index.css";
import { useState } from "react";
import SideBar from "../../components/SideBar";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const jogos = await axios
      .get(`http://127.0.0.1:8000/game/WishList`)
      .then((resp) => resp.data);
  return { jogos };
}
export function trataImagem(props) {
  let im = props;
  // console.log(props);
  const link1 = im.slice(8, im.length);
  const link2 = link1.slice(0, link1.indexOf("%"));
  const resp = `https:/${link2}`;
  return resp;
}
function WishList() {
  const {jogos} = useLoaderData();
  console.log(jogos)
  return (
    <main className="corpoWish">
      <SideBar className="sidebar" />
      <div className="main-area-wish">
        {jogos.map((item) => (
          <div className="item">
          <Link to={`/gameFocus/${item.api_id}`}>
            <div key={item.id} className="jogo-Wish">
              <img src={trataImagem(item.img)} alt={`Capa de ${item.name}`}  className="imagens"/>
              <p className="text-game">{item.name}</p>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default WishList;
