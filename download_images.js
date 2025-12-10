import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        // Skip if file already exists
        if (fs.existsSync(filepath)) {
            console.log(`Skipping existing file: ${filepath}`);
            resolve();
            return;
        }

        if (!url || !url.startsWith('http')) {
            console.log(`Skipping invalid URL: ${url}`);
            resolve();
            return;
        }
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                console.log(`Failed to download ${url}: ${response.statusCode}`);
                fs.unlink(filepath, () => { });
                resolve(); // Resolve instead of reject to continue with other downloads
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
            console.log(`Error downloading ${url}: ${err.message}`);
            resolve(); // Resolve instead of reject to continue with other downloads
        });
    });
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const brands = [
    { name: "Aquadrain", logo: "https://ombmt.com/wp-content/uploads/2022/02/AQUADRAIN-logo.svg" },
    { name: "MPI Atlas", logo: "https://ombmt.com/wp-content/uploads/2022/02/ATLAS-logo.svg" },
    { name: "Bailey Products", logo: "https://ombmt.com/wp-content/uploads/2022/02/BAILEY.jpg" },
    { name: "Blanco Germany", logo: "https://ombmt.com/wp-content/uploads/2022/02/BLANCO-logo.svg" },
    { name: "Candan", logo: "https://ombmt.com/wp-content/uploads/2022/02/CANDAN.jpg" },
    { name: "Cepex", logo: "https://ombmt.com/wp-content/uploads/2022/02/Cepex.png" },
    { name: "Clever", logo: "https://ombmt.com/wp-content/uploads/2022/02/CLEVER-300x71.jpg" },
    { name: "Comap", logo: "https://ombmt.com/wp-content/uploads/2022/02/COMAP.png" },
    { name: "Cosmoplast", logo: "https://ombmt.com/wp-content/uploads/2022/02/cosmoplast-logo-300x119.png" },
    { name: "Espa", logo: "https://ombmt.com/wp-content/uploads/2022/03/th_espa.png" },
    { name: "Fillimori", logo: "https://ombmt.com/wp-content/uploads/2022/02/FILLIMORI.gif" },
    { name: "Filnox", logo: "https://ombmt.com/wp-content/uploads/2022/02/FILNOX-300x300.jpg" },
    { name: "Flowflex", logo: "https://ombmt.com/wp-content/uploads/2022/03/Flowflex_LOGOsmall-236x300.png" },
    { name: "Franke", logo: "https://ombmt.com/wp-content/uploads/2022/02/FRANKE-300x96.png" },
    { name: "G-Style", logo: "https://ombmt.com/wp-content/uploads/2022/02/G-STYLE.jpg" },
    { name: "Globe", logo: "https://ombmt.com/wp-content/uploads/2022/03/globe.jpg" },
    { name: "Haro", logo: "https://ombmt.com/wp-content/uploads/2022/03/HARO-TOILET-SEAT-300x150.gif" },
    { name: "Hepworth", logo: "https://ombmt.com/wp-content/uploads/2022/02/Hepworth.png" },
    { name: "McAlpine", logo: "https://ombmt.com/wp-content/uploads/2022/02/McAlpine-300x244.png" },
    { name: "Multikwik", logo: "https://ombmt.com/wp-content/uploads/2022/02/Multikwik-logo.svg" },
    { name: "Nirali", logo: "https://ombmt.com/wp-content/uploads/2022/03/1599828070-300x274.jpg" },
    { name: "Parabond", logo: "https://ombmt.com/wp-content/uploads/2022/02/PARABOND-logo.svg" },
    { name: "Pegler Yorkshire", logo: "https://ombmt.com/wp-content/uploads/2022/02/Pegler-Yorkshire-logo.svg" },
    { name: "PEX", logo: "https://ombmt.com/wp-content/uploads/2022/02/pex-logo-300x162.png" },
    { name: "Plumber", logo: "https://ombmt.com/wp-content/uploads/2022/02/PLUMBER.png" },
    { name: "PPP", logo: "https://ombmt.com/wp-content/uploads/2022/02/PPP.png" },
    { name: "Strong Fix", logo: "https://ombmt.com/wp-content/uploads/1_page-0001.jpg" },
    { name: "Strong Seal", logo: "https://ombmt.com/wp-content/uploads/2_page-0001.jpg" },
    { name: "Strong Weld", logo: "https://ombmt.com/wp-content/uploads/3_page-0001.jpg" },
    { name: "Strongweld", logo: "https://ombmt.com/wp-content/uploads/WhatsApp-Image-2024-03-19-at-4.png" },
    { name: "Tangit", logo: "https://ombmt.com/wp-content/uploads/2022/02/TANGIT-300x300.png" },
    { name: "Tembo Seven Star", logo: "https://ombmt.com/wp-content/uploads/2022/02/TEMBO.png" },
    { name: "Terrain", logo: "https://ombmt.com/wp-content/uploads/2022/02/TERRAIN-logo.svg" },
    { name: "Vado", logo: "https://ombmt.com/wp-content/uploads/2022/02/VADO.png" },
    { name: "Wednesbury", logo: "https://ombmt.com/wp-content/uploads/2022/02/Wednesbury.png" },
    { name: "Makita", logo: "https://ombmt.com/wp-content/uploads/2022/03/Makita.jpg" },
    { name: "Bosch", logo: "https://ombmt.com/wp-content/uploads/2022/03/Bosch-1.jpg" }
];

const products = [
    // Valves - from ombmt.com
    { name: "Angle Valve 76", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Valves" },
    { name: "Angle Valve 77", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Valves" },
    { name: "Angle Valve 78", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Valves" },
    { name: "Angle Valve 79", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Valves" },
    { name: "Angle Valve PEX-225A-C/P", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Valves" },
    { name: "Angle Valve PEX-226A-C/P", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Valves" },
    { name: "Angle Valve PEX-228A-C/P", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Valves" },
    { name: "Angle Valve PEX-229FA-C/P", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Valves" },
    { name: "Angle Valve PEX-230-C/P", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Valves" },
    { name: "Automatic Air Vent P775", image: "https://ombmt.com/wp-content/uploads/2022/04/P775.jpg", category: "Valves" },
    { name: "Ball Float Valves", image: "https://ombmt.com/wp-content/uploads/2022/02/OIiyDlmUiVQHY0oSA8Cm-300x300.jpg", category: "Valves" },
    
    // Plumbing Products
    { name: "Gate Valve", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Plumbing" },
    { name: "Ball Valve", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Plumbing" },
    { name: "Pipe Fitting", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Plumbing" },
    { name: "Check Valve", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Plumbing" },
    { name: "Pressure Reducing Valve", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Plumbing" },
    { name: "Stop Valve", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Plumbing" },
    
    // Compression Fittings - using actual product images
    { name: "Pegler Yorkshire Compression Fitting", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Compression Fittings" },
    { name: "PEX Compression Fitting", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Compression Fittings" },
    { name: "Compression Coupling", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Compression Fittings" },
    { name: "Compression Elbow", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Compression Fittings" },
    { name: "Compression Tee", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Compression Fittings" },
    
    // Pipes And Fittings - using actual product images
    { name: "Cosmoplast Pipe", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Pipes And Fittings" },
    { name: "Wednesbury Pipe", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Pipes And Fittings" },
    { name: "Terrain Pipe", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Pipes And Fittings" },
    { name: "Hepworth Pipe", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Pipes And Fittings" },
    { name: "ATLAS Pipe", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Pipes And Fittings" },
    { name: "Pipe Elbow Fitting", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Pipes And Fittings" },
    { name: "Pipe Reducer", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Pipes And Fittings" },
    
    // Plumbing And Drainage Solutions - using actual product images
    { name: "McAlpine Waste Fitting", image: "https://ombmt.com/wp-content/uploads/2022/02/OIiyDlmUiVQHY0oSA8Cm-300x300.jpg", category: "Plumbing And Drainage Solutions" },
    { name: "Multikwik Drainage", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Plumbing And Drainage Solutions" },
    { name: "Floor Drain", image: "https://ombmt.com/wp-content/uploads/2022/02/OIiyDlmUiVQHY0oSA8Cm-300x300.jpg", category: "Plumbing And Drainage Solutions" },
    { name: "Trap Fitting", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Plumbing And Drainage Solutions" },
    { name: "Drainage Pipe", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Plumbing And Drainage Solutions" },
    
    // CP Sanitary Mixers - using actual product images
    { name: "VADO Mixer Tap", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "CP Sanitary Mixers" },
    { name: "CLEVER Mixer", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "CP Sanitary Mixers" },
    { name: "PLUMBER Mixer", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "CP Sanitary Mixers" },
    { name: "Bathroom Mixer Tap", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "CP Sanitary Mixers" },
    { name: "Kitchen Mixer Tap", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "CP Sanitary Mixers" },
    
    // SS Bathroom Accessories - using actual product images
    { name: "G-STYLE Accessory", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "SS Bathroom Accessories" },
    { name: "FRANKE Accessory", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "SS Bathroom Accessories" },
    { name: "GLOBE Accessory", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "SS Bathroom Accessories" },
    { name: "AQUADRAIN Accessory", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "SS Bathroom Accessories" },
    { name: "Towel Rail", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "SS Bathroom Accessories" },
    { name: "Soap Dispenser", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "SS Bathroom Accessories" },
    
    // Kitchen Sinks
    { name: "BLANCO Kitchen Sink", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Kitchen Sinks" },
    { name: "NIRALI Kitchen Sink", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Kitchen Sinks" },
    { name: "Stainless Steel Sink", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Kitchen Sinks" },
    { name: "Double Bowl Sink", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Kitchen Sinks" },
    { name: "Single Bowl Sink", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Kitchen Sinks" },
    
    // Pipe Support Systems
    { name: "GLOBE Pipe Support", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Pipe Support Systems" },
    { name: "TEMBO Seven Star Support", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Pipe Support Systems" },
    { name: "Pipe Clamp Support", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Pipe Support Systems" },
    { name: "Pipe Bracket", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Pipe Support Systems" },
    { name: "Pipe Hanger", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Pipe Support Systems" },
    
    // Ancillary Products
    { name: "BAILEY Product", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Ancillary Products" },
    { name: "ESPA Product", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Ancillary Products" },
    { name: "HARO Product", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Ancillary Products" },
    { name: "FILNOX Product", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Ancillary Products" },
    { name: "FILLIMORI Product", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Ancillary Products" },
    { name: "CANDAN Product", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Ancillary Products" },
    
    // Adhesives
    { name: "STRONGWELD Adhesive", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Adhesives" },
    { name: "TANGIT Adhesive", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Adhesives" },
    { name: "PARABOND Adhesive", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Adhesives" },
    { name: "Strong Fix Adhesive", image: "https://ombmt.com/wp-content/uploads/2022/03/77.jpg", category: "Adhesives" },
    { name: "Strong Weld Adhesive", image: "https://ombmt.com/wp-content/uploads/2022/03/PEX-225-1-300x300.jpg", category: "Adhesives" },
    { name: "Strong Seal Adhesive", image: "https://ombmt.com/wp-content/uploads/2022/03/76-300x300.jpg", category: "Adhesives" },
];

const processDownloads = async () => {
    // Brands
    if (!fs.existsSync('public/images/brands')) {
        fs.mkdirSync('public/images/brands', { recursive: true });
    }
    console.log('Downloading brand logos...');
    for (const brand of brands) {
        const ext = path.extname(brand.logo).split('?')[0] || '.jpg';
        const filename = brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + ext;
        await downloadImage(brand.logo, path.join('public/images/brands', filename));
        await delay(200); // Small delay to avoid overwhelming the server
    }

    // Products
    if (!fs.existsSync('public/images/products')) {
        fs.mkdirSync('public/images/products', { recursive: true });
    }
    console.log('Downloading product images...');
    for (const prod of products) {
        const ext = path.extname(prod.image).split('?')[0] || '.jpg';
        const filename = prod.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + ext;
        await downloadImage(prod.image, path.join('public/images/products', filename));
        await delay(200); // Small delay to avoid overwhelming the server
    }
};

processDownloads().then(() => console.log('All downloads complete')).catch(console.error);
