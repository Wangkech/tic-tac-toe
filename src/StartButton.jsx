function StartButton({ text, click, style }) {
  return (
    <button
      className="h-18.75 w-fit min-w-36 rounded-4xl border-2 border-dashed border-white p-2 font-['piedra'] text-3xl text-white shadow-[0_0_20px_8px_rgb(33,38,39,0.25)]"
      onClick={click}
      style={style}
    >
      {text}
    </button>
  );
}

export default StartButton;
