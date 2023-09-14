import { useState } from "react";
import DetailTeacher from "../components/DetailTeacher";
import DetailStudent from "../components/DetailStudent";
const DetailSchool = () => {
  const [selectedRole, setSelectedRole] = useState("teacher"); // Default role is set to 'teacher'

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

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
          {selectedRole === "teacher" ? <DetailTeacher /> : <DetailStudent />}
        </div>
      </div>
    </>
  );
};

export default DetailSchool;
