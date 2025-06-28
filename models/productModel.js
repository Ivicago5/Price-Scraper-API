import db from '../db/index.js';

const insertProduct = async ({ productId, url, source, title, price}) => {
    const result = await db.query(`
        INSERT INTO products (product_id, url, source, title, price, last_checked)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *;
        `, [productId, url, source, title, price]);

    return result.rows[0];
}

const getAllProducts = async () => {
    const result = await db.query('SELECT * FROM products;');
    return result.rows; 
}

const updateProductPrice = async (productId, price) => {
    const result = await db.query(`
        UPDATE products SET price $1, last_checked = NOW()
        WHERE product_id = $2 RETURNING *;
        `, [price, productId]);
    return result.rows[0];
}

const getAllTrackedProducts = async () => {
    const result = await db.query(`
        SELECT DISTINCT url, source FROM products`
    );
    return result.rows
}

export default {
    insertProduct,
    getAllProducts,
    updateProductPrice,
    getAllTrackedProducts
};