import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(20);
  useEffect(() => {
    async function getPokemons() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${count}`
      );
      const data = await res.json();
      setPokemons(data.results);
    }
    getPokemons();
  }, [count]);
  return (
    <>
      <div className="bg-blue-300 h-auto text-center">
        <h1 className="text-center text-5xl p-5">POKEMON LIST</h1>
        <div className="bg-blue-300 pl-5 pr-5 flex gap-3 justify-center items-center flex-wrap ">
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} url={pokemon.url}></Pokemon>
          ))}
        </div>
        <button
          className="
        cursor-pointer p-5
         bg-amber-100"
          onClick={() => {
            setCount(count + 5);
          }}
        >
          LOADMORE
        </button>
      </div>
    </>
  );
}

export default App;
