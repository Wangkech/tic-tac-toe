function StartButton({ text, click }) {
  return (
    <button
      className="h-[75px] w-[216px] rounded-4xl border-2 border-dashed border-white font-['piedra'] text-3xl text-white shadow-[0_0_20px_8px_rgb(33,38,39,0.25)]"
      onClick={click}
    >
      {text}
    </button>
  );
}

export default StartButton;
