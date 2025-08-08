let saldo = 0;
let riwayat = [];

function formatRupiah(angka) {
  return angka.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function updateSaldo() {
  document.getElementById("saldo").innerText = formatRupiah(saldo);
}

function simpanData() {
  localStorage.setItem('saldo', saldo);
  localStorage.setItem('riwayat', JSON.stringify(riwayat));
}

function muatData() {
  const simpananSaldo = localStorage.getItem('saldo');
  const simpananRiwayat = localStorage.getItem('riwayat');

  if (simpananSaldo !== null) {
    saldo = parseInt(simpananSaldo);
  }

  if (simpananRiwayat !== null) {
    riwayat = JSON.parse(simpananRiwayat);
    riwayat.forEach(item => tambahRiwayat(item, false));
  }
}

function tambahRiwayat(keterangan, simpan = true) {
  const list = document.getElementById("riwayatList");
  const item = document.createElement("li");
  item.textContent = keterangan;

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Batalkan";
  cancelBtn.style.display = "none";

  cancelBtn.onclick = function () {
    const index = riwayat.indexOf(keterangan);
    if (index > -1) {
      riwayat.splice(index, 1);
      if (keterangan.startsWith("Setor")) {
        saldo -= parseInt(bersihkanFormat(keterangan.split(":")[1]));
      } else if (keterangan.startsWith("Tarik")) {
        saldo += parseInt(bersihkanFormat(keterangan.split(":")[1]));
      }
      updateSaldo();
      list.removeChild(item);
      simpanData();
    }
  };

  item.appendChild(cancelBtn);
  list.prepend(item);

  item.onclick = function () {
    cancelBtn.style.display = "block";
  };

  if (simpan) {
    riwayat.unshift(keterangan);
    simpanData();
  }
}

function bersihkanFormat(input) {
  return input.replace(/\./g, '').replace(/[^0-9]/g, '');
}

function tambahSaldo() {
  const raw = document.getElementById("jumlah").value;
  const clean = bersihkanFormat(raw);
  const jumlah = parseInt(clean);
  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Masukkan jumlah yang valid.");
    return;
  }
  saldo += jumlah;
  updateSaldo();
  tambahRiwayat("Setor: " + formatRupiah(jumlah));
  document.getElementById("jumlah").value = "";
}

function tarikSaldo() {
  const raw = document.getElementById("jumlah").value;
  const clean = bersihkanFormat(raw);
  const jumlah = parseInt(clean);
  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Masukkan jumlah yang valid.");
    return;
  }
  if (jumlah > saldo) {
    alert("Saldo tidak mencukupi.");
    return;
  }
  saldo -= jumlah;
  updateSaldo();
  tambahRiwayat("Tarik: " + formatRupiah(jumlah));
  document.getElementById("jumlah").value = "";
}

function formatInput(inputField) {
  let value = inputField.value;
  let clean = bersihkanFormat(value);
  if (clean === '') {
    inputField.value = '';
    return;
  }
  let formatted = parseInt(clean).toLocaleString('id-ID');
  inputField.value = formatted;
}

function resetSaldo() {
  if (confirm("Apakah Anda yakin ingin mengatur ulang saldo?")) {
    saldo = 0;
    riwayat = [];
    updateSaldo();
    simpanData();
    document.getElementById("riwayatList").innerHTML = '';
  }
}

muatData();
updateSaldo();