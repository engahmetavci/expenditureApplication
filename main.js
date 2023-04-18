const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector("#name-input");

// girilen ismi tarayıcıda saklama
const username = localStorage.getItem("name") || "";
nameInput.value = username;
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

// izleme işlemler
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

// toplam state
let toplam = 0;
function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

// harcama oluşturma
function addExpense(e) {
  e.preventDefault();
  if (!fiyatInput.value || !harcamaInput.value) {
    alert("formları doldurun");
    return;
  }

  const harcamaDiv = document.createElement("div");
  // class ekleme
  harcamaDiv.classList.add("harcama");
  console.dir(statusCheck);
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  // içeriği ayarlama
  harcamaDiv.innerHTML = `
      <h2>${harcamaInput.value}</h2>
      <h2 id="value">${fiyatInput.value}</h2>
      <div class="buttons">
      <img id="payment" src="image/payment.png"/>
      <img id="remove" src="image/delete.png"/>
    </div> `;
  // oluşna harcamayı htmle gönderme
  liste.appendChild(harcamaDiv);
  // toplamı güncelle
  updateToplam(fiyatInput.value);
  // formu temizle
  harcamaInput.value = "";
  fiyatInput.value = "";
}

// listeye tıklanma olayını yönetme
function handleClick(e) {
  // tıklanan elemanı alma
  const element = e.target;
  if (element.id === "remove") {
    // tıklanan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;
    // silinen elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice);
    // silinenin fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));
    // kapsayıcıyı htmlden silme
    wrapperElement.remove();
  }
}

// filtreleme işlemi
function handleFilter(e) {
  const items = liste.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}

/* local storage veriler biz silene kadar durur
 localStorage.setItem()
 localStorage.getItem()
 localStorage.removeItem() */
