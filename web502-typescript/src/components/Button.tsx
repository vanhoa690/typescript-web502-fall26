function MyButton() {
  const handleClick = () => {
    alert("Click button");
  };
  return (
    <div>
      <button className="border px-2" onClick={handleClick}>
        Button
      </button>
    </div>
  );
}

export default MyButton;
