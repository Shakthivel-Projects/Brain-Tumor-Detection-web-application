# 🧠 Brain Tumor Detection using YOLOv8

A full-stack web application that detects brain tumors from MRI scans using a custom-trained **YOLOv8 deep learning model**, with a modern **React**, **Node.js**, **Express**, and **MongoDB** architecture.

---

## 📌 Overview

This project aims to automate brain tumor detection using MRI scans.
We trained a **YOLOv8** model using a dataset sourced from **Kaggle**, and deployed the model as an API.
The web application allows users to upload an MRI image and view:

✅ The original MRI scan
✅ The detected tumor output (bounding box or mask)
✅ Side-by-side comparison

---

## ✅ Features

### 🎯 **AI & Detection**

* Custom-trained **YOLOv8** model
* Detects presence of tumor
* Draws bounding box around tumor region
* High-speed inference with optimized model

### 🌐 **Frontend**

* Built using **React, HTML, CSS**
* Clean UI for uploading MRI scans
* Real-time preview before detection
* Side-by-side result display

### 🖥️ **Backend**

* **Node.js + Express** API
* Integrates with YOLOv8 Python model
* Uses **Multer** for image uploads
* Predicts tumor and returns annotated image

### 🗄️ **Database**

* **MongoDB** to store:

  * User info
  * Upload history
  * Prediction logs

---

## 📂 Folder Structure

```
brain-tumor-detection/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── uploads/
│   └── ml-model/
│       └── best.pt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 📊 Dataset

We used the **Brain Tumor MRI Dataset from Kaggle**, which contains MRI images categorized into:

* Glioma
* Meningioma
* Pituitary
* No Tumor

The images were annotated and converted into YOLO format before training.

---

## 🧠 Model Training

The YOLOv8 model was trained using the following command:

```bash
yolo detect train model=yolov8s.pt data=brain_tumor.yaml epochs=120 imgsz=640
```

The final trained model file is:

✅ `best.pt`

---

## 🌐 API Details

### **POST /predict**

Uploads an MRI image and returns detection results.

#### ✅ Request:

```
form-data:
  file: <MRI image>
```

#### ✅ Response Example:

```json
{
  "status": "success",
  "prediction": "Tumor Detected",
  "confidence": 0.92,
  "image": "<base64 encoded detected image>"
}
```

---

## 🖥️ How It Works

```
User Uploads MRI →
React Preview →
Node.js Backend →
YOLOv8 Model →
Tumor Detection →
Result Returned →
Side-by-Side Display
```

## 🛠 Installation & Setup
## 🔧 Backend Setup

```bash
cd backend
npm install
node server.js
```

Make sure you have Python + YOLOv8 installed.
Place your trained model inside:

```
backend/ml-model/best.pt
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will run at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🏁 Usage

1. Open the web application
2. Upload an MRI scan
3. View the **original** and **detected** images side-by-side
4. Check prediction (Tumor / No Tumor) and confidence score

---

## 🤝 Contribution

Contributions are welcome!
Feel free to open issues or submit pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

* Kaggle Dataset Providers
* Ultralytics YOLO Team
* Contributors & Developers

---

