import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import "./Profile.css";


function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user"))|| {};
  useEffect(() => {
  document.title = "MyStore | Profile";
}, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      await API.put(
        "/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Profile Updated Successfully");

      
      if (user) {
        user.name = name;
        user.email = email;
        localStorage.setItem("user", JSON.stringify(user));
      }

      setPassword("");
    } catch (error) {
      toast.error("Unable to update profile");
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👩
        </div>

       <h1>
  Welcome 👋
  <br />
  {name || "User"}
</h1>
       <p
  style={{
    color: "#666",
    marginBottom: "30px",
  }}
>
  Manage your account information below.
</p>

        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="New Password (Optional)"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={updateProfile}>
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Profile;