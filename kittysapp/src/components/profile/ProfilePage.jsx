import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfileDetails } from "../../services/api";
import { Upload } from "lucide-react";

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || "");

  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(profilePic);
    }
  }, [profilePic]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if (profilePic) formData.append("profilePic", profilePic);

    const updatedUser = await updateProfileDetails(formData);
    if (updatedUser) {
      updateProfile(updatedUser);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <label className="cursor-pointer flex items-center gap-2">
            <Upload size={16} />
            <span>Change Picture</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </label>
        </div>
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-zinc-800"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-zinc-800"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;