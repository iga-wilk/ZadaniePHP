const show = document.getElementById('show_pop_up'); 
const close = document.getElementById('close');
const popup_container = document.getElementById('popup_container'); 

const name_product = document.getElementById('name_product'); 
const price = document.getElementById('price')   

const price_form = document.getElementById('price_form') 

const sizes_1 = document.getElementById('sizes_1');
const label_sizes_1 = document.getElementById('label_sizes_1');
const sizes_2 = document.getElementById('sizes_2');
const label_sizes_2 = document.getElementById('label_sizes_2');
const sizes_3 = document.getElementById('sizes_3');
const label_sizes_3 = document.getElementById('label_sizes_3');
const radio_sizes = document.getElementsByName('sizes');
const color_form = document.getElementById('color_form');
const is_available = document.getElementById('is_available');
const name_product_form = document.getElementById('name_product_form');
const ilosc_sztuk = document.getElementById('ilosc_sztuk');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const submit_button = document.getElementById('submit');
const dataq = JSON.parse(`{       
  "product": {
    "id": 1,
    "name": "Konsola MICROSOFT XBOX ONE S 500GB + FIFA 19",
    "code": "10000053",
    "icon": "\/data\/gfx\/icons\/large\/7\/0\/7.jpg",
    "link": "\/pl\/products\/xbox-4-slim-7.html",
    "product_type": "product_item"
  },
  "sizes": {
    "unit": "szt.",
    "unit_single": "szt.",
    "unit_plural": "szt.",
    "unit_fraction": "sztuka",
    "unit_precision": "0",
    "unit_sellby": 1,
    "items": {
      "U": {
        "type": "U",
        "name": "Ram 32 GB",
        "amount": 1,
        "status": "Produkt dostępny",
        "price": 125.00
      },
      "V": {
        "type": "V",
        "name": "Ram 64 GB",
        "amount": 12,
        "status": "Produkt dostępny",
        "price": 159.00
      },
      "W": {
        "type": "W",
        "name": "Ram 128 GB",
        "amount": 0,
        "status": "Produkt niedostępny",
        "price": 199.00
        }
      }
  },
  "multiversions": [
    {
      "id": "1",
      "name": "Wariant",
      "items": {
        "1-1": {
          "enabled": true,
          "selected": true,
          "products": [
            {
              "product_id": 7,
              "version_priority": "1",
              "url": "\/pl\/products\/xbox-7.html",
              "price_difference": "0.00"
            }
          ],
          "values": {
            "61": {
              "id": 61,
              "name": "Srebrny"
            }
          },
          "values_id": "61"
        },
        "1-2": {
          "enabled": true,
          "products": [
            {
              "product_id": 8,
              "version_priority": "2",
              "url": "\/pl\/products\/xbox-4-slim-8.html",
              "price_difference": "-5.00"
            }
          ],
          "values": {
            "60": {
              "id": 60,
              "name": "Czarny"
            }
          },
          "values_id": "60"
        },
        "1-3": {
          "enabled": true,
          "products": [
            {
              "product_id": 27,
              "version_priority": "2",
              "url": "\/pl\/products\/xbox-4-slim-27.html",
              "price_difference": "-10.00"
            }
          ],
          "values": {
            "59": {
              "id": 59,
              "name": "Biały"
            }
          },
          "values_id": "59"
        }
      }
    }
  ]
  
}`);
//włączanie pop-upu i działania na nim
show.addEventListener('click',  ()=>{
    popup_container.classList.add('show'); //wyświetlenie pop-upu
    //pobranie danych z pliku
    
    
    name_product.innerHTML ="<b>"+ dataq.product.name+ "</b>"; // wyświetlenie nazwy produktu
    name_product_form.value = dataq.product.name;
      price.innerHTML = "<b>"+parseFloat(dataq.sizes.items.U.price,2).toFixed(2) + " zł</b>";
      price_form.value = parseFloat(dataq.sizes.items.U.price,2).toFixed(2);
    sizes_1.value = dataq.sizes.items.U.name;
    label_sizes_1.innerHTML = dataq.sizes.items.U.name;

    sizes_2.value = dataq.sizes.items.V.name;
    label_sizes_2.innerHTML = dataq.sizes.items.V.name;

    sizes_3.value = dataq.sizes.items.W.name;
    label_sizes_3.innerHTML = dataq.sizes.items.W.name;
    is_available.innerHTML= "<i class='fas fa-check' style='color: limegreen'></i> "+dataq.sizes.items.U.status;
    plus.disabled = true;
});

 close.addEventListener('click', () => {
     popup_container.classList.remove('show');
     });

function sizesAddPrice(size)
{
      var color = color_form.value;
      let color_price;
      let size_price;
      let amount ;
      switch(size)
      {
        case "U": size_price = dataq.sizes.items.U.price;
                  amount  =searchAmount(dataq.sizes.items.U.name);
                  is_available.innerHTML= "<i class='fas fa-check' style='color: limegreen'></i> "+dataq.sizes.items.U.status; break;
        case "V": size_price = dataq.sizes.items.V.price;
                    amount  =searchAmount(dataq.sizes.items.V.name);
                  is_available.innerHTML= "<i class='fas fa-check' style='color: limegreen'></i> "+ dataq.sizes.items.V.status;break;
        case "W": size_price = dataq.sizes.items.W.price;
        amount  =searchAmount(dataq.sizes.items.W.name);
        is_available.innerHTML= "<i class='fas fa-times' style='color: red'></i> "+dataq.sizes.items.W.status; break;
      };
     
      switch(color)
      {
        case "srebrny": color_price = dataq.multiversions[0].items["1-1"].products[0].price_difference;break;
        case "czarny":  color_price = dataq.multiversions[0].items["1-2"].products[0].price_difference;break;
        case "biały":   color_price = dataq.multiversions[0].items["1-3"].products[0].price_difference;break;
      }; 

      let all_price = parseFloat(size_price) + parseFloat(color_price);
      price.innerHTML ="<b>"+ all_price.toFixed(2)+" zł </b>";
      price_form.value = all_price.toFixed(2);


        plus.disabled = false;
        minus.disabled = false;
        submit_button.disabled = false;
        ilosc_sztuk.value = "1";
        submit_button.setAttribute("style", "background-color: royalblue;");;
       switch (amount)
       {
         case 0: plus.disabled = true;
         minus.disabled = true;
         submit_button.disabled = true;
        submit_button.setAttribute("style", "background-color: gray;");;
         ilosc_sztuk.value = "0";break;
         case 1: plus.disabled = true; break
         
       }
      
};

function colorAddPrice(color)
{
      let color_price;
      let size_price;
      sizes_radio = sizes_checked();
  
      switch(sizes_radio)
      {
        case dataq.sizes.items.U.name: size_price = dataq.sizes.items.U.price; break;
        case dataq.sizes.items.V.name: size_price = dataq.sizes.items.V.price; break;
        case dataq.sizes.items.W.name: size_price = dataq.sizes.items.W.price; break;
      };

      switch(color)
      {
        case "srebrny": color_price = dataq.multiversions[0].items["1-1"].products[0].price_difference;break;
        case "czarny":  color_price = dataq.multiversions[0].items["1-2"].products[0].price_difference;break;
        case "biały":   color_price = dataq.multiversions[0].items["1-3"].products[0].price_difference;break;
      }; 

     
      let all_price = parseFloat(size_price) + parseFloat(color_price);
      price.innerHTML ="<b>"+ all_price.toFixed(2)+" zł </b>";
      price_form.value = all_price.toFixed(2);
};

function sizes_checked()
{
  let lenght_sizes = radio_sizes.length;
  let sizes_value;
  for(i = 0; i <lenght_sizes; i++)
  {
    if(radio_sizes[i].checked)
    {
      sizes_value = radio_sizes[i].value;
    }
  }
  return sizes_value;
};

function ChangeValue(znak)
{
    
    let quantity = parseInt(ilosc_sztuk.value) ;
    let sizes_name = sizes_checked();
    let amount = searchAmount(sizes_name);
    submit_button.disabled = false;
    submit_button.setAttribute("style", "background-color: royalblue;");;
    minus.disabled = false; plus.disabled = false;
    switch (znak)
    {
      case "-": quantity= quantity-1;break;
      case "+": quantity++;break;
    }
    
     switch (quantity)
     {
       case 0: minus.disabled = "disabled";
       submit_button.disabled = true;
       submit_button.setAttribute("style", "background-color: gray;");break;
       case amount: plus.disabled = "disabled";break;
       default: minus.disabled = false; plus.disabled = false;
     }
    ilosc_sztuk.value = quantity;
}

function searchAmount(sizes_name)
{
  let amount;
  sizes_radio = sizes_checked();
      
  switch(sizes_radio)
  {
    case dataq.sizes.items.U.name: amount = dataq.sizes.items.U.amount; break;
    case dataq.sizes.items.V.name: amount = dataq.sizes.items.V.amount; break;
    case dataq.sizes.items.W.name: amount = dataq.sizes.items.W.amount; break;
  };
  return amount;
}


// slider

var slideIndex = 1;
showSlides(slideIndex);

function changeSlides(n) 
{    
  slideIndex += n;
    showSlides(slideIndex);
   
}


function showSlides(n)
{
  var i;
  var slides = document.getElementsByClassName("mySlides");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
 
  slides[slideIndex-1].style.display = "block";
}