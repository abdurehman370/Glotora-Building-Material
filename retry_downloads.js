import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        const file = fs.createWriteStream(filepath);
        https.get(url, options, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filepath}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
};

const missing = [
    { name: "makita", logo: "https://ombmt.com/wp-content/uploads/2022/03/Makita.jpg" },
    { name: "bosch", logo: "https://ombmt.com/wp-content/uploads/2022/03/Bosch-1.jpg" }
];

const processDownloads = async () => {
    for (const brand of missing) {
        const ext = path.extname(brand.logo).split('?')[0] || '.jpg';
        const filename = brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + ext;
        console.log(`Downloading ${brand.name} from ${brand.logo}...`);
        try {
            await downloadImage(brand.logo, path.join('public/images/brands', filename));
        } catch (e) {
            console.error(`Error downloading ${brand.name}:`, e);
        }
    }
};

processDownloads().then(() => console.log('Retry complete')).catch(console.error);
