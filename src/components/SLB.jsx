import { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "./chart/PieChart";
import { Link } from "react-router-dom";

const SLB = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [startNumber, setStartNumber] = useState(1);
  const [trueCountStudent, setTrueCountStudent] = useState(0);
  const [falseCountStudent, setFalseCountStudent] = useState(0);
  const [trueCountTeacher, setTrueCountTeacher] = useState(0);
  const [falseCountTeacher, setFalseCountTeacher] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://rich-pear-pig-wear.cyclic.app/api/slb?page=${page}&limit=${limit}`
      );
      console.log(response.data);
      setData(response.data.data);
      console.log(response.data.data);
      setTrueCountStudent(response.data.trueCountStudent);
      setFalseCountStudent(response.data.falseCountStudent);
      setTrueCountTeacher(response.data.trueCountTeacher);
      setFalseCountTeacher(response.data.falseCountTeacher);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page, limit]);

  useEffect(() => {
    // Update startNumber when the page changes
    setStartNumber((page - 1) * limit + 1);
  }, [page, limit]);

  return (
    <>
      <div className="flex flex-col px-9">
        <div className="flex flex-col items-center justify-center p-8 md:flex-row">
          <div className="w-96">
            <PieChart
              trueLogin={trueCountStudent}
              falseLogin={falseCountStudent}
              title="Siswa"
            />
          </div>
          <div className="w-96">
            <PieChart
              trueLogin={trueCountTeacher}
              falseLogin={falseCountTeacher}
              title="Guru"
            />
          </div>
        </div>
        <div className="p-4 overflow-x-auto shadow-md">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>NPSN</th>
                <th>Nama Sekolah</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{startNumber + index}</td>
                  <td>{item["Org Unit ID"]}</td>
                  <td>{item["Org Unit Name"]}</td>
                  <td>
                    <Link
                      to={`/detail/slb/${item["Org Unit ID"]}`}
                      className="cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 mb-8">
        <div className="join">
          <button
            className={`join-item btn btn-outline ${
              page === 1 ? "disabled" : ""
            }`}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            disabled={page === 1}
          >
            «
          </button>
          <button
            className="join-item btn btn-outline"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default SLB;
