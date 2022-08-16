module.exports = {
  uploadImage: async (req, res) => {
    console.log(req.file);
    const image = req.file.location;
    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }
    res.status(200).send(image);
  },
  uploadImages: async (req, res) => {
    const image = req.files;
    const path = image.map((img) => img.location);
    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }
    res.status(200).send(path);
  },
};
