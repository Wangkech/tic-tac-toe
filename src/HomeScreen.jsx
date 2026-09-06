import LogoBanner from "./LogoBanner";
import AccentLine from "./AccentLine";
import StartButton from "./StartButton";

export default function HomeScreen({ onGame, startGameHandler }) {
  return (
    <main className="flex h-full flex-col items-center justify-start gap-4">
      <LogoBanner onGame={onGame} />
      <AccentLine />
      <StartButton text="Start Game" onGame={onGame} click={startGameHandler} />
    </main>
  );
}
