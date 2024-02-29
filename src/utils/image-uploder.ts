// @ts-ignore
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    // @ts-ignore
    destination: (req, file, cb) => {
        console.log(__dirname)
        cb(null, path.join(__dirname, "..", "..", "uploads", "images"));
    },
    // @ts-ignore
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

export const upload = multer({ storage: storage });