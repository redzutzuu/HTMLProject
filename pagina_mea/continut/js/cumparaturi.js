function Product(name, quantity, id) {
  this.id = id;
  this.name = name;
  this.quantity = quantity;
}

items = [];

function addNewProduct() {
  var ul = document.getElementById("list-items");
  var name = document.getElementById("product").value;
  var quantity = document.getElementById("quantity").value;
  var noOfProducts = items.length;
  var product = new Product(name, quantity, noOfProducts + 1);
  items.push(product);
  localStorage.setItem("items", JSON.stringify(items));
  ul.innerHTML += `<tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.quantity}</td>
                  </tr>`;
}
