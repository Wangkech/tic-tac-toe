function Board({ board, cellClickHandler }) {
  return (
    <div className="mx-auto h-87.5 w-87.5 rounded-4xl bg-[--primary-blue] p-4 shadow-[0_0_20px_8px_rgb(33,38,39,0.25)]">
      <ul className="boxes grid h-full w-full grid-cols-3 grid-rows-3 gap-2">
        {board.map((cell, index) => (
          <li
            onClick={() => cellClickHandler(index)}
            key={index}
            className="box align-center flex justify-center rounded-4xl border-2 border-dashed border-white bg-[--primary-blue] font-['piedra']"
          >
            <p className="my-auto text-center text-5xl text-white">{cell}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
