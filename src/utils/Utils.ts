import {promisify} from 'util'
import {diskStorage} from 'multer'
import {Logger} from '@nestjs/common'

const fs = require('fs')
const path = require('path')

const randomBytesAsync = promisify(require('crypto').randomBytes)
const uploadDirectory = path.resolve(__dirname, '..', 'tmp', 'uploads')

export async function generateRandomKey() {
    const hash = await randomBytesAsync(16)
    const fileName = `${hash.toString("hex")}`
    return fileName
}

export const locationToSaveFilesTemporarily = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(uploadDirectory)) {
                fs.mkdirSync(uploadDirectory)
            }
            cb(null, uploadDirectory
            )
        }
    })
}

export const verifyUploadDirectory = () => {
    if (!fs.existsSync(uploadDirectory)) {
        const _uploadDirectory = path.join(__dirname, '..', 'tmp', 'uploads')

        fs.mkdir(_uploadDirectory, { recursive: true }, (err) => { new Logger('create storage path').error(err) })
    }
}
