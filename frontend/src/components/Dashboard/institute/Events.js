import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Events.css";

export default function Events() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", date: "", location: "" });
  const navigate = useNavigate();

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) => event.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add new event
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/events", form);
      setForm({ name: "", date: "", location: "" });
      setShowAdd(false);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h2>Events Management</h2>
        <div className="events-actions">
          <button className="events-btn" onClick={() => navigate("/")}>
            ← Dashboard
          </button>
          <button
            className="events-btn"
            onClick={() => setShowAdd((prev) => !prev)}
          >
            + Add Event
          </button>
        </div>
      </div>

      {showAdd && (
        <form className="add-event-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Event Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <button type="submit" className="events-btn">
            Add
          </button>
        </form>
      )}

      <div className="events-topbar">
        <input
          className="events-search"
          type="search"
          placeholder="Search event name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Events.css";

// const initialEvents = [
//   { id: 1, name: "Placement Drive", date: "2025-11-20", location: "Seminar Hall" },
//   { id: 2, name: "AI Workshop", date: "2025-12-04", location: "Lab 2" },
// ];

// export default function Events() {
//   const [search, setSearch] = useState("");
//   const [events, setEvents] = useState(initialEvents);
//   const [showAdd, setShowAdd] = useState(false);
//   const [form, setForm] = useState({ name: "", date: "", location: "" });
//   const navigate = useNavigate();

//   const filteredEvents = events.filter(
//     (event) => event.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (form.name && form.date && form.location) {
//       setEvents([
//         ...events,
//         {
//           id: events.length + 1,
//           name: form.name,
//           date: form.date,
//           location: form.location,
//         },
//       ]);
//       setForm({ name: "", date: "", location: "" });
//       setShowAdd(false);
//     }
//   };

//   return (
//     <div className="events-page">
//       <div className="events-header">
//         <h2>Events Management</h2>
//         <div className="events-actions">
//           <button className="events-btn" onClick={() => navigate("/")}>
//             ← Dashboard
//           </button>
//           <button className="events-btn" onClick={() => setShowAdd((prev) => !prev)}>
//             + Add Event
//           </button>
//         </div>
//       </div>

//       {showAdd && (
//         <form className="add-event-form" onSubmit={handleAdd}>
//           <input
//             type="text"
//             placeholder="Event Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//           <input
//             type="date"
//             placeholder="Date"
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={form.location}
//             onChange={(e) => setForm({ ...form, location: e.target.value })}
//             required
//           />
//           <button type="submit" className="events-btn">Add</button>
//         </form>
//       )}

//       <div className="events-topbar">
//         <input
//           className="events-search"
//           type="search"
//           placeholder="Search event name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <table className="events-table">
//         <thead>
//           <tr>
//             <th>Event Name</th>
//             <th>Date</th>
//             <th>Location</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredEvents.map((event) => (
//             <tr key={event.id}>
//               <td>{event.name}</td>
//               <td>{event.date}</td>
//               <td>{event.location}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
