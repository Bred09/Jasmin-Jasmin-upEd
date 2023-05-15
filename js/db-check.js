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

let userDB = [];
let checkedDB = [];

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

$(".akt-imp").on("change", async function (e) {
  $(".res").html("");
  /* get data as an ArrayBuffer */
  const file = e.target.files[0];
  const data = await file.arrayBuffer();

  /* parse and load first worksheet */
  const wb = XLSX.read(data);

  const ws = wb.Sheets[wb.SheetNames[0]];

  // $(".res").html(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));

  // КИЗКИЗКИЗ� КИЗКИЗ
  // КИЗ�� КИЗ�
  if (ws.A2.h) {
    $(aktNumber).val(ws.A2.h.slice(-8));
    // КИЗ�
    $(aktData).val(ws.F3.h.match(/\d+/g).join("."));
  }

  // Edit \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // let lastCeel = Number(ws["!ref"].split("H")[1]) - 1;
  // console.log(lastCeel);
  // let db = [];
  // for (let i = 13; i < lastCeel; i++) {
  //   console.log(ws["G" + i].v);
  // }

  // console.log(db);

  let kmdb = [];
  // КИЗКИЗКИЗ ��
  // КИЗКИЗКИЗ� КИЗКИЗ� �� КИЗКИЗ� � КИЗКИЗ "010"
  Object.values(ws).filter((e) => {
    if (/^010/.test(e.v)) {
      kmdb.push(e.v);
      return true;
    }
  });

  let result = [...new Set(db)].filter((item) => kmdb.includes(item));

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

  // Logic

  $sender = $(".selecterFio");
  const today = new Date().toLocaleDateString();
  const now = new Date().toLocaleTimeString().replace(/:/g, ".");
  const incNumber = `${aktNumber.val()}-${result.length}`;

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
            <ФИО Фамилия="${i}" Имя="${f}" Отчество="${o}"/>
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
        result.length
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

  let per = "";

  switch ($sender.val()) {
    case "Zoro":
      per += tmp;
      for (let elem of result) {
        per += `
            <КИЗ><![CDATA[${elem}]]></КИЗ>`;
      }
      per += tmp2;
      break;
    case "Said":
      alert($sender.val());
      break;
    case "Asror":
      alert($sender.val());
      break;
    case "Mukha":
      alert($sender.val());
      break;
    case "Abubakr":
      body.innerHTML += baxa;
      for (let elem of checkedDB) {
        body.innerHTML += `
                    <КИЗ><![CDATA[${elem}]]></КИЗ>`;
      }
      body.innerHTML += baxa2;
      break;
    case "Shaxa":
      body.innerHTML += shaxa;
      for (let elem of checkedDB) {
        body.innerHTML += `
                    <КИЗ><![CDATA[${elem}]]></КИЗ>`;
      }
      body.innerHTML += shaxa2;
      break;
    case "Gayratsho":
      alert($sender.val());
      break;
    default:
  }

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

  let template = '';
  template += tmp;
  for (let elem of result) {
    template += `
            <КИЗ><![CDATA[${elem}]]></КИЗ>`;
  }
  template += tmp2;

  if (result.length) {
    const link = document.querySelector(".dwld-upd");

    link.setAttribute(
      "href",
      "data:text/plain;charset=windows-1251," + encodeCP1251(template)
    );
    link.setAttribute(
      "download",
      "ON_NSCHFDOPPRMARK_2BM-7721546864-2012052808220682662630000000000_" +
        userID +
        "_00000000_" +
        fileLastID +
        ".xml"
    );
    link.classList.add("active");
  }

  userDB = kmdb;
  checkedDB = result;
});
