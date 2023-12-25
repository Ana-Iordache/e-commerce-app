use ecommerce_app;

INSERT INTO `ecommerce_app`.`categories`(`name`) VALUES ('clothing');
INSERT INTO `ecommerce_app`.`categories`(`name`) VALUES ('shoes');
INSERT INTO `ecommerce_app`.`categories`(`name`) VALUES ('accessories');

/* SUBCAETGORIES FOR CLOTHING */
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('dresses & jumpsuits', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('jackets & coats', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('knitwear', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('t-shirts & tops', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('pants', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('jeans', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('skirts', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('shorts', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('hoodies', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('shirts & blouses', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('nightwear', 1);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('underwear', 1);

/* SUBCATEGORIES FOR SHOES */
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('boots & ankle boots', 2);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('sneakers', 2);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('sandals', 2);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('pumps & high heels', 2);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('ballerinas', 2);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('slippers', 2);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('sport', 2);

/* SUBCATEGORIES FOR ACCESSORIES */
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('bags', 3);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('backpacks', 3);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('hats', 3);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('jewelry', 3);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('sunglasses', 3);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('wallets', 3);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('hair', 3);
INSERT INTO `ecommerce_app`.`subcategories`(`name`, `categoryId`) VALUES ('others', 3);