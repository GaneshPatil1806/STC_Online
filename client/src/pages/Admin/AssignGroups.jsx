import { useEffect, useState } from "react";
import axios from "axios";
import { appVars } from "../../conf/conf";
import Loading from "../../common/Loading";
import useUser from "../../context/userContext";

export default function AssignGroups() {
  const [domains, setDomains] = useState([]);
  const [teachersUnderDomain, setTeachersUnderDomain] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const { admin } = useUser();

  useEffect(() => {
    // setLoading(true);
    // axios
    //   .get(`${appVars.backendUrl}/api/domain`, {
    //     headers: {
    //       Authorization: `Bearer ${admin.token}`,
    //     },
    //   })
    //   .then((res) => {
    //     setLoading(false);
    //     setDomains(res.data.data);
    //   })
    //   .catch(() => setLoading(false));
  }, [admin]);

  const fetchTeachersUnderDomain = (id) => {
    setLoading(true);
    axios
      .get(`${appVars.backendUrl}/api/adminDashboard/getDomainTeacher/${id}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setTeachersUnderDomain(res.data.data);
      })
      .catch(() => setLoading(false));
  };

  const fetchGroupsForTeacher = () => {

    setLoading(true);
    axios
      .get(`${appVars.backendUrl}/api/adminDashboard/getDomainGroup/${selectedTeacher}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log('object');
        setGroups(res.data.data);
      })
      .catch(() => setLoading(false));
  };

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
    setSelectedTeacher(null);
    setSelectedGroups([]);
    fetchTeachersUnderDomain(e.target.value);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
    setSelectedGroups([]);
    fetchGroupsForTeacher();
  };

  const handleCheckboxChange = (group) => {
    const updatedGroups = [...selectedGroups];
    const index = updatedGroups.indexOf(group);
    if (index === -1) {
      updatedGroups.push(group);
    } else {
      updatedGroups.splice(index, 1);
    }
    setSelectedGroups(updatedGroups);
  };

  // const handleAssignGroups = () => {
    
  // };

  //console.log(teachersUnderDomain);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex gap-10">
          <select
            className="px-2 py-2 bg-gray-100 cursor-pointer outline-none mb-2"
            value={selectedDomain}
            onChange={handleDomainChange}
          >
            {domains.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.domain_name}
              </option>
            ))}
          </select>

          {selectedDomain && (
            <select
              className="px-2 py-2 bg-gray-100 cursor-pointer outline-none mb-2"
              value={selectedTeacher}
              onChange={handleTeacherChange}
            >
              {teachersUnderDomain.map((teacher) => (
                <option key={teacher.name} value={teacher.name}>
                  {teacher.name}
                </option>
              ))}
            </select>
          )}

          {selectedTeacher && groups.length > 0 && (
            <div>
              <p>Select student groups:</p>
              {groups.map((group) => (
                <div key={group.id}>
                  <input
                    type="checkbox"
                    id={group.id}
                    checked={selectedGroups.includes(group)}
                    onChange={() => handleCheckboxChange(group)}
                  />
                  <label htmlFor={group.id}>{group.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}