import { Router } from "express"
import { upload } from "../../middleware/multer.js";
import multer from "multer";

const route = Router()

route.post('/single/:disk', (req, res, next) => {
    upload.single('image')(req, res, function (err) {

        // Error handling untuk ukuran file atau jenis file yang tidak valid
        if (err instanceof multer.MulterError) {
            // Jika error dari Multer (misal: ukuran file terlalu besar)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: 'File is too large. Maximum size allowed is 3MB.',
                });
            }
            return res.status(400).json({
                message: err.message,
            });
        } else if (err) {
            // Jika error berasal dari fileFilter (jenis file tidak valid)
            return res.status(400).json({
                message: err.message,
            });
        }

        // Periksa apakah file ada
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded or invalid file type',
            });
        }

        // Berikan respons dengan nama file

        res.json({
            filename: req.file.filename,
            original_filename: req.file.originalname,
            size_file: req.file.size,
            type_file: req.file.mimetype
        });
    });
});

route.post('/multiple', (req, res, next) => {
    upload.array('image')(req, res, function (err) {
        // Error handling untuk ukuran file atau jenis file yang tidak valid
        if (err instanceof multer.MulterError) {
            // Jika error dari Multer (misal: ukuran file terlalu besar)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: 'File is too large. Maximum size allowed is 3MB.',
                });
            }
            return res.status(400).json({
                message: err.message,
            });
        } else if (err) {
            // Jika error berasal dari fileFilter (jenis file tidak valid)
            return res.status(400).json({
                message: err.message,
            });
        }

        // Periksa apakah file ada
        const files = req.files
        if (!files || files.length === 0) {
            return res.status(400).json({
                message: 'No valid files uploaded. Files must be images with maximum size of 3MB.',
            });
        }

        // Ambil nama file dan kembalikan ke client
        const fileNames = files.map(file => file.filename);
        res.json({
            filename: fileNames,
            original_filename: files[0].originalname,
            size_file: files[0].size,
            type_file: files[0].mimetype
        });
    });
});

export default route    
