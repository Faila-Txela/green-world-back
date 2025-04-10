import fs from 'fs'
import path from 'path';

// Função para garantir que o diretório uploads existe
export const ensureUploadDirectoryExists = () => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Cria o diretório se ele não existir
        console.log("Diretorio criado")
    }
};