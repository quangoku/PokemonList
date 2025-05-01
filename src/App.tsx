import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState(20);
  const [query, setQuery] = useState("");

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
      <div className="bg-blue-300 h-screen text-center">
        <h1 className="text-center text-5xl p-5">POKEMON LIST</h1>
        <input
          type="text"
          placeholder="Pokemon name"
          className="m-3 border-2 p-2 rounded-md"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
        <div className="bg-blue-300 pl-5 pr-5 flex gap-3 justify-center items-center flex-wrap ">
          {pokemons
            .filter((pokemon) => pokemon.name.toLowerCase().includes(query))
            .map((pokemon) => (
              <Pokemon key={pokemon.name} url={pokemon.url}></Pokemon>
            ))}
        </div>
        <div className="bg-blue-300">
          {" "}
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
      </div>
    </>
  );
}

export default App;
