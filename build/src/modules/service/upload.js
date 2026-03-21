"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
class UploadService {
    uploadDir = path_1.default.join(__dirname, '../../uploads');
    imageDir = path_1.default.join(this.uploadDir, 'images');
    videoDir = path_1.default.join(this.uploadDir, 'videos');
    documentDir = path_1.default.join(this.uploadDir, 'documents');
    pump = util_1.default.promisify(stream_1.pipeline);
    allowedFormats = {
        image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        video: ['video/mp4', 'video/webm'],
        //document: ['application/pdf']
    };
    constructor() {
        this.ensureUploadDirExists();
    }
    ensureUploadDirExists() {
        [this.uploadDir, this.imageDir, this.videoDir, this.documentDir].forEach(dir => {
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
        });
    }
    getUploadPathAndType(mimeType) {
        if (this.allowedFormats.image.includes(mimeType))
            return { path: this.imageDir, type: 'image' };
        if (this.allowedFormats.video.includes(mimeType))
            return { path: this.videoDir, type: 'video' };
        // if (this.allowedFormats.document.includes(mimeType)) return { path: this.documentDir, type: 'document' };
        return null;
    }
    async saveOneFile(file) {
        const uploadData = this.getUploadPathAndType(file.mimetype);
        if (!uploadData) {
            throw new Error('Tipo de arquivo não permitido. Apenas imagens, vídeos, PDFs, Word, Excel e PowerPoint são aceitos.');
        }
        const filename = `${Date.now()}_${file.filename}`;
        const filePath = path_1.default.join(uploadData.path, filename);
        await this.pump(file.file, fs_1.default.createWriteStream(filePath));
        return { nome: `/static/${filename}`, type: uploadData.type };
    }
    async saveSeveralFiles(req) {
        const uploadedFiles = [];
        const files = await req.files();
        for await (const file of files) {
            if (file.file) {
                const uploadedFile = await this.saveOneFile(file);
                uploadedFiles.push(uploadedFile);
            }
        }
        return uploadedFiles;
    }
    async deleteFile(fileUrl) {
        const filePath = path_1.default.join(this.uploadDir, fileUrl.replace('/static/', ''));
        return await new Promise((resolve, reject) => {
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlink(filePath, (error) => {
                    if (error)
                        reject(error.message);
                    else
                        resolve('Ficheiro eliminado com sucesso');
                });
            }
            else {
                resolve('Ficheiro não encontrado');
            }
        });
    }
    async deleteSeveralFiles(fileUrls) {
        return await Promise.all(fileUrls.map(fileUrl => this.deleteFile(fileUrl)));
    }
}
exports.uploadService = new UploadService();
