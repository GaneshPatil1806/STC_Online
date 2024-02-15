import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";

export default function GetDomain() {
  const [domain, setDomain] = useState([]);
  const { admin } = useUser();

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/domain`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => setDomain(res.data.data))
      .catch((e) => console.log(e));
  }, [admin.token]);

  return (
    <div>
      {domain &&
        domain.map((element) => (
          <div key={element.id}>
            <p>ID: {element.id}</p>
            <p>Domain Name: {element.domain_name}</p>
          </div>
        ))}
    </div>
  );
}
