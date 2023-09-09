import { useState, useEffect } from "react";
import PropTypes from "prop-types";
const pageSize = 10;
import PieChartDetail from "./chart/PieChartDetail";

const DetailTeacher = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notActivatedCount, setNotActivatedCount] = useState(0);
  const [activatedCount, setActivatedCount] = useState(0);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Sort and count "Belum Selesai" and "Selesai" rows
  const sortedData = data.slice().sort((a, b) => {
    if (
      a["Last Sign In [READ ONLY]"] === "Never logged in" &&
      b["Last Sign In [READ ONLY]"] !== "Never logged in"
    ) {
      return -1;
    } else if (
      a["Last Sign In [READ ONLY]"] !== "Never logged in" &&
      b["Last Sign In [READ ONLY]"] === "Never logged in"
    ) {
      return 1;
    }
    return 0;
  });

  const currentData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Calculate counts
  const calculateCounts = () => {
    const notActivated = sortedData.filter(
      (item) => item["Last Sign In [READ ONLY]"] === "Never logged in"
    ).length;
    const activated = sortedData.length - notActivated;
    setNotActivatedCount(notActivated);
    setActivatedCount(activated);
  };

  // Call calculateCounts when data or currentPage changes
  useEffect(() => {
    calculateCounts();
  }, [data, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <>
      {/* Display counts */}
      <div className="flex justify-center">
        <div className="w-96">
          <PieChartDetail
            totalNotActivated={notActivatedCount}
            totalActivated={activatedCount}
          />
        </div>
      </div>

      <div className="p-4 overflow-x-auto shadow-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>NPSN</th>
              <th>Nama Sekolah</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Aktivasi Akun</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <th>{startIndex + index + 1}</th>
                <td>{item["Cost Center"]}</td>
                <td>{item["Org Unit Name"]}</td>
                <td>
                  {item["First Name [Required]"]} {item["Last Name [Required]"]}
                </td>
                <td>{item["Email Address [Required]"]}</td>
                <td>
                  {item["Last Sign In [READ ONLY]"] !== "Never logged in" ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">
                      Selesai
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">
                      Belum Selesai
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center mt-4 mb-8">
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
    </>
  );
};

DetailTeacher.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      "Org Unit Name": PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DetailTeacher;
