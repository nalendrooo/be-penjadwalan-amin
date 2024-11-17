import multer from 'multer';
import path from 'path';

// Define the storage configuration
const fileFilter = (req, file, cb) => {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|image/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Jika tipe file sesuai, lanjutkan proses upload
    } else {
        cb(new Error('Only .png, .jpg, .jpeg, and .image formats are allowed!')); // Jika tidak sesuai, beri error
    }
};

// Set storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/image'); // Folder tempat penyimpanan
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const sanitizedFileName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '');
        const namaFile = `${timestamp}-${sanitizedFileName}`;

        req.body = { ...req.body, namaFile }; // Tambahkan nama file ke req.body
        cb(null, namaFile); // Set nama file
    }
});

// Middleware konfigurasi upload dengan file filter dan batas ukuran file
export const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // Batas ukuran file maksimal 3MB
    fileFilter, // Validasi tipe file
});