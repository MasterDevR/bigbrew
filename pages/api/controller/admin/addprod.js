import multer from "multer";
import path from "path";

export const config = {
  api: {
    bodyParse: false,
  },
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const addProd = async (req, res) => {
  upload.single("file")(req, res, (err) => {
    console.log("req " + req.file);
    console.log(req.body);

    return res.status(200).json({ message: "Files uploaded successfully." });
  });
  return res.status(200);
};

export default addProd;
