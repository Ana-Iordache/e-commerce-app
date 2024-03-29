const Products = require('../models/Products');
const Stock = require('../models/Stock');
const Images = require('../models/Images');


// GET /categories
/**
 * [
 *  {
 *    id: categoryId,
 *    name: categoryName1,
 *    subcategories: [{ id: subactegoryId1, name: subactegoryName1 }, { id: subactegoryId2, name: subactegoryName2 }]
 *  },
 *  {
 *    id: categoryId,
 *    name: categoryName2,
 *    subcategories: [{ id: subactegoryId1, name: subactegoryName1 }, { id: subactegoryId2, name: subactegoryName2 }]
 *  },
 * ]
 */
async function getCategoriesGrouped(req, res) {
    const categories = await Products.selectSubcategoriesGroupedByCategories();

    if (categories) {
        let categoriesResponse = [];
        let categoryObj = {};
        categories.forEach(category => {
            categoryObj = {
                id: category.categoryId,
                name: category.categoryName,
                subcategories: []
            }

            if (category.subcategories != "") {
                let subcategoriesArray = category.subcategories.split(",");
                subcategoriesArray.forEach(subcategory => {
                    let splittedByIdAndName = subcategory.split(":");

                    categoryObj.subcategories.push({ id: Number(splittedByIdAndName[0]), name: splittedByIdAndName[1] });
                })
            }
            categoriesResponse.push(categoryObj);
        });
        res.json(categoriesResponse);
    } else {
        res.status(404).json({ error: 'No categories found.' })
    }
}

// GET /products
async function getAll(req, res) {
    const category = req.query.category;
    let products;

    if (category) {
        products = category == 'newIn' ? await Products.selectAddedInLastMonth() : await Products.selectByCategory(category);
    } else {
        products = await Products.selectAll();
    }

    if (products) {
        for (let product of products) {
            product.stock = await Stock.getByProductCode(product.code)
            const productImages = await Images.getByProductCode(product.code);
            product.images = productImages.map(img => img.url);
        }
        res.json(products);
    } else {
        res.status(404).json({ error: 'No products found.' })
    }
}

// POST /products
async function addOne(req, res) {
    const { name, description, price, discount, subCategoryId, gender, stock, images } = req.body;

    if (!name || !price || !subCategoryId || !gender) {
        return res.status(400).json({ error: 'One or more required properties are missing.' });
    }

    const product = await Products.insert(name, description, price, discount, subCategoryId, gender);

    if (product) {
        let productCode = product['insertId'];

        stock.forEach(async s => {
            await Stock.insert(s.size, s.quantity, productCode);
        })

        images.forEach(async url => {
            await Images.insert(url, productCode);
        })

        res.status(201).json({ message: 'Product added successfully with code: ' + productCode + '.' });
    } else {
        req.status(500).json({ error: 'Product addition failed.' });
    }
}

// PUT /products/:id
async function updateById(req, res) {
    const { name, description, price, discount, subCategoryId, gender, stock } = req.body;
    const id = req.params.id;

    if (!name || !price || !subCategoryId || !gender) {
        return res.status(400).json({ error: 'One or more required properties are missing.' });
    }

    const product = await Products.updateById(id, name, description, price, discount, subCategoryId, gender);
    if (product['affectedRows']) {
        stock.forEach(async s => {
            if(s.id) {
                await Stock.updateById(s.id, s.size, s.quantity);
            } else {
                await Stock.insert(s.size, s.quantity, id);
            }
        })

        res.status(200).json({ message: 'Product update successfully.' });
    } else {
        req.status(500).json({ error: 'Product update failed.' });
    }
}

// DELETE /products/:id
async function remove(req, res) {
    const code = req.params.id;

    const product = await Products.remove(code);
    if (product['affectedRows'] > 0) {
        res.status(200).json({ message: 'Product removed successfully.' });
    } else {
        res.status(500).json({ error: 'Product could\'t be removed.' });
    }
}

module.exports = {
    getCategoriesGrouped,
    addOne,
    getAll,
    updateById,
    remove,
}