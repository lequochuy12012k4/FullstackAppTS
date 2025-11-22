import { useEffect, useState } from "react"

export default function App() {

  const [taskBuffer, settaskBuffer] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/tasks/");
      const data = await res.json();
      settaskBuffer(data.tasks);
      console.log(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  return (
    <>
    </>
  )
}