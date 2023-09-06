export function filterByOrgUnitName(data, orgUnitName) {
  return data.filter((item) => item["Org Unit Name"] === orgUnitName);
}

export function filterStudent(data) {
  return data.filter((item) => item["Employee Title"] === "student");
}

export function filterTeacher(data) {
  return data.filter((item) => item["Employee Title"] === "teacher");
}
