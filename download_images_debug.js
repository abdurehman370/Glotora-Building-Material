import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        if (!url.startsWith('http')) {
            console.log(`Skipping invalid URL: ${url}`);
            resolve();
            return;
        }
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
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
            fs.unlink(filepath, () => { }); // Delete the file async. (But we don't check the result)
            reject(err.message);
        });
    });
};

const brands = [
    { name: "Automatic Air Vent", image: "https://ombmt.com/wp-content/uploads/2022/04/P775.jpg" },
    { name: "Ball Float Valve", image: "https://ombmt.com/wp-content/uploads/2022/02/OIiyDlmUiVQHY0oSA8Cm-300x300.jpg" },
    { name: "Safety Helmet", image: "https://ombmt.com/wp-content/uploads/2022/03/Safety-Helmet.jpg" },
];

const categories = [
    { title: "Power Tools", image: "https://ombmt.com/wp-content/uploads/2022/03/Makita.jpg" },
    { title: "Hand Tools", image: "https://ombmt.com/wp-content/uploads/2022/03/Pegler.jpg" },
    { title: "Safety Gear", image: "https://ombmt.com/wp-content/uploads/2022/03/Safety-Helmet.jpg" },
    { title: "Electricals", image: "https://ombmt.com/wp-content/uploads/2022/04/P775.jpg" },
    { title: "Plumbing", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg" },
    { title: "Hardware", image: "https://ombmt.com/wp-content/uploads/2022/03/Cosmoplast.jpg" }
];

const processDownloads = async () => {
    // Brands
    for (const brand of brands) {
        const ext = path.extname(brand.logo).split('?')[0] || '.jpg';
        const filename = brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + ext;
        await downloadImage(brand.logo, path.join('public/images/brands', filename));
    }

    // Products
    for (const prod of products) {
        const ext = path.extname(prod.image).split('?')[0] || '.jpg';
        const filename = prod.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + ext;
        await downloadImage(prod.image, path.join('public/images/products', filename));
    }
};

processDownloads().then(() => console.log('All downloads complete')).catch(console.error);
