import { useState } from "react";
import { orgUnitCounts } from "../utils/data";
import PieChart from "./chart/PieChart";

const ItemsPerPage = 10; // Jumlah item yang ingin ditampilkan per halaman

const SMA = () => {
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
      <div className="grid grid-cols-2 place-content-center place-items-center">
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
      <div className="p-4 overflow-x-auto shadow-md">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Sekolah</th>
              <th>Aktivasi</th>
              <th>Tidak Aktivasi</th>
              <th>Aktivasi (%)</th>
              <th>Tidak Aktivasi (%)</th>
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
          className={`px-3 py-2 text-red-500 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-100 hover:bg-red-200"
          }`}
        >
          Previous
        </button>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-red-500 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-100 hover:bg-red-200"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default SMA;
