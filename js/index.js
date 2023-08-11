// Global Variables 

var productName=document.getElementById("name");
var productPrice=document.getElementById("price");
var productCat=document.getElementById("category");
var productDesc=document.getElementById("description");
var tableBody=document.getElementById("tbody");
var totalProduct=document.getElementById("totaProduct");
var btnADD=document.getElementById("btnADD");
var allProduct=[];
var counter;

if(localStorage.getItem("allProduct") !=null){
    allProduct=JSON.parse(localStorage.getItem("allProduct"));
    displayProduct();
}
// Add Product 
function addProduct(){

   if(btnADD.innerHTML == "Add Product"){
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productCat.value,
        description:productDesc.value
    }
    allProduct.push(product);
    displayProduct();
    localStorage.setItem("allProduct",JSON.stringify(allProduct));
    clearForm();
   }
   else{
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productCat.value,
        description:productDesc.value
    }
    allProduct.splice(counter,1,product)
    displayProduct();
    localStorage.setItem("allProduct",JSON.stringify(allProduct));
    clearForm();
    btnADD.innerHTML="Add Product"
    btnADD.classList.remove("btn-outline-warning")
    btnADD.classList.add("btn-outline-info")
   }
}

// Display Product 
function displayProduct(){
  var displayProduct = "";

  for (var i=0 ; i<allProduct.length ; i++){
  totalProduct.innerHTML= i +1 ;
    displayProduct += `   <tr>
                <td>${i + 1}</td>
                <td>${allProduct[i].name}</td>
                <td>${allProduct[i].price}</td>
                <td>${allProduct[i].category}</td>
                <td>${allProduct[i].description}</td>
                <td>
                 <i class="fa-solid fa-pen-to-square text-warning me-3 fs-5" id="btnEdit" onClick="updateProduct(${i})"></i>
                 <i class="fa-solid fa-trash-can text-danger fs-5" id="btnDelete" onClick="deleteProduct(${i})"></i>
                 </td>
              </tr>`
  }

  tableBody.innerHTML=displayProduct;
  
}

// Clear Data 
function clearForm(){
    productName.value="";
    productPrice.value="";
    productCat.value="";
    productDesc.value="";
}

// Delete Product
function deleteProduct(index){
    allProduct.splice(index,1);
    displayProduct();
    localStorage.setItem("allProduct",JSON.stringify(allProduct));
}

// Update Product
function updateProduct(index){
    counter=index;
  productName.value= allProduct[index].name;
  productPrice.value= allProduct[index].price;
  productCat.value= allProduct[index].category;
  productDesc.value= allProduct[index].description;

  btnADD.innerHTML="Edit Product"
  btnADD.classList.add("btn-outline-warning")
  btnADD.classList.remove("btn-outline-info")
  displayProduct()
}

// Search Product
function search(term){
    var searchData="";
   for(var i =0 ; i<allProduct.length ;i++)
   {
      if(allProduct[i].name.toLowerCase().includes(term.toLowerCase()) == true || allProduct[i].category.toLowerCase().includes(term.toLowerCase())==true){
    
        searchData +=  `   <tr>
        <td>${i + 1}</td>
        <td>${allProduct[i].name}</td>
        <td>${allProduct[i].price}</td>
        <td>${allProduct[i].category}</td>
        <td>${allProduct[i].description}</td>
        <td>
         <i class="fa-solid fa-pen-to-square text-warning me-3 fs-5" id="btnEdit" onClick="updateProduct(${i})"></i>
         <i class="fa-solid fa-trash-can text-danger fs-5" id="btnDelete" onClick="deleteProduct(${i})"></i>
         </td>
      </tr>`
      }
     
   }
   tableBody.innerHTML=searchData;
}



function nameValidation() {
    var regex = /[a-zA-Z1-9]/;
    return regex.test(productName.value);
  }
  
  function priceValidation() {
    var regex =  /^(\d{1,3})?(,?\d{3})*(\.\d{2})?$/;
    return regex.test(productPrice.value);
  }
  function catValidation() {
    var regex =  /[a-z]{1,20}$/;
    return regex.test(productCat.value);
  }
  function descValidation() {
    var regex = /[A-Za-z1-9]{10,}/;
    return regex.test(productDesc.value);
  }
  
    btnADD.onclick= function () {

        if (productName.value == "" || productPrice.value == "") {
            invalidData.innerHTML= "Please Enter all Data.";
        } else {
          if (nameValidation() && priceValidation() && catValidation() && descValidation()) {
             addProduct();
          } else {
      
            if (!nameValidation()) {
                invalidData.innerHTML= "Enter a Valid Name";
            } else if (!priceValidation()) {
                invalidData.innerHTML= "Price Should be between 1000 and 10000";
            }
            else if (!catValidation()) {
                invalidData.innerHTML= "Category shoud be 'mobile' or 'TV'.....";
            }
           else if (!descValidation()) {
             invalidData.innerHTML= "Your description should contain at least 10 characters";
        }
              
          }
        }
      };

