import { trackNewProduct, fetchAllProducts } from "../services/productService.js";

export async function handleTrackProduct(req, res) {
    
    try {
        const {url, source} = req.body;
        const product = await trackNewProduct(url, source);
        res.status(201).json(product);
    } catch (err) {
        console.error('Error tracking product:', err.message);
        res.status(500).json({message: 'Failed to track product'});
    }
}


export async function handleGetProducts(req, res) {
    
    try{
        const product = await fetchAllProducts();
        res.json(product);
    } catch (err) {
        res.status(500).json({message: 'Error fetching all products'});
    }
}







// export async function addProduct(req, res) {
    
//     try {
//         const { url } = req.body;
//         const product = await trackProduct(url);
//         res.status(201).json(product);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: err.message});
//     }
// }