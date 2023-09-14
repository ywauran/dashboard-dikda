import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SMA from "./components/SMA";
import SLB from "./components/SLB";
import SMK from "./components/SMK";
import DetailSchool from "./pages/DetailSchool";
import Logo from "./assets/ic_logo.png";

function App() {
  return (
    <>
      <div
        className="flex items-center justify-between px-6 shadow-md navbar bg-base-100"
        style={{ position: "sticky", top: "0", zIndex: "1000" }}
      >
        <div className="flex items-center justify-center space-x-4">
          <img src={Logo} alt="" className="w-16 h-16" />
          <a className="hidden font-bold md:block">Dinas Pendidikan Daerah</a>
        </div>
        <div className="">
          <ul className="px-1 space-x-4 menu menu-horizontal">
            <li>
              <NavLink to="/">SMA</NavLink>
            </li>
            <li>
              <NavLink to="/smk">SMK</NavLink>
            </li>
            <li>
              <NavLink to="/slb">SLB</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <main className="p-8">
        <Routes>
          <Route path="/" element={<SMA />} />
          <Route path="/smk" element={<SMK />} />
          <Route path="/slb" element={<SLB />} />
          <Route path="/detail/:school/:id" element={<DetailSchool />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
