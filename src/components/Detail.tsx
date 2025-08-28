import { useEffect, useState } from "react";

interface DetailProps {
  url: string;
  onClose: () => void;
}

interface Data {
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}

export default function Detail({ url, onClose }: DetailProps) {
  const [pokemon, setPokemon] = useState<Data | null>(null);

  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(url);
      const data = await res.json();
      setPokemon(data);
    }
    getPokemon();
  }, [url]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 duration-300 "
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className="relative bg-white p-6 rounded-xl shadow-lg z-10 w-80"
        onClick={(e) => {
          e.stopPropagation(); // ngăn lan truyền event click
          console.log(e);
        }}
      >
        {pokemon && (
          <div className="text-center">
            <h2 className="text-2xl font-bold capitalize">
              {pokemon.species.name}
            </h2>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.species.name}
              className="mx-auto mt-2"
            />

            <p className="mt-2">Height: {pokemon.height}</p>
            <p className="mt-1">Weight: {pokemon.weight}</p>

            <div className="mt-2">
              <p className="font-semibold">Types:</p>
              <ul className="flex gap-2 justify-center mt-1">
                {pokemon.types.map((t) => (
                  <li
                    key={t.slot}
                    className="px-2 py-1 bg-gray-200 rounded-lg capitalize"
                  >
                    {t.type.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-semibold">Abilities:</p>
              <ul className="flex gap-2 justify-center flex-wrap mt-1">
                {pokemon.abilities.map((a) => (
                  <li
                    key={a.ability.name}
                    className="px-2 py-1 bg-blue-200 rounded-lg capitalize"
                  >
                    {a.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
