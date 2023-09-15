import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailTeacher from "../components/DetailTeacher";
import DetailStudent from "../components/DetailStudent";
import { filterAndCountNeverLoggedIn } from "../utils/data.js";
import { filterAndCountNeverLoggedInSMK } from "../utils/dataSMK.js";
import { filterAndCountNeverLoggedInSMA } from "../utils/dataSMA.js";

const DetailSchool = () => {
  const [selectedRole, setSelectedRole] = useState("teacher"); // Default role is set to 'teacher'
  const [data, setData] = useState({});
  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };
  const { school, name } = useParams();

  useEffect(() => {
    // Fetch and filter data here, assuming filterAndCountNeverLoggedIn is asynchronous
    async function fetchData() {
      try {
        if (school === "slb") {
          const result = await filterAndCountNeverLoggedIn(name);
          setData(result);
        } else if (school === "smk") {
          const result = await filterAndCountNeverLoggedInSMK(name);
          setData(result);
        } else {
          const result = await filterAndCountNeverLoggedInSMA(name);
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [school]);

  return (
    <>
      <div className="flex flex-col mt-8 px-9">
        <div className="sm:px-48 lg:px-80 xl:px-[480px]">
          <div className="flex items-center justify-center w-full py-2 mx-auto font-semibold bg-white border rounded-full">
            <div
              onClick={() => handleRoleChange("teacher")}
              className={`text-center px-6 py-2 ${
                selectedRole === "teacher"
                  ? "bg-[#C81E1E] text-white"
                  : "bg-white text-[#C81E1E]"
              } rounded-3xl xl:px-11 cursor-pointer`}
            >
              Guru
            </div>
            <div
              onClick={() => handleRoleChange("student")}
              className={`text-center px-6 py-2 ${
                selectedRole === "student"
                  ? "bg-[#C81E1E] text-white"
                  : "bg-white text-[#C81E1E]"
              } rounded-3xl xl:px-11 cursor-pointer`}
            >
              Siswa
            </div>
          </div>
        </div>
        <div className="mt-4">
          {selectedRole === "teacher" && data.dataTeacher ? (
            <DetailTeacher
              data={data.dataTeacher}
              totalActivation={data.totalActivationTeacher}
              totalNotActivation={data.totalNotActivationTeacher}
            />
          ) : selectedRole === "student" && data.dataStudent ? (
            <DetailStudent
              data={data.dataStudent}
              totalActivation={data.totalActivationStudent}
              totalNotActivation={data.totalNotActivationStudent}
            />
          ) : (
            <span className="loading loading-dots loading-md"></span> // Add a loading indicator if data is not yet available
          )}
        </div>
      </div>
    </>
  );
};

export default DetailSchool;
