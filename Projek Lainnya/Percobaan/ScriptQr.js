function generate() {
  let data = document.getElementById("text").value.trim();

  if (!data) {
    alert("Silakan masukkan teks atau link terlebih dahulu.");
    return;
  }

  QRCode.toCanvas(document.getElementById("qrcode"), data, function (error) {
    if (error) {
      console.error(error);
      alert("Terjadi kesalahan saat membuat QR Code.");
    } else {
      console.log("QR code berhasil dibuat!");
    }
  });
}