interface Props {
  label: string;
}

function MyButton(props: Props) {
  console.log(props);

  const handleClick = () => {
    alert("Click button");
  };
  return (
    <div>
      <button className="border px-2" onClick={handleClick}>
        {props.label}
      </button>
    </div>
  );
}

export default MyButton;
