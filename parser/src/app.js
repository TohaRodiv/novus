import { getDuplicates } from './get-duplicates.js';
import { getProducts } from './get-products.js';
import { getSkus } from './get-skus.js';
import { connection } from './connection.js';
import { deleteDuplicate } from './delete-duplicate.js';

export const App = async () => {
	try {

		console.log('Работа начата!');
		console.time('app');

		for await (const sku of getSkus()) {
			const label = `${sku}`;
			console.time(label);

			const products = await getProducts(sku);

			if (products.length < 2) {
				console.log('Skip sku:');
				console.timeEnd(`${label}`);
				continue;
			}
			
			for (const duplicate of getDuplicates(products, sku)) {
				deleteDuplicate(duplicate);
			}

			console.timeEnd(label);
		}

	} catch (error) {
		console.error(error);
	} finally {
		console.timeEnd('app');
		connection.end();

		console.log('Работа закончена!');
	}
};
