function MyForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input className="border" />
      <button type="submit" className="border">
        Submit
      </button>
    </form>
  );
}

export default MyForm;
