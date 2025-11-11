const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

exports.predict = async (req, res) => {
  const file = req.file;

  const formData = new FormData();
  formData.append("file", fs.createReadStream(file.path));

  const response = await axios.post("http://localhost:5001/predict", formData, {
    headers: formData.getHeaders(),
  });

  res.send({
    result: response.data.result,
    image: response.data.image
  });
};
