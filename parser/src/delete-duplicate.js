import { connection } from './connection.js';

/**
 * @param {{
 *  sku: string
 *  sku_id: number
 *  id: number
 *  name: string
 *  price: string
 *  image_id: number
 * }} product
 */
export function deleteDuplicate ({ sku, sku_id, id }) {
	let label = `Deleted sku: "${sku}", product_id: "${id}", sku_id: "${sku_id}"`;
	console.time(label);

	/** Удаляем товар по его id */
	connection.execute('DELETE from shop_product WHERE id = ?', [id]);
	
	/** Удаляем артикул по его sku */
	connection.execute('DELETE from shop_product_skus WHERE id = ?', [sku_id]);

	console.timeEnd(label);
};
