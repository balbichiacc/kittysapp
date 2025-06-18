import React, { useEffect, useState } from "react";
import { getWatchHistory } from "../../services/api";

const WatchHistoryTab = ({ groupId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getWatchHistory(groupId);
      if (res) setHistory(res);
    };

    if (groupId) fetchHistory();
  }, [groupId]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Watch History</h3>
      {history.length === 0 ? (
        <p className="text-sm text-gray-500">No sessions yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((session) => (
            <li
              key={session._id}
              className="border p-2 rounded dark:border-zinc-700"
            >
              <p className="font-medium">{session.videoTitle}</p>
              <p className="text-sm text-gray-500">
                {new Date(session.date).toLocaleString()}
              </p>
              <a
                href={session.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm underline"
              >
                Watch Again
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchHistoryTab;