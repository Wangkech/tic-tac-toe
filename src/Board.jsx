function Board({ board, setBoard }) {
  console.log(board);

  function updateCell(index) {
    let newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    console.log("this is cell number ", index);
  }
  return (
    <div className="w-[400px] h-[400px] bg-amber-900 p-2">
      <ul className="boxes w-[100%] h-[100%] grid grid-cols-3 grid-rows-3 gap-2">
        {board.map((cell, index) => (
          <li
            onClick={() => updateCell(index)}
            key={index}
            className="box border-4 border-dashed border-white flex align-center justify-center  bg-amber-300"
          >
            <p className="text-white text-5xl  text-center">{cell}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
