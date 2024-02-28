/* eslint-disable no-unused-vars */
import axios from "axios";
import { appVars } from "../../conf/conf";
import useUser from "../../context/userContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddTeacherDomains() {
    const { admin } = useUser();
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('Teacher');
    const [domains, setDomains] = useState([]);

    const [domainTeacher, setDomainTeacher] = useState({
        teacher_id: null,
        domains_id: [],
    });

    useEffect(() => {
        axios
            .get(`${appVars.backendUrl}/api/adminDashboard/teachers`, {
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                },
            })
            .then((res) => {
                // setLoading(false);
                setTeachers(res.data.data);
            })

    }, [admin]);

    function fetchDomains() {
        axios
            .get(`${appVars.backendUrl}/api/domain`, {
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                },
            })
            .then((res) => {
                //console.log(he);
                setDomains(res.data.data);
            })
            .catch((e) => console.log(e));
    }

    const handleSelectedTeacher = (e) => {
        const id = e.target.value;
        domainTeacher.teacher_id = id;
        fetchDomains();
    };

    const handleCheckboxChange = (domainId) => {
        setDomainTeacher((prevDomainTeacher) => {
            const isChecked = prevDomainTeacher.domains_id.includes(domainId);

            if (isChecked) {
                return { ...prevDomainTeacher, domains_id: prevDomainTeacher.domains_id.filter((id) => id !== domainId) };
            } else {
                return { ...prevDomainTeacher, domains_id: [...prevDomainTeacher.domains_id, domainId] };
            }
        });
    };
    
    const handleAssign = (e) => {
        e.preventDefault();
        console.log(domainTeacher);
        axios.post(`${appVars.backendUrl}/api/adminAllocation/doaminTeacherAllocation`,domainTeacher,{
            headers: {
                Authorization: `Bearer ${admin.token}`,
            },
        }).then((res)=>{
            toast.success(res.data.data.message)
            console.log(res.data.message);
        }).catch((e)=>{
            toast.error(e.response.message)
            console.log(e);
        })
    }

    //console.log(domains);

   // console.log(domainTeacher.domains_id);

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="flex flex-col mb-4">
                <select
                    className="p-2 m-2 bg-gray-100 cursor-pointer outline-none"
                    value={selectedTeacher}
                    onChange={handleSelectedTeacher}
                >
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>

                <label className="font-bold">Select Domains:</label>
                {domains && domains.map((domain) => (
                    <div key={domain.id}>
                        <input
                            className="m-2"
                            type="checkbox"
                            id={domain.id}
                            checked={domainTeacher.domains_id.some((id) => id === domain.id)}
                            onChange={() => handleCheckboxChange(domain.id)}
                        />
                        <label htmlFor={domain.id}>{domain.domain_name}</label>
                    </div>
                ))}


                <button onClick={handleAssign} type="submit" className="bg-black p-2 rounded-sm text-white">Fetch</button>
            </form>
        </div>
    );
}