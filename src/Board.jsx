function Board({ board, gameOn, handleCellUpdate, winPattern }) {
  return (
    <div
      className={`max-[376px] mx-auto aspect-square h-full rounded-4xl bg-[--primary-blue] p-4 antialiased shadow-[0_0_20px_8px_rgb(33,38,39,0.25)] max-[376px]:scale-90`}
    >
      <ul className="boxes grid h-full w-full grid-cols-3 grid-rows-3 gap-2">
        {board.map((cell, index) => (
          <li
            onClick={() => handleCellUpdate(index)}
            key={index}
            className={`box align-center pointer-events-auto flex justify-center rounded-4xl border-2 border-dashed border-white font-['piedra'] shadow-(--shadow) ${!gameOn && "pointer-events-none"} ${winPattern?.includes(index) && "bg-white transition-all duration-350 ease-in"} ${board.includes("") === false ? "bg-(--accent-bg) " : "bg-(--primary-bg)"}`}
          >
            <p
              className={`my-auto text-center text-5xl ${winPattern?.includes(index) ? "text-(--primary-bg)" : "text-white"}`}
            >
              {cell}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
