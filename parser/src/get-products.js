import { connection } from './connection.js';

/**
 * @param {string} sku
 * @return {array<object>}
 */
export const getProducts = async (sku) => {
	if (!sku) {
		return [];
	}

	const [products] = await connection.execute(
		'SELECT skus.sku as sku, skus.id as sku_id, product.id as id, product.name as name, product.price as price, product.image_id as image_id FROM shop_product_skus skus INNER JOIN shop_product product ON skus.product_id = product.id WHERE sku = ?',
		[
			`${sku}`,
		]
	);

	return products;
};
