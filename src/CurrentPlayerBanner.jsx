function CurrentPlayerBanner({ currentPlayer }) {
  return (
    <span className="flex h-10 w-full items-center justify-center gap-x-8 font-['piedra'] text-2xl text-white">
      <p className="mt-auto mb-auto h-full w-fit rounded-2xl px-4 py-1 text-center shadow-[0_0_20px_8px_rgb(33,38,39,0.25)] transition-[all_ease_0_1s]">
        {currentPlayer.name}'s Playing
      </p>
      <p className="h-full w-fit rounded-2xl px-4 py-1 shadow-[0_0_20px_8px_rgb(33,38,39,0.25)] transition-[all_ease_1s]">
        {currentPlayer.symbol}
      </p>
    </span>
  );
}

export default CurrentPlayerBanner;
