var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Cowboys26',
    database: 'bamazon'
  });
   
  connection.connect(function(err) {
      if (err) throw (err);
      readDB();
      startApp();
  });

  function readDB () {
      connection.query("SELECT * FROM products", function(err, res) {
          if(err) throw(err);
        console.log("\n---------------------------------------------");
          for (var i = 0; i < res.length; i++) {
              console.log("id: " + res[i].item_id +
                " | Name: " + res[i].product_name +
                " | Price: $" + res[i].price);
          }
        console.log("---------------------------------------------");
      })
  };

  function startApp () {
      inquirer.prompt([
          {
              type: "input",
              message: "What is the id of the product you would like to buy?",
              name: "product_id"
          },
          {
              type: "input",
              message: "How many would you like to buy?",
              name: "qty"
          }
      ])
      .then(function(userInput) {
          getQty(userInput.product_id, userInput.qty);
      })
  };

function getQty (id, qty) {
    var idQty;
    var newQty;
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [id], function(err, res) {
        if(err) throw (err);
        idQty = res[0].stock_quantity;
        if (qty <= idQty) {
            newQty = idQty - qty;
            updateQty(id, newQty);
        }
        else {
            console.log("Insufficient stock!");
            startApp();
        }
    });
};

function updateQty (id, newQty) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQty, id], function(err, res) {
        if (err) throw (err);
        console.log("Updated!");
    })
    startApp();
}