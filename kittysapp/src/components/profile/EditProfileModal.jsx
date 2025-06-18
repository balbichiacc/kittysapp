import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfileDetails } from "../../services/api";
import { Upload, X } from "lucide-react";

const EditProfileModal = ({ onClose }) => {
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
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="Preview"
              className="w-14 h-14 rounded-full object-cover"
            />
            <label className="cursor-pointer flex items-center gap-1 text-sm">
              <Upload size={14} />
              <span>Change</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded dark:bg-zinc-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              rows="2"
              className="w-full p-2 border rounded dark:bg-zinc-800"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;