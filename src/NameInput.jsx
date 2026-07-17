function NameInput({ setPlayer, placeholder }) {
  function getInput(e) {
    let name = e.target.value;
    setPlayer(name);
  }

  // function saveInput() {
  //   let input = getInput();
  //   setPlayer(input);
  // }
  return (
    <div className="flex">
      <input
        placeholder={placeholder}
        classnName=" w-[100px]"
        size="30"
        onChange={getInput}
      />
      <button>Save Name</button>
    </div>
  );
}

export default NameInput;
