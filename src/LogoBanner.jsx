function LogoBanner({ style }) {
  return (
    <div
      className={`h- row-1 flex h-1/2 w-full items-center justify-center p-8`}
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
