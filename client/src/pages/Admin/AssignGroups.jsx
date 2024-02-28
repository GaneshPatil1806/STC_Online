import { useEffect, useState } from "react";
import axios from "axios";
import { appVars } from "../../conf/conf";
import Loading from "../../common/Loading";
import useUser from "../../context/userContext";
import toast from "react-hot-toast";

export default function AssignGroups() {
  const [domains, setDomains] = useState([]);
  const [teachersUnderDomain, setTeachersUnderDomain] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  //const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const { admin } = useUser();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${appVars.backendUrl}/api/domain`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setDomains(res.data.data);
      })
      .catch(() => setLoading(false));
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
      .get(`${appVars.backendUrl}/api/adminDashboard/getDomainGroup/${selectedDomain}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setGroups(res.data.data);
      })
      .catch(() => setLoading(false));
  };

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
    setSelectedTeacher(null);
    //setSelectedGroups([]);
    fetchTeachersUnderDomain(e.target.value);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
   // setSelectedGroups([]);
    fetchGroupsForTeacher();
  };

  const handleCheckboxChange = (group) => {
    // const updatedGroups = [...selectedGroups];
    // const index = updatedGroups.indexOf(group);
    // if (index === -1) {
    //   updatedGroups.push(group);
    // } else {
    //   updatedGroups.splice(index, 1);
    // }
    // setSelectedGroups(updatedGroups);
    setSelectedGroup((prev)=> prev ===0 ? group : 0)
  };

  const handleAssignGroups = () => {
    setLoading(true)
  //  console.log({teacherId:parseInt(selectedTeacher), groupId:selectedGroup});
    axios
      .post(`${appVars.backendUrl}/api/adminAllocation/allocateTeacher`,{teacherId:selectedTeacher, groupId:selectedGroup}, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.response.message)
      });
  };
  
  return (
    <div>
      {loading ? <div className="flex h-screen justify-center items-center"> <Loading/> </div>  : (
        <div className="flex justify-center items-center mt-5 gap-4 bg-slate-200 p-4">
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
              disabled={false}
            >
              {teachersUnderDomain.map((teacher) => (
                <option key={teacher.name} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          )}

          {selectedTeacher && groups.length > 0 && (
            <div>
              <p className="px-2 py-2 bg-gray-100 cursor-pointer outline-none mb-2">Select student groups:</p>
              {groups.map((group) => (
                <div key={group.id}>
                  <input
                    type="checkbox"
                    id={group.id}
                    checked={selectedGroup === group.id}
                    onChange={() => handleCheckboxChange(group.id)}
                  />
                  <label htmlFor={group.id}>{group.group_name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    <button className="bg-black text-white p-2 rounded-md" onClick={handleAssignGroups}>Assign</button>
    </div>
  );
}