const db = require('../db/db');

async function selectSubcategoriesGroupedByCategories() {
    let query = "SELECT c.id AS categoryId, c.name AS categoryName, GROUP_CONCAT(CONCAT(s.id,':', s.name)) AS subcategories FROM categories c LEFT JOIN subcategories s ON c.id = s.categoryId GROUP BY c.id";
    let result = await db.sendQuery(query);
    return result;
}

async function insert(name, description, price, discount, subCategoryId, gender) {
    let query = `INSERT INTO products (name, description, addingDate, price, discount, subCategoryId, gender) VALUES ('${name}', '${description}', DATE(NOW()), ${price}, ${discount}, ${subCategoryId}, '${gender}')`;
    let result = await db.sendQuery(query);
    return result;
}

async function updateById(code, name, description, price, discount, subCategoryId, gender) {
    let query = `UPDATE products SET name = '${name}', description = '${description}', price = ${price}, discount = ${discount}, subCategoryId = ${subCategoryId}, gender = '${gender}' WHERE code = ${code}`;
    let result = await db.sendQuery(query);
    return result;
}

async function selectAll() {
    let query = "SELECT * FROM vw_products ORDER BY code DESC";
    let result = await db.sendQuery(query);
    return result;
}

async function selectByCategory(category) {
    let query = `SELECT * FROM vw_products WHERE category = '${category}'`;
    let result = await db.sendQuery(query);
    return result;
}

async function selectAddedInLastMonth() {
    let query = `SELECT * from vw_products WHERE addingDate >= CURDATE() - INTERVAL 30 DAY`;
    let result = await db.sendQuery(query);
    return result;
}

async function remove(code) {
    let query = `DELETE FROM products WHERE code = ${code}`;
    let result = await db.sendQuery(query);
    return result;
}

module.exports = {
    selectSubcategoriesGroupedByCategories,
    insert,
    updateById,
    selectAll,
    selectByCategory,
    selectAddedInLastMonth,
    remove,
}