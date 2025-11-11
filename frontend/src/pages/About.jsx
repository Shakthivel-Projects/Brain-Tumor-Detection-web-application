import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="main">
        <h2>About Project</h2>
        <p>
          This project uses MRI scans and a deep learning model to detect brain tumors automatically.
        </p>
      </div>
    </>
  );
}
