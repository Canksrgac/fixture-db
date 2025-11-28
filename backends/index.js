const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// FIXTURES JSON DOSYASININ YOLU
const fixturesPath = path.join(__dirname, "fixtures.json");

// API: TÜM FIXTURE’LARI GETİR
app.get("/fixtures", (req, res) => {
  try {
    const data = fs.readFileSync(fixturesPath, "utf8");
    const fixtures = JSON.parse(data);
    res.json(fixtures);
  } catch (err) {
    console.error("Fixture dosyası okunamadı:", err);
    res.status(500).json({ error: "Fixture listesi yüklenemedi." });
  }
});

// API: SUNUCU DURUM TESTİ
app.get("/", (req, res) => {
  res.send("Fixture Finder Backend Çalışıyor ✔️");
});

// SUNUCUYU BAŞLAT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Backend çalışıyor → Port:", PORT);
});
