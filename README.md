# @edgarjeremy/geoman

`@edgarjeremy/geoman` adalah modul untuk pengkoneksian client map dengan server geoman.

## Daftar Isi
- [Instalasi](#instalasi)
- [Inisialisasi Map](#inisialisasi-map)
- [Menyematkan Event Ke Label Wilayah](#menyematkan-event-ke-label-wilayah)

---

## Instalasi
Menggunakan package manager

NPM :

`npm install @edgarjeremy/geoman`

Yarn :

`yarn add @edgarjeremy/geoman`

Menggunakan CDN

[geoman.min.js](https://unpkg.com/@edgarjeremy/geoman@latest/dist/geoman.min.js)

```html
<script src="https://unpkg.com/@edgarjeremy/geoman@latest/dist/geoman.min.js"></script>
```


---

## Inisialisasi Map
Class `GeoMan` akan tersedia di objek `window` jika menggunakan CDN. Jika menggunakan package manager, import class `GeoMan` dari modul `@edgarjeremy/geoman`

```javascript
import GeoMan from '@edgarjeremy/geoman'; // ES6
// atau
const GeoMan = require('@edgarjeremy/geoman'); // CommonJS
// atau
const GeoMan = window.GeoMan; // browser

const map = new GeoMan(
  'http://localhost', // host server geoman
  8080, // port server geoman
  {
    container: 'map', // id container HTML
    center: [124.842624, 1.4794296], // koordinat tengah map [longitude, latitude]
    zoom: 15, // zoom map
  },
  'id_map' // id basemap di server geoman
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
