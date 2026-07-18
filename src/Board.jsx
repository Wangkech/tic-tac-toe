function Board({ board, cellClickHandler }) {
  return (
    <div className="h-100 w-100 bg-amber-900 p-2">
      <ul className="boxes grid h-full w-full grid-cols-3 grid-rows-3 gap-2">
        {board.map((cell, index) => (
          <li
            onClick={() => cellClickHandler(index)}
            key={index}
            className="box align-center flex justify-center border-4 border-dashed border-white bg-amber-300"
          >
            <p className="text-center text-5xl text-white">{cell}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
