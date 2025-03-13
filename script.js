document.getElementById("reset").addEventListener("click", resetLod);

function resetLod() {
  document.getElementById("conDuaa").classList.add("conDua");
  Toast({
    icon: "info",
    text: "Refresh halaman..",
    timer: "10000"
  });
  setTimeout(
    () => {
      location.reload();
    },
    Math.floor(Math.random() * 2100) + 1200
  );
}

function kususPaus(index) {
  if (index == 0 && !darahNaN) {
    document.getElementById("hitam").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("hitam").style.opacity = "1";
      document.getElementById("hitam").style.display = "none";
      // tidak aktif
      stopEND = false;
    }, 300);
  } else if (index == 1 && !darahNaN) {
    document.getElementById("hitam").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("hitam").style.opacity = "1";
      document.getElementById("hitam").style.display = "flex";
      // aktuf
      stopEND = true;
    }, 300);
  }
}
// Variable

const TimeId = document.getElementById("time");
const TimeSId = document.getElementById("timeS");
let tingkat = 32;
let jumblahDarah = 3;
let times = false;
let stopEND = false;
let level = 1;
let acakPosisi = Math.floor(Math.random() * 9) + 1;
warnaB(acakPosisi);

// -----> menghitungMundur

let waktuAwal = 8; // default -1
let waktuSisa = waktuAwal;
let intervalId;
let darahNaN = false;

function hitungMundur(nilaiAwalBaru = null) {
  if (nilaiAwalBaru !== null) {
    waktuAwal = nilaiAwalBaru;
    waktuSisa = waktuAwal;
  }
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    if (!stopEND) {
      waktuSisa--;
      TimeId.textContent = waktuSisa;

      if (waktuSisa <= 0) {
        clearInterval(intervalId);
        waktuSisa = waktuAwal;
        darahAll();
        hitungMundur(waktuAwal); // loop
        level++;
        setTimeout(() => {
          document.getElementById("level").textContent = level;
        }, 800);
        acakPosisi = Math.floor(Math.random() * 9) + 1;
        warnaB(acakPosisi);
      }
    }
  }, 1000);
}

function warnaB(colorID) {
  let [warna1, warna2] = warnaAcak(tingkat);
  for (let i = 1; i <= 9; i++) {
    if (i == colorID) {
      tombolColor(i).style.backgroundColor = warna2;
    } else {
      tombolColor(i).style.backgroundColor = warna1;
    }
  }
}

function mButton(aksi) {
  if (!stopEND) {
    if (!times) {
      let detik = 0;
      let menit = 0;
      setInterval(() => {
        if (!stopEND && !darahNaN) {
          if (detik >= 60) {
            detik = 0;
            menit++;
          }
          if (menit == 0 && detik <= 9) {
            document.getElementById("timeUp").innerHTML = "0" + detik + "s";
          } else if (menit == 0 && detik >= 9) {
            document.getElementById("timeUp").innerHTML = detik + "s";
          } else if (menit >= 1 && detik <= 9) {
            if (menit >= 1 && menit <= 9) {
              document.getElementById("timeUp").innerHTML =
                "0" + menit + ".0" + detik + "m";
            } else if (menit >= 10) {
              document.getElementById("timeUp").innerHTML =
                menit + ".0" + detik + "m";
            }
          } else if (menit >= 1 && detik >= 9) {
            if (menit >= 1 && menit <= 9) {
              document.getElementById("timeUp").innerHTML =
                "0" + menit + "." + detik + "m";
            } else if (menit >= 10) {
              document.getElementById("timeUp").innerHTML =
                menit + "." + detik + "m";
            }
          }
          detik++;
        }
      }, 1000);

      times = true;
    }

    hitungMundur(waktuAwal);
    level++;
    // --> atur tingkat kesulitan disini
    setTimeout(() => {
      document.getElementById("level").textContent = level;
    }, 800);

    if (aksi == 1) {
      lineButton(1);
    } else if (aksi == 2) {
      lineButton(2);
    } else if (aksi == 3) {
      lineButton(3);
    } else if (aksi == 4) {
      lineButton(4);
    } else if (aksi == 5) {
      lineButton(5);
    } else if (aksi == 6) {
      lineButton(6);
    } else if (aksi == 7) {
      lineButton(7);
    } else if (aksi == 8) {
      lineButton(8);
    } else if (aksi == 9) {
      lineButton(9);
    }

    function lineButton(index) {
      if (index == acakPosisi) {
        buttinDis(true);
        tombolColor(index).style.borderColor = "#48ee43";
        tombolColor(index).style.borderWidth = "4px";
        setTimeout(() => {
          tombolColor(index).style.borderColor = "#d7d1d1";
          tombolColor(index).style.borderWidth = "2.2px";
          acakPosisi = Math.floor(Math.random() * 9) + 1;
          warnaB(acakPosisi);
          buttinDis(false);
        }, 800);
      } else {
        darahAll();
        buttinDis(true);
        tombolColor(index).style.borderColor = "#a61437";
        tombolColor(index).style.borderWidth = "4px";
        setTimeout(() => {
          tombolColor(index).style.borderColor = "#d7d1d1";
          tombolColor(index).style.borderWidth = "2.2px";
          acakPosisi = Math.floor(Math.random() * 9) + 1;
          warnaB(acakPosisi);
          buttinDis(false);
        }, 800);
      }

      function buttinDis(matikan) {
        for (let ii = 1; ii <= 9; ii++) {
          if (matikan) {
            tombolColor(ii).disabled = true;
          } else {
            tombolColor(ii).disabled = false;
          }
        }
      }
    }

    //batas bawah
  }
}

function tombolColor(a) {
  return document.querySelector(".box-j").getElementsByTagName("button")[a - 1];
}

function warnaAcak(variation) {
  const r1 = Math.floor(Math.random() * 256);
  const g1 = Math.floor(Math.random() * 256);
  const b1 = Math.floor(Math.random() * 256);

  const r2 = Math.max(
    0,
    Math.min(255, r1 + Math.floor(Math.random() * variation * 2) - variation)
  );
  const g2 = Math.max(
    0,
    Math.min(255, g1 + Math.floor(Math.random() * variation * 2) - variation)
  );
  const b2 = Math.max(
    0,
    Math.min(255, b1 + Math.floor(Math.random() * variation * 2) - variation)
  );
  return [`rgb(${r1}, ${g1}, ${b1})`, `rgb(${r2}, ${g2}, ${b2})`];
}

function darahAll() {
  const elHeard = document.querySelector(".fitur").querySelectorAll(".activ");

  elHeard.forEach(el => (el.style.display = "none"));
  jumblahDarah = Math.max(jumblahDarah - 1, 0);
  for (let i = 0; i < jumblahDarah; i++) {
    elHeard[i].style.display = "flex";
  }
  if (jumblahDarah == 1) {
    bonusWaktu(1);
    Toast({
      icon: "warning",
      text: "Tersisah 1darah, dan +1dtk",
      timer: "5000"
    });
    setTimeout(() => {
      TimeSId.classList.remove("animasiDtk");
    }, 1000);
  }
  if (jumblahDarah == 0 && !stopEND) {
    console.log(`waktu habis ${jumblahDarah}`);
    addAlertCustom({
      judul: "Terimakasih",
      subJudul: "Statistics",
      p1: "Level: " + level,
      p2: "Live time: " + document.getElementById("timeUp").textContent,
      p3: " > Kembali < "
    });
    stopEND = true;
    darahNaN = true;
  }

  // return jumblahDarah;
}

function bonusWaktu(berapa) {
  TimeSId.textContent = waktuAwal;
  TimeSId.classList.add("animasiDtk");
  return (waktuAwal += berapa);
}

// --------> Alert end

function addAlertCustom(alert) {
  const divContainer = document.createElement("div");
  const divBox = document.createElement("div");
  divContainer.classList.add("containerDiv");
  divBox.classList.add("box-alertCustom");
  divContainer.appendChild(divBox);

  const h1 = document.createElement("h1");
  h1.textContent = alert.judul;
  divBox.appendChild(h1);

  const divPencapaian = document.createElement("div");
  divPencapaian.classList.add("box-scores");
  const paragraf1 = document.createElement("p");

  paragraf1.textContent = alert.subJudul;
  divPencapaian.appendChild(paragraf1);

  const ul = document.createElement("ul");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  const li3 = document.createElement("li");
  const li31 = document.createElement("button");
  li31.classList.add("endButton");
  li31.addEventListener("click", () => {
    document.getElementById("conDuaa").classList.add("conDua");
    setTimeout(
      () => {
        location.reload();
      },
      Math.floor(Math.random() * 2000) + 1000
    );
  });

  li1.textContent = alert.p1;
  li2.textContent = alert.p2;
  li31.textContent = alert.p3;
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  li3.appendChild(li31);
  divPencapaian.appendChild(ul);

  divBox.appendChild(divPencapaian);
  document.getElementsByClassName("container")[0].appendChild(divContainer);
}
