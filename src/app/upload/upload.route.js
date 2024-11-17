import { Router } from "express"
import * as usersSchema from "../users/users.request.js"
import * as usersService from "../users/users.service.js"
import { validateRequest } from "../../middleware/validate-request.js";
import { upload } from "../../middleware/multer.js";
import multer from "multer";

const route = Router()

route.post('/single', (req, res, next) => {
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
            fileName: req.file.filename,
            // url: `http://localhost:8000/assets/image-products/${req.file.filename}`
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
            fileNames,
        });
    });
});

export default route    
