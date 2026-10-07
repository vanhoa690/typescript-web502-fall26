import { useState } from "react";
import { Link } from "react-router-dom";
interface Props {
  logo: string;
  text?: string;
}
function Header(props: Props) {
  console.log(props);
  // let label = " Danh sách SV";
  // const changeLabel = (newLabel) => {
  //   label = newLabel;
  //   console.log(label);
  // };
  //changeLable("DSSV")

  // useSate
  const [label, changeLable] = useState("Danh sách SV");
  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="#" className="text-xl font-semibold">
          <strong>{props.logo}</strong>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-200">
            Trang chủ
          </Link>
          <Link to="/add" className="hover:text-gray-200">
            Add
          </Link>
          <button onClick={() => changeLable("DSSV")}>Change Lable</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;

// Component Header
// App: can Header,
// App.tsx
// import Header
// return <Header />
