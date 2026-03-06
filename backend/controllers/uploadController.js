const cloudinary = require("../config/cloudinary");


exports.uploadFile = async (req, res) => {

  try {

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {

        if (error) {
          return res.status(500).json(error);
        }

        res.json({
          url: result.secure_url
        });

      }
    );

    result.end(req.file.buffer);

  } catch (error) {

    res.status(500).json(error);

  }

};