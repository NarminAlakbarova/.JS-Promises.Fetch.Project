let fav = JSON.parse(localStorage.getItem("FavCustomers")) ?? [];
let row = document.querySelector(".cardrow");
function drawCard() {
  fav.forEach((item) => {
    row.innerHTML += `
        
        <span class="col col-3 ">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Company Name:${item.companyName}</h5>
            <p class="card-text">
             City:${item.address?.city}
            </p>
            <p>Street:${item.address?.street}</p>
       
            <button href="#" class="btn btn-danger"  id=${item.id} onclick=removeCard(${item.id},this)
              ><i class="fa-solid fa-trash"></i
            ></button>
          </div>
        </div>
      </span>
        
        
        `;
  });
}
drawCard();

 function removeCard(id,button){
    fav=fav.filter((obj)=>obj.id!=id)
    localStorage.setItem("FavCustomers",JSON.stringify(fav))
    button.closest("span").remove()
   drawCard()
 }