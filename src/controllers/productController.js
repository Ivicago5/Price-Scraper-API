import { trackProduct } from "../services/productService.js";

export async function addProduct(req, res) {
    
    try {
        const { url } = req.body;
        const product = await trackProduct(url);
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message});
    }
}