import { useState } from "react";
import { orgUnitCounts } from "../utils/dataSMK";
import PieChart from "./chart/PieChart";
import { Link } from "react-router-dom";

const ItemsPerPage = 10; // Jumlah item yang ingin ditampilkan per halaman

const SMK = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Hitung jumlah halaman yang diperlukan
  const totalPages = Math.ceil(orgUnitCounts.data.length / ItemsPerPage);

  // Menghitung indeks item untuk halaman saat ini
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;

  // Mengambil item untuk halaman saat ini
  const itemsToDisplay = orgUnitCounts.data.slice(startIndex, endIndex);

  // Fungsi untuk mengubah halaman
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Menghitung jumlah total
  const totalActivation = orgUnitCounts.data.reduce(
    (total, item) => total + item.countActivation,
    0
  );
  const totalNotActivation = orgUnitCounts.data.reduce(
    (total, item) => total + item.countNotActivation,
    0
  );
  const grandTotal = totalActivation + totalNotActivation;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 place-content-center place-items-center">
        <PieChart
          title="Guru"
          trueLogin={orgUnitCounts.totalActivationTeacher}
          falseLogin={orgUnitCounts.totalNotActivationTeacher}
        />
        <PieChart
          title="Siswa"
          trueLogin={orgUnitCounts.totalActivationStudent}
          falseLogin={orgUnitCounts.totalNotActivationStudent}
        />
      </div>
      <div className="p-4 mt-8 overflow-x-auto shadow-md">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Sekolah</th>
              <th>Aktivasi</th>
              <th>Tidak Aktivasi</th>
              <th>Aktivasi (%)</th>
              <th>Tidak Aktivasi (%)</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay.map((item, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{item.orgUnitName}</td>
                <td>{item.countActivation}</td>
                <td>{item.countNotActivation}</td>
                <td>
                  {(
                    (item.countActivation /
                      (item.countActivation + item.countNotActivation)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td>
                  {(
                    (item.countNotActivation /
                      (item.countActivation + item.countNotActivation)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td>
                  <Link to={`/detail/smk/${item.orgUnitName}`}>
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
          <tfoot>
            <tr>
              <td colSpan="2">Total</td>
              <td>{totalActivation}</td>
              <td>{totalNotActivation}</td>
              <td>{((totalActivation / grandTotal) * 100).toFixed(2)}%</td>
              <td>{((totalNotActivation / grandTotal) * 100).toFixed(2)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2 pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-white rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-200"
          }`}
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
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-white rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-200"
          }`}
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

export default SMK;
