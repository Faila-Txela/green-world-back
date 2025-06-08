import fs from 'fs';
import util from 'util';
import path from 'path';
import { pipeline } from 'stream';
import { MultipartFile } from '@fastify/multipart';
import { FastifyRequest } from 'fastify';
import { UploadedFile } from '../@types/upload';

class UploadService {
    private uploadDir: string = path.join(__dirname, '../../uploads');
    private imageDir: string = path.join(this.uploadDir, 'images');
    private videoDir: string = path.join(this.uploadDir, 'videos');
    private documentDir: string = path.join(this.uploadDir, 'documents');
    private pump = util.promisify(pipeline);
    private allowedFormats = {
        image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        video: ['video/mp4', 'video/webm'],
        //document: ['application/pdf']
    };

    constructor() {
        this.ensureUploadDirExists();
    }

    private ensureUploadDirExists() {
        [this.uploadDir, this.imageDir, this.videoDir, this.documentDir].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    private getUploadPathAndType(mimeType: string): { path: string, type: string } | null {
        if (this.allowedFormats.image.includes(mimeType)) return { path: this.imageDir, type: 'image' };
        if (this.allowedFormats.video.includes(mimeType)) return { path: this.videoDir, type: 'video' };
       // if (this.allowedFormats.document.includes(mimeType)) return { path: this.documentDir, type: 'document' };
        return null;
    }

    async saveOneFile(file: MultipartFile): Promise<UploadedFile> {
        const uploadData = this.getUploadPathAndType(file.mimetype);

        if (!uploadData) {
            throw new Error('Tipo de arquivo não permitido. Apenas imagens, vídeos, PDFs, Word, Excel e PowerPoint são aceitos.');
        }

        const filename = `${Date.now()}_${file.filename}`;
        const filePath = path.join(uploadData.path, filename);

        await this.pump(file.file, fs.createWriteStream(filePath));

        return { nome: `/static/${filename}`, type: uploadData.type };
    }

    async saveSeveralFiles(req: FastifyRequest): Promise<UploadedFile[]> {
        const uploadedFiles: UploadedFile[] = [];
        const files = await req.files();

        for await (const file of files) {
            if (file.file) {
                const uploadedFile = await this.saveOneFile(file);
                uploadedFiles.push(uploadedFile);
            }
        }
        return uploadedFiles;
    }

    async deleteFile(fileUrl: string): Promise<string> {
        const filePath = path.join(this.uploadDir, fileUrl.replace('/static/', ''));

        return await new Promise((resolve, reject) => {
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (error) => {
                    if (error) reject(error.message);
                    else resolve('Ficheiro eliminado com sucesso');
                });
            } else {
                resolve('Ficheiro não encontrado');
            }
        });
    }

    async deleteSeveralFiles(fileUrls: string[]): Promise<string[]> {
        return await Promise.all(fileUrls.map(fileUrl => this.deleteFile(fileUrl)));
    }
}

export const uploadService = new UploadService();
