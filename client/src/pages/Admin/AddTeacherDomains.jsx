/* eslint-disable no-unused-vars */
import axios from "axios";
import { appVars } from "../../conf/conf";
import useUser from "../../context/userContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from '../../common/Loading'

export default function AddTeacherDomains() {
    const { admin } = useUser();
    const [loading,setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [domains, setDomains] = useState([]);
    const [selectedTeacher,setSelectedTeacher] = useState('');

    const [domainTeacher, setDomainTeacher] = useState({
        teacher_id: null,
        domains_id: [],
    });

    useEffect(() => {
        axios.get(`${appVars.backendUrl}/api/adminDashboard/teachers`, {
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
            .get(`${appVars.backendUrl}/api/adminAllocation/domainNotTeacher/${domainTeacher?.teacher_id}`, {
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                },
            })
            .then((res) => {
               // console.log(res.data.data);
                setDomains(res.data.data);
            })
            .catch((e) => console.log(e));
    }

    const handleSelectedTeacher = (e) => {
        const id = e.target.value;
        domainTeacher.teacher_id = id;
        setSelectedTeacher(id)
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
        setLoading(true);
        axios.post(`${appVars.backendUrl}/api/adminAllocation/doaminTeacherAllocation`,domainTeacher,{
            headers: {
                Authorization: `Bearer ${admin.token}`,
            },
        }).then((res)=>{
            toast.success(res.data.message)
            setLoading(false)
        }).catch((e)=>{
            toast.error(e.response.message)
            setLoading(false)
            console.log(e);
        })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="flex flex-col mb-4">
                <p>Select Teacher</p>
                <select
                    className="p-2 m-2 bg-gray-100 cursor-pointer outline-none"
                    onChange={handleSelectedTeacher}
                    value={selectedTeacher}
                >
                    <option selected="selected">Select Teacher</option>
                    {teachers && teachers.map((teacher) => (
                        <option key={teacher.name} value={teacher.id}>
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

                {loading && <Loading/>}
            </form>
        </div>
    );
}