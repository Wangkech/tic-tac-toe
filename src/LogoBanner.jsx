function LogoBanner({ style, onGame }) {
  return (
    <div
      className={`flex h-1/2 items-center justify-center p-8 ${onGame && " h-full w-full scale-80"}`}
      style={style}
    >
      <img
        className="h-full w-full"
        src="./images/banner.svg"
        alt="Logo Banner"
      />
    </div>
  );
}

export default LogoBanner;
