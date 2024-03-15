import { useEffect, useState } from "react";
import axios from "axios";
import { appVars } from "../../conf/conf";
import Loading from "../../common/Loading";
import useUser from "../../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

export default function AssignGroups() {
    const [domains, setDomains] = useState([]);
    const [teachersUnderDomain, setTeachersUnderDomain] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
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
        setSelectedTeacher('');
        fetchTeachersUnderDomain(e.target.value);
    };

    const handleTeacherChange = (e) => {
        setSelectedTeacher(e.target.value);
        fetchGroupsForTeacher();
    };

    const handleCheckboxChange = (group) => {
        if (selectedGroup != '') {
            setSelectedGroup('');
        } else {
            setSelectedGroup(group);
        }
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
                fetchGroupsForTeacher(); // No need for setTimeout here
            })
            .catch((e) => {
                setLoading(false);
                toast.error(e.response.data.message);
            });
    };

    return (
        loading ? <div className="flex h-screen justify-center items-center bg-[#71C9CE]"> <Loading /> </div> :
            <>
                <div className="flex flex-col fixed w-full">
                    <div className="flex items-center gap-4 bg-[#E3FDFD] p-4">

                    <Toaster />
                    <select
                        className="px-2 py-2 bg-gray-100 cursor-pointer outline-none border border-black"
                        value={selectedDomain}
                        onChange={handleDomainChange}
                    >
                        <option value=''>Select Domain</option>
                        {domains.map((domain) => (
                            <option key={domain.id} value={domain.id}>
                                {domain.domain_name}
                            </option>
                        ))}
                    </select>

                    {selectedDomain && (
                        <select
                            className="px-2 py-2 bg-gray-100 cursor-pointer outline-none border border-black"
                            value={selectedTeacher}
                            onChange={handleTeacherChange}
                        >
                            <option value=''>Select Teacher</option>
                            {teachersUnderDomain.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <button className="bg-black text-white p-2 rounded-md" onClick={handleAssignGroups}>Assign</button>
                </div>

                    <p className="px-2 py-2 bg-[#E3FDFD] cursor-pointer outline-nonefont-bold w-full">Select student groups:</p>
                </div>
                <div className="flex flex-col items-center p-20 bg-[#71C9CE] h-screen">
                    {selectedTeacher && groups.length > 0 && (
                        <table className="w-full mt-20">
                            <thead>
                                <tr className="bg-[#A6E3E9]">
                                    <th className="border border-black px-4 py-1">Select</th>
                                    <th className="border border-black px-4 py-1">Group Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((group, index) => (
                                    <tr key={group.id} className={index % 2 === 0 ? `bg-[#CBF1F5]` : `bg-[#A6E3E9]`}>
                                        <td className="border border-black px-4 py-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedGroup === group.id}
                                                onChange={() => handleCheckboxChange(group.id)}
                                            />
                                        </td>
                                        <td className="border border-black px-4 py-1">
                                            <label>{group.group_name.toUpperCase()}</label>
                                            {selectedGrpData && (
                                                <ul>
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
            </>
    );
}