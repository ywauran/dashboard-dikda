import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SMA from "./components/SMA";
import SLB from "./components/SLB";
import SMK from "./components/SMK";
import DetailSchool from "./pages/DetailSchool";
import { data } from "./utils/data";

function App() {
  return (
    <>
      <div
        className="shadow-md navbar bg-base-100"
        style={{ position: "sticky", top: "0", zIndex: "1000" }}
      >
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost">
            Dinas Pendidikan Daerah
          </a>
        </div>
        <div className="flex-none">
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
          <Route path="/slb" element={<SLB data={data} />} />
          <Route path="/detail/:school" element={<DetailSchool />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
