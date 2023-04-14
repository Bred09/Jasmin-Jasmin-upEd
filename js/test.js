let body = document.querySelector(".res");

$(".dwld-upd").on("click", () => {
  const today = new Date().toLocaleDateString();
  console.log(today);
  const now = new Date().toLocaleTimeString().replace(/:/g, ".");
  console.log(now);
  const incNumber = `${aktNumber[0].value}-${checkedDB.length}`;
  console.log(incNumber);

  let baxa = `<?xml version="1.0" encoding="windows-1251"?>
  <Файл ИдФайл="ON_NSCHFDOPPRMARK_2BM-7721546864-2012052808220682662630000000000_2LT-11001490913_20230401_2c2f9d94-103b-4d06-9810-679420cede4b" ВерсФорм="5.01" ВерсПрог="EDOLite 1.0">
<СвУчДокОбор ИдОтпр="2LT-11001490913" ИдПол="2BM-7721546864-2012052808220682662630000000000">
    <СвОЭДОтпр НаимОрг='ООО "Оператор-ЦРПТ"' ИННЮЛ="7731376812" ИдЭДО="2LT"/>
</СвУчДокОбор>
<Документ КНД="1115131" Функция="ДОП" ПоФактХЖ="Документ об отгрузке товаров (выполнении работ), передаче имущественных прав (документ об оказании услуг)" НаимДокОпр="Документ об отгрузке товаров (выполнении работ), передаче имущественных прав (документ об оказании услуг)" ДатаИнфПр="${today}" ВремИнфПр="${now}" НаимЭконСубСост="НАЖАТОВ БАХТИЁР ТОИРШОЕВИЧ, ИНН: 667808058520">
    <СвСчФакт НомерСчФ="${incNumber}" ДатаСчФ="${today}" КодОКВ="643">
        <СвПрод>
            <ИдСв>
                <СвИП ИННФЛ="667808058520">
                    <ФИО Фамилия="нажатов" Имя="бахтиёр" Отчество="тоиршоевич"/>
                </СвИП>
            </ИдСв>
            <Адрес>
                <АдрРФ Индекс="620134" КодРегион="66" Город="Екатеринбург" Улица="Коммунальная" Дом="32" Кварт="12"/>
            </Адрес>
        </СвПрод>
        <ГрузОт>
            <ОнЖе>он же</ОнЖе>
        </ГрузОт>
        <СвПокуп>
            <ИдСв>
              <СвЮЛУч НаимОрг='ООО "Вайлдберриз"' ИННЮЛ="7721546864" КПП="507401001"/>
            </ИдСв>
            <Адрес>
                <АдрРФ Индекс="142181" КодРегион="50" Город="Подольск" НаселПункт="Коледино" Улица="Индустриальный парк Коледино" Дом="6" Корпус="1"/>
            </Адрес>
        </СвПокуп>
        <ДопСвФХЖ1 ОбстФормСЧФ="4"/>
    </СвСчФакт>
    <ТаблСчФакт>
        <СведТов НомСтр="1" НаимТов="Кроссовки" ОКЕИ_Тов="796" КолТов="${checkedDB.length}" НалСт="без НДС" ДефСтТовУчНал="-">
            <Акциз>
                <БезАкциз>без акциза</БезАкциз>
            </Акциз>
            <СумНал>
                <БезНДС>без НДС</БезНДС>
            </СумНал>
            <ДопСведТов НаимЕдИзм="шт">
                <НомСредИдентТов>`;

  let baxa2 = `
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
                <ОснПер НаимОсн="Акт приемки товара" НомОсн="${aktNumber[0].value}" ДатаОсн="${aktData[0].value}"/>
            </СвПер>
        </СвПродПер>
        <Подписант ОблПолн="0" Статус="1" ОснПолн="Должностные обязанности">
            <ИП ИННФЛ="667808058520" СвГосРегИП="322665800215504">
                <ФИО Фамилия="НАЖАТОВ" Имя="БАХТИЁР" Отчество="ТОИРШОЕВИЧ"/>
            </ИП>
        </Подписант>
    </Документ>
</Файл>`;

  body.innerHTML += baxa;
  for (let elem of checkedDB) {
    body.innerHTML += `
                <КИЗ><![CDATA[${elem}]]></КИЗ>`;
  }
  body.innerHTML += baxa2;
});

// Copy result to buffer
var isIe =
  navigator.userAgent.toLowerCase().indexOf("msie") != -1 ||
  navigator.userAgent.toLowerCase().indexOf("trident") != -1;

function copyClip() {
  navigator.clipboard.writeText(body.value).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.info("Async: Could not copy text: ", err);
    }
  );
}
