import PieChart from "./chart/PieChart";
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes library

const DetailStudent = ({ data, totalActivation, totalNotActivation }) => {
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNumber, setCurrentNumber] = useState(1); // State to keep track of the current number

  if (!data) {
    return <div className="text-center">Loading...</div>;
  }

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data array to display only the current page's items
  const currentPageData = data.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    // Update currentNumber based on the newPage
    setCurrentNumber((newPage - 1) * itemsPerPage + 1);
  };

  return (
    <>
      <div className="mx-auto w-96">
        <PieChart
          trueLogin={totalActivation}
          falseLogin={totalNotActivation}
          title="Guru"
        />
      </div>
      <div className="p-4 overflow-x-auto shadow-md">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Email</th>
              <th>Aktivasi Akun</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr key={index}>
                <th>{currentNumber + index}</th>{" "}
                {/* Display current index number */}
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.emailAddress}</td>
                <td>
                  {item.lastSignIn !== "Never logged in" ? (
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
      <div className="flex justify-center my-4 space-x-4">
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
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
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(data?.length / itemsPerPage)}
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
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

// Define the prop types for your component
DetailStudent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      emailAddress: PropTypes.string.isRequired,
      lastSignIn: PropTypes.string.isRequired,
    })
  ),
  totalActivation: PropTypes.number.isRequired,
  totalNotActivation: PropTypes.number.isRequired,
};

export default DetailStudent;
