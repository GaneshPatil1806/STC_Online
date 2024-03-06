import { useEffect, useState } from "react";
import axios from "axios";
import { appVars } from "../../conf/conf";
import Loading from "../../common/Loading";
import useUser from "../../context/userContext";
import toast, { Toaster } from "react-hot-toast";

export default function AssignGroups() {
    const [domains, setDomains] = useState([]);
    const [teachersUnderDomain, setTeachersUnderDomain] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('Select Domain');
    const [selectedTeacher, setSelectedTeacher] = useState('Select Teacher');
    const [selectedGroup, setSelectedGroup] = useState(0);
    const { admin } = useUser();
    const [selectedGrpData, setSelectedGrpData] = useState(null);

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
            .get(`${appVars.backendUrl}/api/adminAllocation/groupNotDomainTeacher/${selectedDomain}`, {
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
        fetchTeachersUnderDomain(e.target.value);
    };

    const handleTeacherChange = (e) => {
        setSelectedTeacher(e.target.value);
        fetchGroupsForTeacher();
    };

    const handleCheckboxChange = (group) => {
        setSelectedGroup((prev) => prev === 0 ? group : 0);
    };

    function showDetails(id) {
        if (selectedGrpData) {
            setSelectedGrpData(null);
            return;
        }

        setLoading(true);
        axios.get(`${appVars.backendUrl}/api/adminDashboard/getStudentInGroups/${id}`, {
            headers: {
                Authorization: `Bearer ${admin.token}`
            }
        }).then((res) => {
            setLoading(false);
            setSelectedGrpData(res.data.data);
        }).catch((e) => {
            setLoading(false);
            toast.error(e.response?.data?.message || 'Server Error!');
            console.log(e);
        });
    }

    const handleAssignGroups = () => {
        setLoading(true);
        axios
            .post(`${appVars.backendUrl}/api/adminAllocation/allocateTeacher`, { teacherId: selectedTeacher, groupId: selectedGroup }, {
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                },
            })
            .then(() => {
                setLoading(false);
                toast.success('Groups allocated!');
                setTimeout(() => {
                    fetchGroupsForTeacher();
                }, 1000);
            })
            .catch((e) => {
                setLoading(false);
                toast.error(e.response.message);
            });
    };

    return (
        <div className="flex flex-col items-center w-full">
            {loading ? (
                <div className="flex h-screen justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <div className="flex items-center gap-4 bg-slate-200 p-4 w-full">
                    <Toaster/>
                    <select
                        className="px-2 py-2 bg-gray-100 cursor-pointer outline-none"
                        value={selectedDomain}
                        onChange={handleDomainChange}
                    >
                        <option key='' value=''>Select Domain</option>
                        {domains.map((domain) => (
                            <option key={domain.id} value={domain.id}>
                                {domain.domain_name}
                            </option>
                        ))}
                    </select>

                    {selectedDomain && (
                        <select
                            className="px-2 py-2 bg-gray-100 cursor-pointer outline-none"
                            value={selectedTeacher}
                            onChange={handleTeacherChange}
                            disabled={false}
                        >
                            <option key='' value=''>Select Teacher</option>
                            {teachersUnderDomain.map((teacher) => (
                                <option key={teacher.name} value={teacher.id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <button className="bg-black text-white p-2 rounded-md" onClick={handleAssignGroups}>Assign</button>
                </div>
            )}

            <p className="px-2 py-2 bg-gray-200 cursor-pointer outline-none mb-2 font-bold w-full">Select student groups:</p>
            {selectedTeacher && groups.length > 0 && (
    <table className="w-full border-collapse border">
        <thead>
            <tr>
                <th className="border border-black px-4 py-1">Select</th>
                <th className="border border-black px-4 py-1">Group Name</th>
            </tr>
        </thead>
        <tbody>
            {groups.map((group) => (
                <tr key={group.id}>
                    <td className="border border-black px-4 py-1">
                        <input
                            type="checkbox"
                            id={group.id}
                            checked={selectedGroup === group.id}
                            onChange={() => handleCheckboxChange(group.id)}
                            value="name"
                        />
                    </td>
                    <td className="border border-black px-4 py-1">
                        <label htmlFor={group.id}>{group.group_name.toUpperCase()}</label>
                        {selectedGrpData && (
                            <ul className="">
                                {selectedGrpData.map((student) => (
                                    <li key={student.id}>{student.first_name}</li>
                                ))}
                            </ul>
                        )}
                        <button onClick={() => showDetails(group.id)} className="bg-black rounded-md text-white p-2 m-2">
                            {selectedGrpData ? 'Hide Details' : 'Show Details'}
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)}

        </div>
    );
}