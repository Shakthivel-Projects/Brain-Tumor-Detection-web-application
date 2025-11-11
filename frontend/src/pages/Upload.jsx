import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileMenu from "../components/ProfileMenu";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [image, setImage] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const mlUrl = process.env.REACT_APP_ML_URL;

  const uploadImage = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${mlUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Prediction request failed");

      const data = await res.json();

      console.log("Base64 length:", data.image?.length);

      setImage(`data:image/jpeg;base64,${data.image}`);
      setResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Error uploading or predicting image.");
    }
  };

  return (
    <>
      <Navbar />
      <ProfileMenu />

      <div className="main">
        <h2>Upload MRI Image</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadImage}>Detect</button>

        {result && <h3>Result: {result}</h3>}

        {image && (
          <div style={{ marginTop: "20px" }}>
            <h3>Detected Tumor Visualization:</h3>
            <img
              src={image}
              alt="annotated"
              style={{ width: "450px", borderRadius: "10px" }}
            />
          </div>
        )}
      </div>
    </>
  );
}
