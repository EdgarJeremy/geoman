# geoman-client

`geoman-client` adalah modul untuk pengkoneksian client map dengan server GeoMan. Server yang dimaksud adalah server yang memiliki service backend GeoMan

## Daftar Isi
- [Instalasi](#instalasi)
- [Inisialisasi Map](#inisialisasi-map)
- [Menyematkan Event Ke Label Wilayah](#menyematkan-event-ke-label-wilayah)

---

## Instalasi
Menggunakan CDN

[geoman.min.js](https://unpkg.com/geoman-client@latest/dist/geoman.min.js)

```html
<script src="https://unpkg.com/geoman-client@latest/dist/geoman.min.js"></script>
```

Atau menggunakan package manager

NPM :

`npm install geoman-client`

Yarn :

`yarn add geoman-client`

---

## Inisialisasi Map
Class `GeoMan` akan tersedia di objek `window` jika menggunakan CDN. Jika menggunakan package manager, import class `GeoMan` dari modul `geoman-client`

```javascript
import GeoMan from 'geoman-client'; // ES6
// atau
const GeoMan = require('geoman-client'); // CommonJS
// atau
const GeoMan = window.GeoMan; // browser

const map = new GeoMan(
  'http://localhost', // host server GeoMan
  8080, // port server GeoMan
  {
    container: 'map', // id container di HTML
    center: [124.842624, 1.4794296], // koordinat tengah map [longitude, latitude]
    zoom: 15, // zoom map
  },
  'id_map' // id basemap di server GeoMan
);
```

---
## Menyematkan Event Ke Label Wilayah
Menyematkan fungsi yang akan dipanggil saat event pada parameter `ev` terjadi
```javascript
map.setRegionLabelEvent(ev: string, regionName: 'district' | 'subdistrict' | 'neighbor', cb: Function): void
```

Contoh
```javascript
map.setRegionLabelEvent('click', 'district', (feature) => {
  console.log(feature); // informasi wilayah yang diklik
});
```
