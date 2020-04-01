import mapbox from 'mapbox-gl';
import { HTTP } from './utils/http';

/**
 * Class utama dari GeoMan
 * @class GeoMan
 */
export default class GeoMan {
  public map: mapbox.Map;
  public sources: string[] = [];
  public layers: string[] = [];
  public fullURL: string;
  private baseURL: string;
  private port: number;
  private center: mapboxgl.MapboxOptions['center'];
  private zoom: mapboxgl.MapboxOptions['zoom'];

  public http: HTTP;

  /**
   * Membuat instance dari class GeoMan
   * @param baseURL base url server geoman
   * @param port port server geoman
   * @param options map options
   * @param id slug id
   */
  constructor(baseURL: string, port: number, options: mapbox.MapboxOptions, id: string) {
    this.baseURL = baseURL;
    this.port = port;
    this.fullURL = `${this.baseURL}${this.port === 80 ? '' : `:${this.port}`}`;
    this.http = new HTTP(this.baseURL, this.port);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.1.1/mapbox-gl.css';
    document.head.appendChild(link);

    options.style = `${this.fullURL}/map/maps/${id.toLowerCase()}`;
    this.center = options.center;
    this.zoom = options.zoom;
    this.map = new mapbox.Map(options);
  }

  /**
   * Set callback saat style map sudah selesai di-load
   */
  public setReadyCallback(fn: (ev: any) => void) {
    this.map.on('style.load', fn);
  }

  /**
   * Tambah GeoJSON ke map
   * @param id string unik untuk menandai layer
   * @param data data geojson
   */
  public addGeoJSON(id: string, type: 'line' | 'symbol' | 'fill' | 'circle', data: mapbox.GeoJSONSourceOptions['data']): mapbox.Map {
    return this.map.addLayer({
      id,
      type,
      source: {
        type: 'geojson',
        data
      },
    });
  }

  /**
   * Hapus layer GeoJSON dari map
   * @param id id layer untuk dihapus
   */
  public removeGeoJSON(id: string): mapbox.Map {
    return this.map.removeLayer(id);
  }

  /**
   * Menentukan event di label wilayah
   * @param ev event untuk di-attach
   * @param regionName nama region yang akan di-attach event
   * @param cb callback ketika event terjadi
   */
  public setRegionLabelEvent(ev: 'touchcancel' | 'touchend' | 'touchstart' | 'click' | 'contextmenu' | 'dblclick' | 'mousemove' | 'mouseup' | 'mousedown' | 'mouseout' | 'mouseover' | 'mouseenter' | 'mouseleave', regionName: 'district' | 'subdistrict' | 'neighbor', cb: (feature: mapbox.MapboxGeoJSONFeature | null, ev: (mapbox.MapTouchEvent & {
    features?: mapbox.MapboxGeoJSONFeature[] | undefined;
  } & mapbox.EventData) | (mapbox.MapMouseEvent & {
    features?: mapbox.MapboxGeoJSONFeature[] | undefined;
  } & mapbox.EventData)) => void) {
    const d = {
      district: 'ds',
      subdistrict: 'ss',
      neighbor: 'ns'
    }
    const layerName: string = `tc-${d[regionName]}-label`;
    this.map.on(ev, layerName, (d) => cb(d.features ? d.features[0] : null, d));
    this.map.on('mouseenter', layerName, (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', layerName, (e) => {
      this.map.getCanvas().style.cursor = '';
    });
  }

}
