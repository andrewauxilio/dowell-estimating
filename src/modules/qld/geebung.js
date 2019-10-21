import axios from "axios";

export default {
  state: {
    gbgEstimatorKPI: [],
    gbgTotalKPI: [],
    gbgLoaded: false,
  },

  getters: {
    getGBGKPI(state) {
      return state.gbgEstimatorKPI;
    },
    getGBGKPITotal(state) {
      return state.gbgTotalKPI;
    },
    gbgLoaded(state) {
      return state.gbgLoaded;
    },
  },

  mutations: {
    SET_GBG_ESTIMATOR_KPI(state, payload) {
      state.gbgEstimatorKPI = payload;
    },
    SET_GBG_ESTIMATOR_KPI_TOTAL(state, payload) {
      state.gbgTotalKPI = payload;
      state.gbgLoaded = true;
    },
    REMOVE_GBG_DATA(state) {
      state.gbgEstimatorKPI = [];
      state.gbgTotalKPI = [];
      state.gbgLoaded = false;
    },
  },

  actions: {
    removeGBGData(context) {
      context.commit("REMOVE_GBG_DATA");
    },

    getGBGKPI(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/qld/kpi/gbg")
          .then(response => {
            context.commit("SET_GBG_ESTIMATOR_KPI", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
      });
    },

    getGBGKPITotal(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/qld/kpi/gbg-total")
          .then(response => {
            context.commit("SET_GBG_ESTIMATOR_KPI_TOTAL", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
      });
    }
  },

};
