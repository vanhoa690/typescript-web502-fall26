interface Props {
  label: string;
  text?: string;
  onClick?: () => void;
}

function MyButton(props: Props) {
  console.log(props);

  const handleClick = () => {
    alert("Click button");
  };
  return (
    <div>
      <p>{props.text || "Day doan text"}</p>
      <button className="border px-2" onClick={props.onClick || handleClick}>
        {props.label}
      </button>
    </div>
  );
}

export default MyButton;
