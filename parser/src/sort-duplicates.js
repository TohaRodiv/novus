/**
 * 
 * @param {{price: number, image_id: null|number}[]} products 
 * @returns {{price: number, image_id: null|number}[]}
 */
export const sortDuplicates = (products) =>
	products.sort((a, b) => {

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