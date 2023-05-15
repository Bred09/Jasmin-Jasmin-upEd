$(".akt-seller").on("keyup", function () {
    if (this.value.length == 12) {
      this.classList.add('b-green');
      findSeller()
    } else{
      this.classList.remove('b-green');
    }
});

var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
var token = "0ce3bccbb24f817783d78df59ab588af6643f301";
function findSeller() {
  var query = $(".akt-seller").val();
  
  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: query }),
  };

  fetch(url, options)
    .then((response) => response.text())
    .then((result) => {
      let sellerData = JSON.parse(result);
      $(".f").val(sellerData.suggestions[0].data.fio.surname);
      $(".i").val(sellerData.suggestions[0].data.fio.name);
      $(".o").val(sellerData.suggestions[0].data.fio.patronymic);
      $(".index").val(sellerData.suggestions[0].data.address.data.postal_code);
      $(".city").val(sellerData.suggestions[0].data.address.data.city);
      $(".ogrn").val(sellerData.suggestions[0].data.ogrn);
    })
    .catch((error) => console.log("error", error));
}
