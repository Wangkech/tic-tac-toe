function CurrentPlayerBanner({ currentPlayer }) {
  return (
    <span className="flex h-fit w-full justify-center gap-x-8 font-['piedra'] text-2xl text-white">
      <p className="h-full w-fit rounded-2xl p-4 shadow-[0_0_20px_8px_rgb(33,38,39,0.25)]">
        {currentPlayer.name}'s Playing
      </p>
      <p className="h-full w-fit rounded-2xl p-4 shadow-[0_0_20px_8px_rgb(33,38,39,0.25)]">
        {currentPlayer.symbol}
      </p>
    </span>
  );
}

export default CurrentPlayerBanner;
