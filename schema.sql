DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL (10, 2),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone case", "phone", 10.50, 500), ("dog toy", "pet", 15.75, 500), ("Playstation 4", "video games", 300, 200), ("Bamazon Echo", "household", 50, 300), ("sunglasses", "fashion", 30.25, 250),
("sweatshirt", "fashion", 42.50, 425), ("football", "sports", 12.75, 350), ("Titleist driver", "sports", 375, 150), ("dog treats", "pet", 10.25, 475), ("iPhone", "phone", 800, 250);