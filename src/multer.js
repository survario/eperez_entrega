import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import logger from "./logger.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* Multer config  */
function configStorage(folderName, imageOf) {
    return multer.diskStorage({
        destination:function(_req,_file,cb){
            logger.info(`path`, path.join(__dirname,"..","public","uploads",folderName));
            cb(null,path.join(__dirname,"..","public","uploads",folderName));
        }, 
        filename: function(_req,file,cb){
            logger.info(`file`, `${imageOf}_${Date.now()}${path.extname(file.originalname)}`);
            cb(null,`${imageOf}_${Date.now()}${path.extname(file.originalname)}`);
        }
    });
}

const uploadUsers = new multer({storage: configStorage("users","user")});
const uploadProducts = new multer({storage: configStorage("products","product")});

export {uploadUsers, uploadProducts};
