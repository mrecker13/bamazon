var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
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
    var price;
    var totalPrice;
    var product;
    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function(err, res) {
        if(err) throw (err);
        idQty = res[0].stock_quantity;
        price = res[0].price;
        product = res[0].product_name;
        if (qty <= idQty) {
            newQty = idQty - qty;
            totalPrice = price * qty;
            console.log("==================================================");
            console.log("You just purchased " + qty + " " + product + " for a total of $" + totalPrice);
            console.log("==================================================");
            updateQty(id, newQty);
        }
        else {
            console.log("Insufficient stock!");
            buyMore();
        }
    });
};

function updateQty (id, newQty) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQty, id], function(err, res) {
        if (err) throw (err);
    })
    buyMore();
}

function buyMore () {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to purchase more?",
            name: "confirm"
        }
    ])
    .then(function(input) {
        if(input.confirm ===true) {
            readDB();
            startApp();
        }
        else {
            console.log("Thank you!  Goodbye.")
            connection.end();
        }
    })
}