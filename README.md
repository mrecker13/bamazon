# bamazon

Bamazon has inventory that you can purchase using the node.js CLI.  You will first want to enter your sql password into the appropriate field in the bamazonCustomer.js file in order to connect to your DB.

![Bamazon gif](/images/bamazon.mp4)

### How it works:

![Start the program](/images/initial.png)
* You will want to enter "node bamazonCustomer.js" in order to initiate the app.

![Opening screen](/images/start-screen.png)
* The first screen will ask you what id you would like to purchase, along with a reading of the current products in inventory.

![User input](/images/user-input.png)
* After entering which id you would like to purchase, you will then be prompted how many you would like to purchase.  If the qty entered is more than the current inventory of that product, you will be told there is insufficient inventory and asked if you would like to buy something else.

![Summary](/images/summary-confirm.png)
* After finalizing your purchase, you will be given a summary of the purchase including total price.  You will then be asked if you want to buy something else.  Just confirm with a 'y' or 'n'.

![Buy-more](/images/buy-more.png)
* If your input is 'y' then you will be sent to the starting prompt again.

![End](/images/end.png)
* if your input is 'n' you will be thanked and the connection will be closed.