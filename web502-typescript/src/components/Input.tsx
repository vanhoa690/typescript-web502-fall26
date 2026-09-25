function MyInput() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return <input className="border" onChange={handleChange} />;
}

export default MyInput;
