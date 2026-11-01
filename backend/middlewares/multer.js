import multer from "multer"
// ⚠️ public folder must exist
import fs from "fs"
const uploadDir = "./public"
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }) // ← auto creates folder
}
/* Multer storage configuration
 * Saves files to /public folder*/
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
     filename: (req, file, cb) => {
        // ← avoid spaces in filename, causes path issues
        const sanitized = file.originalname.replace(/\s+/g, "_")
        cb(null, sanitized)
    }
})

export const upload=multer({storage})