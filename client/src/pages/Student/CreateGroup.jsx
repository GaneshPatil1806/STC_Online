import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Toaster,toast } from "react-hot-toast";
import { appVars } from "../../conf/conf";
import useUser from "../../context/userContext";

export default function CreateGroup() {
    const [domains, setDomains] = useState([]);
    const {user} = useUser();
    const [formData, setFormData] = useState({
        domain_id: "",
        roll_numbers: ""
    });
    const formRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${appVars.backendUrl}/api/domain`)
            .then((res) => {
                setDomains(res.data.data);
            })
            .catch((e) => console.log(e));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "roll_numbers" ? value.split(',').map(item => parseInt(item.trim())) : value
        });
    }
    
    function submitHandler(e) {
        e.preventDefault();

        const requestBody = {
            domain_id: parseInt(formData.domain_id),
            remaining_roll_numbers: formData.roll_numbers
        };
        console.log(requestBody);

        axios.post(`${appVars.backendUrl}/api/group/create`, requestBody, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                toast.success(res.data.message || 'Group Created!');
            })
            .catch((e) => {
                toast.error(e.response.message || 'Group not created!');
                console.log(e);
            });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster />
            <form ref={formRef} onSubmit={submitHandler} className="bg-slate-200 shadow-md rounded p-4 m-2 flex flex-col">
                <label htmlFor="roll_numbers" className="block text-gray-700 text-sm font-bold mb-2">
                    Roll Numbers (comma-separated):
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    type="text"
                    id="roll_numbers"
                    name="roll_numbers"
                    onChange={handleChange}
                />
                <label htmlFor="domain_id" className="block text-gray-700 text-sm font-bold mb-2">
                    DomainId
                </label>
                <select
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    value={formData.domain_id}
                    name="domain_id"
                    onChange={handleChange}
                >
                    <option value="">Select Domain</option>
                    {domains && domains.map((domain) => (
                        <option key={domain.id} value={domain.id}>
                            {domain.domain_name}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}