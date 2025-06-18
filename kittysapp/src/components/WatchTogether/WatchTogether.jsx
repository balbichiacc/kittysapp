import React, { useEffect, useRef, useState, useContext } from "react";
import YouTube from "react-youtube";
import { SocketContext } from "../../context/SocketContext";

const WatchTogether = ({ groupId, isAdmin }) => {
  const [videoId, setVideoId] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [ready, setReady] = useState(false);
  const playerRef = useRef(null);
  const socket = useContext(SocketContext);

  const extractYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
    );
    return match ? match[1] : null;
  };

  const handleStartWatch = () => {
    const id = extractYouTubeId(inputUrl);
    if (id) {
      setVideoId(id);
      socket.emit("start-watch", { groupId, videoId: id });
    }
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setReady(true);
  };

  const onPlay = () => {
    if (isAdmin) {
      socket.emit("sync-play", { groupId });
    }
  };

  const onPause = () => {
    if (isAdmin) {
      socket.emit("sync-pause", { groupId });
    }
  };

  const onStateChange = (event) => {
    if (!ready || !playerRef.current) return;
    if (event.data === 1 && isAdmin) {
      const time = playerRef.current.getCurrentTime();
      socket.emit("sync-seek", { groupId, time });
    }
  };

  useEffect(() => {
    socket.on("start-watch", ({ videoId }) => {
      setVideoId(videoId);
    });

    socket.on("sync-play", () => {
      if (playerRef.current) playerRef.current.playVideo();
    });

    socket.on("sync-pause", () => {
      if (playerRef.current) playerRef.current.pauseVideo();
    });

    socket.on("sync-seek", ({ time }) => {
      if (playerRef.current) playerRef.current.seekTo(time, true);
    });

    return () => {
      socket.off("start-watch");
      socket.off("sync-play");
      socket.off("sync-pause");
      socket.off("sync-seek");
    };
  }, [socket]);

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-gray-900 shadow-lg w-full">
      {isAdmin && !videoId && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste YouTube URL"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleStartWatch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          >
            Start
          </button>
        </div>
      )}

      {videoId && (
        <YouTube
          videoId={videoId}
          opts={{
            height: "390",
            width: "640",
            playerVars: {
              autoplay: 1,
            },
          }}
          onReady={onPlayerReady}
          onPlay={onPlay}
          onPause={onPause}
          onStateChange={onStateChange}
        />
      )}
    </div>
  );
};

export default WatchTogether;
const handleStartWatch = async () => {
  const id = extractYouTubeId(inputUrl);
  if (id) {
    setVideoId(id);
    socket.emit("start-watch", { groupId, videoId: id });

    try {
      await axios.post("/api/watch", {
        groupId,
        videoId: id,
        startedBy: currentUser._id, // You can pass username if preferred
      });
    } catch (err) {
      console.error("Failed to save watch session:", err);
    }
  }
};