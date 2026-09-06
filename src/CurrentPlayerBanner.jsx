function CurrentPlayerBanner({ currentPlayer, winner, gameOn }) {
  return (
    <span className="flex h-full w-full items-center justify-center gap-x-8 font-['piedra'] text-2xl text-white max-[376px]:scale-90">
      {!winner && gameOn && (
        <>
          <p className="mt-auto mb-auto h-full w-fit rounded-2xl px-4 py-1 text-center shadow-[0_0_20px_8px_rgb(33,38,39,0.25)] transition-[all_ease_0_1s]">
            {currentPlayer.name}'s Playing
          </p>
          <p className="h-full w-fit rounded-2xl px-4 py-1 shadow-[0_0_20px_8px_rgb(33,38,39,0.25)] transition-[all_ease_1s]">
            {currentPlayer.symbol}
          </p>
        </>
      )}
      {winner && (
        <p className="mt-auto mb-auto h-full w-fit rounded-2xl px-4 py-1 text-center shadow-[0_0_20px_8px_rgb(33,38,39,0.25)] transition-[all_ease_0_1s]">
          {winner.name} has WON 🎉🤴
        </p>
      )}
      {!winner && !gameOn && (
        <p className="mt-auto mb-auto h-full w-fit rounded-2xl px-4 py-1 text-center shadow-[0_0_20px_8px_rgb(33,38,39,0.25)] transition-[all_ease_0_1s]">
          TIED
        </p>
      )}
    </span>
  );
}

export default CurrentPlayerBanner;
