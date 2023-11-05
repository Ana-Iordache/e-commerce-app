const db = require('../db/db');

async function selectSubcategoriesGroupedByCategories() {
    let query = "SELECT c.id AS categoryId, c.name AS categoryName, GROUP_CONCAT(CONCAT(s.id,':', s.name)) AS subcategories FROM categories c LEFT JOIN subcategories s ON c.id = s.categoryId GROUP BY c.id";
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    selectSubcategoriesGroupedByCategories,
}