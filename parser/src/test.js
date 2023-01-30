import { getDuplicates } from './get-duplicates.js';

function sort(duplicatesPriority = []) {
	duplicatesPriority.sort((a, b) => a.name.length - b.name.length);

	duplicatesPriority.sort((a, b) => {
		if ((a.price && a.image_id) && (!b.price || !b.image_id)) {
			return 1;
		}

		if ((!a.price || !a.image_id) && (b.price && b.image_id)) {
			return -1;
		}

		if ((a.price && !a.image_id) && (!b.price && !b.image_id)) {
			return 1;
		}

		if ((b.price && !b.image_id) && (!a.price && !b.image_id)) {
			return -1;
		}

		if ((a.price || a.image_id) && (!b.price && !b.image_id)) {
			return 1;
		}

		if ((b.price || b.image_id) && (!a.price && !a.image_id)) {
			return -1;
		}

		return 0;
	});

	duplicatesPriority.pop();

	return duplicatesPriority;
}


const products = [
	{
		name: '6221-43-4210 VALVE 6221-43-4210',
		price:'0.00',
		image_id: null,
	},
	{
		name: 'Клапан выпускной 6221-43-4210',
		price:'0.00',
		image_id: 1,
	},
	{
		name: 'Клапан выпускной 6221-43-4210',
		price:'0.00',
		image_id: null,
	},
];


for (const product of getDuplicates(products, 'sku')) {
	console.log(product);
}