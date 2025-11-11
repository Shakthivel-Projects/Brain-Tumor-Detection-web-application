import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [outputImg, setOutputImg] = useState(null);

  const mlUrl = process.env.REACT_APP_ML_URL;

  // ✅ SAFE FILE UPLOAD HANDLER (prevents createObjectURL error)
  const handleUpload = (e) => {
    const f = e.target.files[0];

    if (!f) {
      console.log("No file selected.");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));

    // Reset previous results
    setOutputImg(null);
    setResult("");
  };

  // ✅ DETECT TUMOR FUNCTION
  const detectTumor = async () => {
    if (!file) return alert("Upload a file first");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${mlUrl}/predict`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.result);
    setOutputImg(`data:image/jpeg;base64,${data.image}`);
  };

  return (
    <>
      <Navbar />

      <div className="main">
        <h1>Brain Tumor Detection</h1>
        <p>Upload MRI brain scans and detect tumors using AI.</p>

        {/* ✅ CHOOSE FILE BUTTON */}
        <label className="file-label" htmlFor="fileUpload">
          Choose File
        </label>

        <input
          id="fileUpload"
          type="file"
          className="file-input"
          onChange={handleUpload}
        />

       
        {preview && (
          <>
            <div className="image-section">

              {/* LEFT: PREVIEW IMAGE */}
              <div className="preview-box">
                <h3>Uploaded Image:</h3>
                <img src={preview} alt="uploaded" className="preview-img" />
              </div>

              {/* RIGHT: DETECTED IMAGE */}
              {outputImg && (
                <div className="detected-box">
                  <h3>Detected Tumor:</h3>
                  <img src={outputImg} alt="detected" className="result-img" />
                </div>
              )}
            </div>

            
            <button className="detect-btn" onClick={detectTumor}>
              Detect
            </button>
          </>
        )}

       
        {result && (
          <h2 style={{ marginTop: "20px" }}>Result: {result}</h2>
        )}

        
        <div className="info-box">
          <h2>About Brain Tumors</h2>
          <p>
            Brain tumors occur when abnormal cells grow inside the brain.
            MRI scans help doctors identify tumor regions accurately.
          </p>

          <h2>About MRI</h2>
          <p>
            MRI (Magnetic Resonance Imaging) uses strong magnetic fields
            to create detailed brain images.
          </p>
        </div>
      </div>
    </>
  );
}
