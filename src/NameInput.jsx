function NameInput({ setPlayer, placeholder }) {
  function getInput(e) {
    let name = e.target.value;
    setPlayer(name);
  }

  return (
    <div className="flex h-16 p-2">
      <input
        placeholder={placeholder}
        className="h-full w-37.5 bg-blue-200 p-1 text-2xl"

        size="30"
        onChange={getInput}
      />
    </div>
  );
}

export default NameInput;
