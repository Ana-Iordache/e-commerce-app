const Products = require('../models/Products');

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

module.exports = {
    getCategoriesGrouped,
}