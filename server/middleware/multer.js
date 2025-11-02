import multer from "multer";
const storage = multer.diskStorage({
    // How the uploaded file should be named
    filename:function(req, file, callback){
        callback(null, file.originalname);
    }
})
// Upload middleware
const upload = multer({
    storage
})

export default upload;