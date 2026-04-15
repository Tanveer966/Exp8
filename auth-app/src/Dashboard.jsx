import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:3001/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        alert("Not Authorized ❌");
        window.location.href = "/";
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard 🔐</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}