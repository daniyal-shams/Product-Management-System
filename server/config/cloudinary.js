import {v2 as cloudinary } from 'cloudinary' ;
import multer from 'multer' ;
// CLOUDINARY_NAME = 'dr66vko2r'
// CLOUDINARY_API_KEY = '665999979765485'
// CLOUDINARY_SECRET_KEY = 'PnB1HLP2BRInLppUjJOilzFtbFM'

cloudinary.config({
    cloud_name:'dr66vko2r',
    api_key: '849157759972982',
    api_secret: 'WpcDA8-5482-vRORTiPWqaiGpuU'
});

const storage = new multer.memoryStorage();

async function imgUploadUtil(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    })

    return res ;
}

const upload = multer({storage});

export {upload, imgUploadUtil} ;