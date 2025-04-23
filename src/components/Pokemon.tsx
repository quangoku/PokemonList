import { useEffect, useState } from "react";

interface Data {
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
  };
}
interface Props {
  url: string;
}
const Pokemon = (props: Props) => {
  const [pokemon, setPokemon] = useState<Data | null>(null);
  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(props.url);
      const data = await res.json();
      setPokemon(data);
    }
    getPokemon();
  }, []);
  return (
    <div
      className="pokemon
     bg-blue-50 
     size-40
      flex 
    justify-center
      flex-col 
     text-center
    border-2
    rounded-2xl
    hover:bg-blue-100
     "
    >
      {pokemon ? "" : <p>loading...</p>}
      <div
        className="image w-full h-30 bg-no-repeat  bg-cover "
        style={{ backgroundImage: `url(${pokemon?.sprites.front_default})` }}
      ></div>
      <p className="mt-1">{pokemon?.species.name}</p>
    </div>
  );
};
export default Pokemon;
