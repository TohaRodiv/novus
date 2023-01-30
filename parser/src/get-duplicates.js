import { sortDuplicates } from './sort-duplicates.js';

/**
 * 
 * @param {Array<{
 *  sku: string
 *  sku_id: number
 *  id: number
 *  name: string
 *  price: string
 *  image_id: number
 * }>} products
 * @param {string} sku
 * @return {Array<object>}
 */
export function* getDuplicates(products, sku) {
	const duplicates = [];
	const duplicatesPotential = [];
	let duplicatesPriority = [];

	for (const product of products) {
		product.price = +product.price;

		if (+product.price && product.image_id) {
			duplicatesPriority.push(product);
		} else {
			duplicatesPotential.push(product);
		}
	}

	if (duplicatesPriority.length > 1) {
		duplicatesPriority.sort((a, b) => a.name.length - b.name.length);
		sortDuplicates(duplicatesPriority);
		duplicatesPriority.pop();
		duplicatesPriority.forEach(duplicate => {
			duplicates.push(duplicate);
		});
		duplicatesPotential.forEach(duplicate => {
			duplicates.push(duplicate);
		});
	} else {
		if (duplicatesPriority.length === 1) {
			duplicatesPotential.forEach(duplicate => {
				duplicates.push(duplicate);
			});
		} else {
			duplicatesPotential.sort((a, b) => a.name.length - b.name.length);
			sortDuplicates(duplicatesPotential);
			duplicatesPotential.pop();
			duplicatesPotential.forEach(duplicate => {
				duplicates.push(duplicate);
			});
		}
	}

	if (!duplicates.length) {
		console.log(`Empty duplicates for sku ${sku}`);
	}

	for (const duplicate of duplicates) {
		yield duplicate;
	}

};