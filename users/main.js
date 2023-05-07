let row = document.querySelector(".cardrow");
let editStatus = false;
let editId = null;
function drawCards() {
  row.innerHTML = "";
  fetch("https://northwind.vercel.app/api/customers")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((item) => {
        row.innerHTML += `
        
        <span class="col col-3 ">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">Company Name:${item.companyName}</h5>
              <p class="card-text">
               City:${item.address?.city}
              </p>
              <p>Street:${item.address?.street}</p>
              <button href="#" class="btn btn-primary" 
                ><i class="fa-solid fa-heart"></i
              ></button>
              <button href="#" class="btn btn-success"  onclick=editCustomer("${item.id}") 
                ><i class="fa-solid fa-pen-to-square"></i
              ></button>
              <button href="#" class="btn btn-danger" onclick=deleteBtn("${item.id}") id="${item.id}"
                ><i class="fa-solid fa-trash"></i
              ></button>
            </div>
          </div>
        </span>
        
        `;
      })
    );
}
drawCards();

function deleteBtn(id) {
  fetch(`https://northwind.vercel.app/api/customers/${id}`, {
    method: "DELETE",
  });

  document.querySelector(`#${id}`).closest("span").remove();
}

let form = document.querySelector("form");
let inputs = document.querySelectorAll(".formrow input");
// console.log(inputs[0]);
let addBtn = document.querySelector("#add");
let editBtn = document.querySelector("#edit");

function editCustomer(id) {
  editId = id;
  editStatus = true;
  fetch(`https://northwind.vercel.app/api/customers/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      inputs[0].value = data.companyName;
      inputs[1].value = data.address.street;
      inputs[2].value = data.address.city;
      // console.log(data.address.city);
      console.log(inputs[0].value);
    })
    .catch((err) => console.log(err));
  // console.log(id);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    companyName: inputs[0].value,
    address: { street: inputs[1].value, city: inputs[2].value },
  };
  if (!editStatus) {
    fetch(`https://northwind.vercel.app/api/customers`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then(() => {
      drawCards();
    });
  } else {
    fetch(`https://northwind.vercel.app/api/customers/${editId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then(() => {
      drawCards();
    });

    editStatus = false;
  }
});
