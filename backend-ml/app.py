
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app)

# Load YOLO model
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, "best.pt")
model = YOLO(model_path)


@app.post("/predict")
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

    results = model(img)[0]

    annotated_img = img.copy()
    boxes = results.boxes
    masks = results.masks

    # ✅ SEGMENTATION MASKS + POLYGONS + BOXES
    if masks is not None:
        polygons = masks.xy  # List of polygons

        for idx, poly in enumerate(polygons):
            pts = np.array(poly, dtype=np.int32).reshape((-1, 1, 2))

            # Shaded polygon mask
            overlay = annotated_img.copy()
            cv2.fillPoly(overlay, [pts], color=(0, 0, 255))
            annotated_img = cv2.addWeighted(overlay, 0.4, annotated_img, 0.6, 0)

            # Polygon border
            cv2.polylines(annotated_img, [pts], True, (0, 255, 0), 2)

            # Bounding box
            if idx < len(boxes):
                x1, y1, x2, y2 = map(int, boxes[idx].xyxy[0])
                cv2.rectangle(annotated_img, (x1, y1), (x2, y2), (0, 255, 0), 2)

                # Label
                cv2.putText(
                    annotated_img,
                    "Tumor",
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (0, 255, 0),
                    2
                )

    # ✅ Convert to Base64
    _, buffer = cv2.imencode(".jpg", annotated_img)
    encoded_image = base64.b64encode(buffer).decode("utf-8")

    tumor_detected = masks is not None and len(masks) > 0

    return jsonify({
        "result": "Tumor" if tumor_detected else "No Tumor",
        "image": encoded_image
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5001)))
