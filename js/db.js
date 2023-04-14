// Global table
let db = [];

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

