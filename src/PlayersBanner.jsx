import { useGame } from "./hooks/useGame";

function Symbol({ players, s, currentPlayer }) {
  return (
    <div
      className={`flex h-full items-center justify-center rounded-2xl text-(--primary-bg) shadow-(--shadow) ${currentPlayer.symbol.toLowerCase() === s && "bg-(--primary-bg) text-white"}`}
    >
      <p className="font-['piedra'] text-3xl uppercase">
        {players?.find((p) => p.symbol.toLowerCase() === s).symbol}
      </p>
    </div>
  );
}
function PlayerDetails({ players, s, side }) {
  return (
    <div className={`flex flex-col p-2 ${side != "left" && "items-end"} `}>
      <p className="uppercase">
        {players?.find((p) => p.symbol.toLowerCase() === s).name}
      </p>
      <p>
        {side === "left"
          ? `Wins: ${players?.find((p) => p.symbol.toLowerCase() === s).wins}`
          : `${players?.find((p) => p.symbol.toLowerCase() === s).wins} :Wins`}
      </p>
    </div>
  );
}

export default function PlayersBanner({ currentPlayer }) {
  const { players } = useGame();
  console.log(currentPlayer);

  return (
    <div className="p row-2 grid h-full w-full max-w-87.5 grid-cols-[4rem_1fr_2rem_1fr_4rem] items-center gap-1 self-center justify-self-center rounded-2xl bg-white p-1 max-[376px]:scale-90">
      <Symbol currentPlayer={currentPlayer} players={players} s="x" />
      <PlayerDetails players={players} s="x" side="left" />
      <div className="flex flex-col items-start pl-2">
        <p>vs</p>
      </div>
      <PlayerDetails players={players} s={"o"} side="right" />
      <Symbol currentPlayer={currentPlayer} players={players} s="o" />
    </div>
  );
}
