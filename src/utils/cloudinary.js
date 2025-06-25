import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//console.log('Cloudinary config:', cloudinary.config());

const uploadOnCloudinary = async (uploadFilePath) => {
    try {
        if(!uploadFilePath) return null
        const response = await cloudinary.uploader.upload(uploadFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(uploadFilePath)
        //console.log("File is uploaded on cloudinary", response.url)
        return response;

    } catch (error) {
        console.log("File is not uploaded on cloudinary", error)
        fs.unlinkSync(uploadFilePath)
        return null
    }
}

export {uploadOnCloudinary}