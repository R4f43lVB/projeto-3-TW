import "./index.css";
import { useState } from "react";
import axios from "axios";
import SideBar from "../../components/SideBar/index";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  // pega o jogo e em seguida as similares, retornando explicitamente os dados
  const gameResp = await axios.get(`http://127.0.0.1:8000/game/${params.id}/`);
  const similarResp = await axios.get(
    `http://127.0.0.1:8000/game/similar/${gameResp.data.api_id}`
  );
  return similarResp.data; // <-- retorno obrigatório
}

export default function Similar() {
  const [title, setTitle] = useState([]);
  const dados = useLoaderData();
  console.log(dados);

  return (
    <main className="corpoFav">
      <SideBar className="sidebar" />
      <div className="main-area-fav">
        {dados.data.similar_games.map((item) => (
          <div className="item">
            <Link to={`/gameFocus/${item.id}`}>
              <div key={item.id} className="jogo-fav">
                <img src={item.image} alt={`Capa de ${title}`} />
                <p className="text-game">{item.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
