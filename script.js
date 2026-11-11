var products = [
  { name: "Pure Mustard Oil (1 litre)", category: "Groceries", shop: "Sharma Kisaan Store", price: 185, stock: 12 },
  { name: "Clay Water Matka", category: "Handicrafts", shop: "Prajapati Pottery", price: 120, stock: 8 },
  { name: "Besan Ladoo (500g)", category: "Sweets", shop: "Shree Ganesh Sweets", price: 220, stock: 15 },
  { name: "Cotton Dupatta", category: "Clothes", shop: "Bunkar Weaves", price: 340, stock: 6 }
];

var cart = [];            // items added to cart
var currentVendor = "";   // name of logged in shop


// show one page and hide the others
function showPage(pageName) {
  var pages = ["home", "login", "add", "cart"];
  for (var i = 0; i < pages.length; i++) {
    document.getElementById(pages[i]).style.display = "none";
  }
  document.getElementById(pageName).style.display = "block";

  if (pageName == "cart") {
    showCart();
  }
}


// show products on the home page (with search and category filter)
function showProducts() {
  var text = document.getElementById("searchBox").value.toLowerCase();
  var cat = document.getElementById("categoryBox").value;
  var box = document.getElementById("productList");
  var html = "";
  var count = 0;

  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    var nameAndShop = (p.name + " " + p.shop).toLowerCase();

    if (nameAndShop.indexOf(text) != -1 && (cat == "All" || p.category == cat)) {
      html += '<div class="product-box">';
      html += '<span class="category">' + p.category + '</span>';
      html += '<h4>' + p.name + '</h4>';
      html += '<p class="shop">Shop: ' + p.shop + '</p>';
      html += '<p class="shop">Stock: ' + p.stock + '</p>';
      html += '<p class="price">Rs. ' + p.price + '</p>';
      html += '<button onclick="addToCart(' + i + ')">Add to Cart</button>';
      html += '</div>';
      count++;
    }
  }

  if (count == 0) {
    html = "<p>No products found.</p>";
  }
  box.innerHTML = html;
  document.getElementById("countText").innerHTML = "Showing " + count + " products";
}


// vendor login
function login() {
  var shop = document.getElementById("shopName").value.trim();
  var pass = document.getElementById("shopPass").value;

  if (shop == "" || pass == "") {
    alert("Please enter shop name and password");
    return;
  }
  if (pass.length < 4) {
    alert("Password must be at least 4 characters");
    return;
  }

  currentVendor = shop;
  document.getElementById("vendorText").innerHTML = shop;
  document.getElementById("btnLogin").style.display = "none";
  document.getElementById("btnAdd").style.display = "inline";
  document.getElementById("btnLogout").style.display = "inline";
  document.getElementById("shopPass").value = "";

  alert("Welcome " + shop);
  showPage("add");
}


function logout() {
  currentVendor = "";
  document.getElementById("btnLogin").style.display = "inline";
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnLogout").style.display = "none";
  alert("Logged out");
  showPage("home");
}


// vendor adds a new product
function addProduct() {
  var name = document.getElementById("pName").value.trim();
  var category = document.getElementById("pCategory").value;
  var price = document.getElementById("pPrice").value;
  var stock = document.getElementById("pStock").value;

  if (name == "" || price == "" || stock == "") {
    alert("Please fill all the fields");
    return;
  }
  if (price <= 0 || stock <= 0) {
    alert("Price and stock must be more than 0");
    return;
  }

  var newProduct = {
    name: name,
    category: category,
    shop: currentVendor,
    price: Number(price),
    stock: Number(stock)
  };
  products.unshift(newProduct);   // put new product first

  document.getElementById("pName").value = "";
  document.getElementById("pPrice").value = "";
  document.getElementById("pStock").value = "";

  alert("Product added successfully");
  showProducts();
  showPage("home");
}


// cart functions
function addToCart(index) {
  cart.push(products[index]);
  document.getElementById("cartCount").innerHTML = cart.length;
  alert(products[index].name + " added to cart");
}

function showCart() {
  var rows = "";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    rows += "<tr>";
    rows += "<td>" + cart[i].name + "</td>";
    rows += "<td>Rs. " + cart[i].price + "</td>";
    rows += '<td><button class="remove-btn" onclick="removeFromCart(' + i + ')">Remove</button></td>';
    rows += "</tr>";
    total += cart[i].price;
  }

  document.getElementById("cartRows").innerHTML = rows;
  document.getElementById("cartTotal").innerHTML = total;

  if (cart.length == 0) {
    document.getElementById("cartEmpty").innerHTML = "Your cart is empty.";
  } else {
    document.getElementById("cartEmpty").innerHTML = "";
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cartCount").innerHTML = cart.length;
  showCart();
}

function placeOrder() {
  if (cart.length == 0) {
    alert("Cart is empty");
    return;
  }
  alert("Order placed! (demo only, payment is not connected)");
  cart = [];
  document.getElementById("cartCount").innerHTML = 0;
  showCart();
  showPage("home");
}


// run when page opens
showProducts();
