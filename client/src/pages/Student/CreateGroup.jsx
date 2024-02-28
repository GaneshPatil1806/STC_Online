import axios from "axios"
import useUser from "../../context/userContext"
import { appVars } from "../../conf/conf";
import { useState } from "react";

export default function CreateGroup() {

    const { user } = useUser();
    const [formData, setFormData] = useState({
        roll_numbers: [], // State to store roll numbers as an array
        // Other form fields...
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.split(',').map(item => item.trim()) // Split input string by comma and trim spaces
        });
    }

    function submitHandler(e) {

        e.preventDefault();
        const requestBody = {
            domain_id: formData.domain_id,
            remaining_roll_numbers: formData.roll_numbers,
        };

        axios.post(`${appVars.backendUrl}/api/group/create`, requestBody, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="roll_numbers">Roll Numbers (comma-separated):</label>
                    <input
                        type="text"
                        id="roll_numbers"
                        name="roll_numbers"
                        value={formData.roll_numbers.join(', ')} // Join array elements with comma and space
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="domain_id"></label>
                    <input
                        type="text"
                        id="domain_id"
                        name="domain_id"
                        value={formData.roll_numbers.join(', ')} // Join array elements with comma and space
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
