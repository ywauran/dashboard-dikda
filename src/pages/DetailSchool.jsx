import { useParams } from "react-router-dom";
import {
  filterByOrgUnitName,
  filterStudent,
  filterTeacher,
} from "../utils/filtered";
import { newArray } from "../utils/data";
import { useEffect, useState } from "react";
import DetailStudent from "../components/DetailStudent";
import DetailTeacher from "../components/DetailTeacher";
const DetailSchool = () => {
  const [dataTeacher, setDataTeacher] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const { school } = useParams();
  const [selectedRole, setSelectedRole] = useState("Guru"); // Default role is set to 'Guru'

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  useEffect(() => {
    const result = filterByOrgUnitName(newArray, school);
    const student = filterStudent(result);
    const teacher = filterTeacher(result);
    setDataStudent(student);
    setDataTeacher(teacher);
  }, []);
  return (
    <>
      <div className="flex flex-col px-9">
        <div className="sm:px-48 lg:px-80 xl:px-[480px]">
          <div className="flex items-center justify-center w-full py-2 mx-auto font-semibold bg-white border rounded-full">
            <div
              onClick={() => handleRoleChange("Guru")}
              className={`text-center px-6 py-2 ${
                selectedRole === "Guru"
                  ? "bg-[#C81E1E] text-white"
                  : "bg-white text-[#C81E1E]"
              } rounded-3xl xl:px-11 cursor-pointer`}
            >
              Guru
            </div>
            <div
              onClick={() => handleRoleChange("Siswa")}
              className={`text-center px-6 py-2 ${
                selectedRole === "Siswa"
                  ? "bg-[#C81E1E] text-white"
                  : "bg-white text-[#C81E1E]"
              } rounded-3xl xl:px-11 cursor-pointer`}
            >
              Siswa
            </div>
          </div>
        </div>
        <div className="mt-4">
          {selectedRole === "Guru" ? (
            <DetailTeacher data={dataTeacher} />
          ) : (
            <DetailStudent data={dataStudent} />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailSchool;
