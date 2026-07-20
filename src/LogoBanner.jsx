function LogoBanner({ style }) {
  return (
    <div
      className="flex h-87.5 w-full items-center justify-center"
      style={style}
    >
      <img
        className="h-25 w-80.5"
        src="./images/banner.svg"
        alt="Logo Banner"
      />
    </div>
  );
}

export default LogoBanner;
