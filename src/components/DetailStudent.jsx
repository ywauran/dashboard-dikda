import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PieChart from "./chart/PieChart";

const DetailStudent = () => {
  const [studentData, setStudentData] = useState(null);
  const [page, setPage] = useState(1);
  const [trueCount, setTrueCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);
  const limit = 5;
  const { school, id } = useParams();

  console.log(school);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://brainy-bee-sweatshirt.cyclic.app/api/${school}/student?page=${page}&limit=${limit}&center=${id}`
      );
      console.log(response.data.data);
      setStudentData(response.data.data);
      setTrueCount(response.data.trueCount);
      setFalseCount(response.data.falseCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [school]);

  if (!studentData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      {/* Display counts */}
      <div className="flex justify-center">
        <div className="w-96">
          <PieChart trueLogin={trueCount} falseLogin={falseCount} />
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
            {studentData.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item["Cost Center"]}</td>
                <td>{item["Org Unit Name"]}</td>
                <td>
                  {item["First Name [Required]"]} {item["Last Name [Required]"]}
                </td>
                <td>{item["Email Address [Required]"]}</td>
                <td>
                  {item["Last Sign In [READ ONLY]"] === true ? (
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
    </>
  );
};

export default DetailStudent;
