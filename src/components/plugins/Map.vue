<template>
  <div class="container">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100vh"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div>
            <router-link v-if="isGBG" class="collapse-item" :to="{ name: 'dashboard', params: { site: 'GBG', perm: isGBG } }">Geebung</router-link>
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import {
    mapGetters
} from 'vuex'

export default {
  name: "Simple",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      zoom:4.5,
      center: latLng(-25.2755, 133.7751),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(-27.369389, 153.058789),
      withTooltip: latLng(-27.369389, 153.058789),
      currentZoom: 11.5,
      currentCenter: latLng(-27.369389, 153.058789),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },

  computed: {
        ...mapGetters({
            //Account Getters
            userName: 'getUserName',
            isLoggedIn: 'isLoggedIn',
            isEstimating: 'isEstimating',
            //State Getters
            isNAT: 'isNAT',
            isVIC: 'isVIC',
            isQLD: 'isQLD',
            isNSW: 'isNSW',
            isTAS: 'isTAS',
            isACT: 'isACT',
            isSA: 'isSA',
            isWA: 'isWA',
            isNT: 'isNT',

            //Site Getters
            isGBG: 'isGBG',
            isCRN: 'isCRN',
            isKNP: 'isKNP',
            isTVL: 'isTVL',

            isNOW: 'isNOW',
            isNEW: 'isNEW',
            isSMT: 'isSMT',

            isELI: 'isELI',
            isLON: 'isLON',

            isLAU: 'isLAU',
            isMOO: 'isMOO',

            isQBN: 'isQBN',
            isBAY: 'isBAY',
            isSHP: 'isSHP',
            isWOD: 'isWOD',
            isBEN: 'isBEN',
            isBAL: 'isBAL',
            isCRG: 'isCRG',
            isGEL: 'isGEL',
            isWBL: 'isWBL',
            isTRA: 'isTRA',
            isMLD: 'isMLD',

            isPER: 'isPER'
        }),
  },

  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  }
};
</script>
