import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PieChart from "./chart/PieChart";

const pageSize = 10; // Number of items to display per page

const SMA = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-96">
          <PieChart />
        </div>
      </div>
      <div className="p-4 overflow-x-auto shadow-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nama Sekolah</th>
              <th>Sudah Aktivasi</th>
              <th>Persentase Sudah Aktivasi</th>
              <th>Belum Aktivasi</th>
              <th>Persentase Belum Aktivasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => {
              const total = item.activated + item.notActivated;
              const percentActivated = ((item.activated / total) * 100).toFixed(
                2
              );
              const percentNotActivated = (
                (item.notActivated / total) *
                100
              ).toFixed(2);

              return (
                <tr key={index}>
                  <th>{startIndex + index + 1}</th>
                  <td>{item["Org Unit Name"]}</td>
                  <td>{item.activated}</td>
                  <td>{percentActivated}%</td>
                  <td>{item.notActivated}</td>
                  <td>{percentNotActivated}%</td>
                  <td>
                    <Link
                      to={`/detail/${item["Org Unit Name"]}`}
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
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-4">
          <div className="join">
            <button
              className="join-item btn btn-outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              className="join-item btn btn-outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

SMA.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      "Org Unit Name": PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SMA;
