let sendData = {
  seller: 123,
};
const fileID = "2LT-11001510992_20230321_fc888040-d05c-4cf6-85ac-31bcff5eb447";
const sellerID = "2LT-11001510992";
const DateInfTr = "21.03.2023";
const TimeInfTr = "07.04.54";
const NameEconEntDraf = "НАЗРИЕВ АСРОРИДИН ШУМКОРОВИЧ, ИНН: 667809154925";
const NumberInv = "11126173-Ekb2398-try3";
const DateInv = "21.03.2023";
const innPP = "667809154925";
const fioF = "НАЗРИЕВ ";
const fioI = "АСРОРИДИН ";
const fioO = "ШУМКОРОВИЧ";
const addr = {
  index: "620141",
  codeRegion: "66",
};
const allKIZs = ["kiz1", "kiz2", "kiz3"];

let dataXML = `
<Файл
ИдФайл="ON_NSCHFDOPPRMARK_2BM-7721546864-2012052808220682662630000000000_${fileID}"
ВерсФорм="5.01" ВерсПрог="EDOLite 1.0">
<СвУчДокОбор
ИдОтпр="${sellerID}"
ИдПол="2BM-7721546864-2012052808220682662630000000000">
<СвОЭДОтпр НаимОрг="ООО "Оператор-ЦРПТ"" ИННЮЛ="7731376812" ИдЭДО="2LT"/>
</СвУчДокОбор>
<Документ КНД="1115131" Функция="ДОП"
ПоФактХЖ="Документ об отгрузке товаров (выполнении работ), передаче имущественных прав (документ об оказании услуг)" НаимДокОпр="Документ об отгрузке товаров (выполнении работ), передаче имущественных прав (документ об оказании услуг)"
ДатаИнфПр="${DateInfTr}"
ВремИнфПр="${TimeInfTr}"
НаимЭконСубСост="${NameEconEntDraf}">
<СвСчФакт
НомерСчФ="${NumberInv}"
ДатаСчФ="${DateInv}"
КодОКВ="643">
<СвПрод>
<ИдСв>
<СвИП ИННФЛ="${innPP}">
<ФИО Фамилия="${fioF}"
Имя="${fioI}"
Отчество="${fioO}"/>
</СвИП>
</ИдСв>
<Адрес>
<АдрРФ
Индекс=""
КодРегион=""
Город="Екатеринбург"
Улица="Ольховская"
Дом="27" Корпус="1"
Кварт="97"/>
</Адрес>
</СвПрод>
<ГрузОт>
<ОнЖе>он же</ОнЖе>
</ГрузОт>
<СвПокуп>
<ИдСв>
<СвЮЛУч НаимОрг="ООО "Вайлдберриз"" ИННЮЛ="7721546864" КПП="507401001"/>
</ИдСв>
<Адрес>
<АдрРФ Индекс="142181" КодРегион="50" Город="Подольск" НаселПункт="Коледино" Улица="Индустриальный парк Коледино" Дом="6" Корпус="1"/>
</Адрес>
</СвПокуп>
<ДопСвФХЖ1 ОбстФормСЧФ="4"/>
</СвСчФакт>
<ТаблСчФакт>
<СведТов НомСтр="1" НаимТов="КРОССОВКИ" ОКЕИ_Тов="796" КолТов="293" ЦенаТов="2100.00" СтТовБезНДС="0" НалСт="без НДС" СтТовУчНал="0.00">
<Акциз>
<БезАкциз>без акциза</БезАкциз>
</Акциз>
<СумНал>
<БезНДС>без НДС</БезНДС>
</СумНал>
<ДопСведТов НаимЕдИзм="шт">
<НомСредИдентТов>`;
for (let elem of allKIZs) {
  console.log(elem);
  $("body").innerHTML += `<КИЗ><![CDATA[${elem}]]></КИЗ>`;
}

let body = $('.res')
$('.dwld-upd').on("click", function () {
  console.log(`
        <СведТов НомСтр="" НаимТов="мужская обувь" ОКЕИ_Тов="796" КолТов="254" ЦенаТов="0" СтТовБезНДС="0.00" НалСт="без НДС" СтТовУчНал="0.00">
              <Акциз>
                  <БезАкциз>без акциза</БезАкциз>
              </Акциз>
              <СумНал>
                  <БезНДС>без НДС</БезНДС>
              </СумНал>
              <ДопСведТов НаимЕдИзм="шт">
                  <НомСредИдентТов>
  `);

  for (let elem of allKIZs) {
    console.log(`<КИЗ><![CDATA[${elem}]]></КИЗ>`);
  }

  console.log(`
            </НомСредИдентТов>
          </ДопСведТов>
        </СведТов>`);
});



// Переменные полей
let aktNumber = $(".akt-number");
let aktData = $(".akt-data");
let aktSeller = $(".akt-seller");

let gt;

let a = document.querySelector(".input");
a.onchange = async function (e) {
  /* get data as an ArrayBuffer */
  const file = e.target.files[0];
  const data = await file.arrayBuffer();

  /* parse and load first worksheet */
  const wb = XLSX.read(data);
  console.log("Загруженная таблица\nсо всеми данными");
  console.log(wb);

  const ws = wb.Sheets[wb.SheetNames[0]];
  console.log("Загруженная таблица\nс первым листом");
  console.log(ws);

  $(".res").html(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));

  // Извлечение данных
  // Номер акта
  if (ws.A2.h) {
    $(aktNumber).val(ws.A2.h.slice(-8));
    // Дата
    $(aktData).val(ws.F3.h.match(/\d+/g).join("."));
    // Продавец
    $(aktSeller).val(ws.B5.h.slice(-13).slice(0, -1));
  }

  // Edit \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  let db = [];
  for (let i = 3; i; i++) {
    let mdb = new Map(ws["A" + i].v);
    console.log(ws["A" + i].v);
    console.log(mdb);
  }
  console.log(db);

  // for (let ic = 13;ic; ic++) {
  //   if(ws['G'+ic].h) break
  //   console.log(ws['G'+ic].h);
  // }

  // Фильтрация массива на наличие в начале "010"
  // const result = Object.values(ws).filter((e) => {
  //   if (/^010/.test(e.h)) return true;
  // });

  // console.log(result);
  let niHuya = "niHuya ne poluchil";

  return db;
};

function f1() {
  const arr = [
    { A1: 1 },
    { A2: 2 },
    { B1: "Name" },
    { B2: "Lastname" },
    { G1: 3 },
    { G2: 4 },
    { G3: "bek" },
    { G4: "tung" },
  ];

  const newArr = arr.find((cis) => {
    arr.G2 == 4;
  });

  console.log(newArr);
}

//
//
// Old
// $('form input:file').change(function(event){
//   file = this.files[0];
//   reader = new FileReader();
//   reader.onload = function(event) {
//      result = event.target.result.replace(/\n/g,'<br />');
//      $('.table').html(result);
//   };
//   reader.readAsText(file, 'Windows-1252');
// })

// document.getElementById('input').addEventListener('change', function(e) {
//   if (e.target.files[0]) {
//     document.body.append('You selected ' + e.target.files[0].name);
//   }
//   console.log(e)
// });

// let btnUp = document.querySelector('input')
// let statusTitle = document.querySelector('.status')

// btnUp.addEventListener('change', async () => {
//   const content = await btnUp.files[0].text();
//   console.log(await btnUp.files[0])
//   var tab = document.querySelector('.table').innerHTML = content;
//   statusTitle.innerHTML = 'Таблица загружена';
//   // FILTERS {
//   // }
//   })
