import Navbar from "../components/Navbar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="main">
        <h2>Your Profile</h2>

        {!user ? (
          <p>No profile data found.</p>
        ) : (
          <div style={{ marginTop: "25px", fontSize: "18px", lineHeight: "1.8" }}>
            <p><b>First Name:</b> {user.first}</p>
            <p><b>Last Name:</b> {user.last}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>DOB:</b> {user.dob}</p>
            <p><b>Phone:</b> {user.phone}</p>
          </div>
        )}
      </div>
    </>
  );
}
