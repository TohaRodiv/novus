import { connection } from './connection.js';

let count = 1534789;
let limit = 500;
let initialOffset = 623000; // last offset 158000
const offsets = [];

for (let offset = initialOffset; offset <= count; offset += limit) {
	offsets.push(offset);
}

/**
 * @param {string} sku
 * @return {array<object>}
 */
export async function* getSkus() {

	for await (const offset of offsets) {
		console.log(`Offset: ${offset}`);
		let [_skus] = await connection.execute(
			`SELECT sku FROM shop_product_skus WHERE sku != '' LIMIT ${offset}, ${limit}`
		);

		for (let i = 0; i < _skus.length; i++) {
			yield _skus[i].sku;
		}
	}
};
