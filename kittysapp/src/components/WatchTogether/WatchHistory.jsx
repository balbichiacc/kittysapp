import React, { useEffect, useState } from "react";
import axios from "axios";

const WatchHistory = ({ groupId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/api/watch/${groupId}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching watch history:", err);
      }
    };
    fetchHistory();
  }, [groupId]);

  if (history.length === 0) {
    return <p className="text-gray-500">No watch sessions yet.</p>;
  }

  return (
    <div className="space-y-3 mt-4">
      <h3 className="text-lg font-semibold mb-2">Watch History</h3>
      <ul className="space-y-2">
        {history.map((session) => (
          <li key={session._id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md shadow-sm">
            <p className="text-sm">🎬 <strong>Video ID:</strong> {session.videoId}</p>
            <p className="text-sm">👤 <strong>Started By:</strong> {session.startedBy}</p>
            <p className="text-sm">🕒 <strong>Time:</strong> {new Date(session.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchHistory;