// Check licesense
let secyr = false;
$(".input-chk").on("keyup focus blur", function () {
  let key = document.querySelector(".input-chk");

  let licKey = ["KVZSJ-YFR65-USER1", "KVZSJ-YFR65-BEK09"].includes(key.value); //true

  let ip = "95.26.66.185";

  if (licKey) {
    secyr = true
    $(".check").css("display", "none");
    console.log(secyr);
  } else {
    this.classList.add("b-red");
    console.log(secyr);
  }
});

let userDB = [];
let checkedDB = [];

// Download BUTTON
const updBtn = document.querySelector(".dwld-upd");

// Generate last code function GN = generate name
function gn() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
////////////

// Global table \\
let db = [];

// Load DB
$(".db-imp").on("change", async function (e) {
  /* get data as an ArrayBuffer */
  const file = e.target.files[0];
  const data = await file.arrayBuffer();

  /* parse and load first worksheet */
  const wb = XLSX.read(data);

  const ws = wb.Sheets[wb.SheetNames[0]];

  let lastCeel = Number(ws["!ref"].split("AC")[1]);
  let km = [];
  for (let i = 3; i <= lastCeel; i++) {
    km.push(ws["A" + i].v);
  }

  // Показываем сколько КМ загружено(с анимацией)
  $({ numberValue: 0 }).animate(
    { numberValue: km.length },
    {
      duration: 500, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд
      easing: "linear",

      step: function (val) {
        $(".km-cnt").html(Math.ceil(val)); // Блок, где необходимо сделать анимацию
      },
    }
  );

  db = km;
});
//

$(".akt-imp").on("change", async function (e) {
  $(".res").html("");
  /* get data as an ArrayBuffer */
  const file = e.target.files[0];
  const data = await file.arrayBuffer();

  /* parse and load first worksheet */
  const wb = XLSX.read(data);

  const ws = wb.Sheets[wb.SheetNames[0]];

  // add akt number
  if (ws.A2.h) {
    $(".akt-number").val(ws.A2.h.slice(-8));
    // data
    $(".akt-data").val(ws.F3.h.match(/\d+/g).join("."));
    // INN
    $(".akt-seller").val(ws.B5.h.slice(-13, -1));
    for2();
  }

  let kmdb = [];
  // add KIZs to massive
  Object.values(ws).filter((e) => {
    if (/^010/.test(e.v)) {
      kmdb.push(e.v);
      return true;
    }
  });

  let result = [...new Set(db)].filter((item) => kmdb.includes(item));

  // Animation
  $({ numberValue: 0 }).animate(
    { numberValue: kmdb.length },
    {
      duration: 500,
      easing: "linear",

      step: function (val) {
        $(".akt-km-cnt").html(Math.ceil(val));
        if (kmdb.length == 0) {
          $(".db-km-cnt").addClass("c-red");
        } else {
          $(".db-km-cnt").removeClass("c-red");
          $(".akt-km-cnt").addClass("c-chz");
        }
      },
    }
  );

  $({ numberValue: 0 }).animate(
    { numberValue: result.length },
    {
      duration: 500,
      easing: "linear",

      step: function (val) {
        $(".db-km-cnt").html(Math.ceil(val));
        if (result.length == 0) {
          $(".db-km-cnt").addClass("c-red");
        } else {
          $(".db-km-cnt").removeClass("c-red");
          $(".db-km-cnt").addClass("c-green");
        }
      },
    }
  );

  checkedDB = result;
});

// Logic

updBtn.onclick = () => {
  // Data inputs
  let aktNumber = $(".akt-number");
  let aktData = $(".akt-data");
  let inn = $(".akt-seller");

  let userID = $(".userID").val();
  let f = $(".f").val();
  let i = $(".i").val();
  let o = $(".o").val();
  let ogrn = $(".ogrn").val();
  let index = $(".index").val();
  let regCode = $(".regCode").val();
  let city = $(".city").val();
  let street = $(".street").val();
  let hNumb = $(".hNumb").val();
  let apart = $(".apart").val();

  $sender = $(".selecterFio");
  const today = new Date().toLocaleDateString();
  const now = new Date().toLocaleTimeString().replace(/:/g, ".");
  const incNumber = `${aktNumber.val()}-${checkedDB.length}`;

  let fileLastID = gn();

  // Template ////////////////
  let tmp = `<?xml version="1.0" encoding="windows-1251"?>
<Файл ИдФайл="ON_NSCHFDOPPRMARK_2BM-7721546864-2012052808220682662630000000000_${userID}_00000000_${fileLastID}" ВерсФорм="5.01" ВерсПрог="EDOLite 1.0">
  <СвУчДокОбор ИдОтпр="${userID}" ИдПол="2BM-7721546864-2012052808220682662630000000000">
    <СвОЭДОтпр НаимОрг="ООО 'Оператор-ЦРПТ'" ИННЮЛ="7731376812" ИдЭДО="2LT"/>
  </СвУчДокОбор>
  <Документ КНД="1115131" Функция="ДОП" ПоФактХЖ="Документ об отгрузке товаров (выполнении работ), передаче имущественных прав (документ об оказании услуг)" НаимДокОпр="Документ об отгрузке товаров (выполнении работ), передаче имущественных прав (документ об оказании услуг)" ДатаИнфПр="${today}" ВремИнфПр="${now}" НаимЭконСубСост="${f.toUpperCase()} ${i.toUpperCase()} ${o.toUpperCase()}, ИНН: ${inn.val()}">
    <СвСчФакт НомерСчФ="${incNumber}" ДатаСчФ="${today}" КодОКВ="643">
      <СвПрод>
        <ИдСв>
          <СвИП ИННФЛ="${inn.val()}">
            <ФИО Фамилия="${f}" Имя="${i}" Отчество="${o}"/>
          </СвИП>
        </ИдСв>
        <Адрес>
          <АдрРФ Индекс="${index}" КодРегион="${regCode}" Город="${city}" Улица="${street}" Дом="${hNumb}" Кварт="${apart}"/>
        </Адрес>
      </СвПрод>
      <ГрузОт>
        <ОнЖе>он же</ОнЖе>
      </ГрузОт>
      <СвПокуп>
        <ИдСв>
          <СвЮЛУч НаимОрг="ООО 'Вайлдберриз'" ИННЮЛ="7721546864" КПП="507401001"/>
        </ИдСв>
        <Адрес>
          <АдрРФ Индекс="142181" КодРегион="50" Город="Подольск" НаселПункт="Коледино" Улица="Индустриальный парк Коледино" Дом="6" Корпус="1"/>
        </Адрес>
      </СвПокуп>
      <ДопСвФХЖ1 ОбстФормСЧФ="4"/>
    </СвСчФакт>
    <ТаблСчФакт>
      <СведТов НомСтр="1" НаимТов="Товар" ОКЕИ_Тов="796" КолТов="${
        checkedDB.length
      }" ЦенаТов="0" СтТовБезНДС="0.00" НалСт="без НДС" СтТовУчНал="0.00">
        <Акциз>
          <БезАкциз>без акциза</БезАкциз>
        </Акциз>
        <СумНал>
          <БезНДС>без НДС</БезНДС>
        </СумНал>
        <ДопСведТов НаимЕдИзм="шт">
          <НомСредИдентТов>`;

  let tmp2 = `
          </НомСредИдентТов>
        </ДопСведТов>
      </СведТов>
      <ВсегоОпл СтТовБезНДСВсего="0.00" СтТовУчНалВсего="0.00">
        <СумНалВсего>
          <СумНал>0.00</СумНал>
        </СумНалВсего>
      </ВсегоОпл>
    </ТаблСчФакт>
    <СвПродПер>
      <СвПер СодОпер="Товары переданы">
        <ОснПер НаимОсн="Акт приемки товара" НомОсн="${aktNumber.val()}" ДатаОсн="${aktData.val()}"/>
      </СвПер>
    </СвПродПер>
    <Подписант ОблПолн="0" Статус="1" ОснПолн="Должностные обязанности">
      <ИП ИННФЛ="${inn.val()}" СвГосРегИП="${ogrn}">
        <ФИО Фамилия="${f.toUpperCase()}" Имя="${i.toUpperCase()}" Отчество="${o.toUpperCase()}"/>
      </ИП>
    </Подписант>
  </Документ>
</Файл>`;
  ///////////

  //   Кодировщик
  var encodeCP1251 = function (string) {
    function encodeChar(c) {
      var isKyr = function (str) {
        return /[а-яё]/i.test(str);
      };
      var cp1251 = `ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬*®Ї°±Ііґµ¶·\
ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя`;
      var p = isKyr(c) ? cp1251.indexOf(c) + 128 : c.charCodeAt(0);
      var h = p.toString(16);
      if (h == "a") {
        h = "0A";
      }
      return "%" + h;
    }
    var res = "";
    for (var i = 0; i < string.length; i++) {
      res += encodeChar(string.charAt(i)); //ну или string[i]
    }
    return res;
  };

  let template = "";
  template += tmp;
  for (let elem of checkedDB) {
    template += `
            <КИЗ><![CDATA[${elem}]]></КИЗ>`;
  }
  template += tmp2;

  // Check active btn
  if (updBtn.classList.contains("active")) {
    updBtn.setAttribute(
      "href",
      "data:text/plain;charset=windows-1251," + encodeCP1251(template)
    );
    updBtn.setAttribute(
      "download",
      "ON_NSCHFDOPPRMARK_2BM-7721546864-2012052808220682662630000000000_" +
        userID +
        "_00000000_" +
        fileLastID +
        ".xml"
    );
  }
};

// Get seller info logic \\\
var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
var token = "0ce3bccbb24f817783d78df59ab588af6643f301";

$(".akt-seller").on("input", function () {
  if (this.value.length == 12) {
    for2();
  } else {
    this.classList.remove("b-red");
    this.classList.remove("b-green");
  }
});
function for2() {
  var queryValue = document.querySelector(".akt-seller");

  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: queryValue.value }),
  };

  fetch(url, options)
    .then((response) => response.text())
    .then((result) => {
      let sellerData = JSON.parse(result);

      queryValue.classList.add("b-green");
      $(".f").val(sellerData.suggestions[0].data.fio.surname);
      $(".i").val(sellerData.suggestions[0].data.fio.name);
      $(".o").val(sellerData.suggestions[0].data.fio.patronymic);
      $(".index").val(sellerData.suggestions[0].data.address.data.postal_code);
      $(".city").val(sellerData.suggestions[0].data.address.data.city);
      $(".ogrn").val(sellerData.suggestions[0].data.ogrn);
    })
    .catch((error) => {
      queryValue.classList.add("b-red");
      console.log("error", error);
    });
}
///

// check inputs
var inputs = [].slice.call(document.querySelectorAll('input[type="text"]'));

inputs.forEach(function (el) {
  el.addEventListener("input", checkInputs, false);
});
function checkInputs() {
  var empty = inputs.filter(function (el) {
    return el.value.trim() === "";
  }).length;
  if (!empty && secyr) {
    updBtn.classList.add("active");
  } else {
    updBtn.classList.remove("active");

    updBtn.removeAttribute(
      "href",
      "data:text/plain;charset=windows-1251,"
    );
    updBtn.removeAttribute(
      "download",
      "ON_NSCHFDOPPRMARK_2BM-7721546864-2012052808220682662630000000000_"
    );
  }
}
checkInputs();
//
