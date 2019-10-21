import axios from "axios";

export default {
  state: {
    //Data 
    gbgEstimatorKPI: [],
    gbgTotalKPI: [],

    //Check if data is loaded
    gbgEKLoaded: false,
    gbgEKTLoaded: false,
  },

  getters: {
    getGBGKPI(state) {
      return state.gbgEstimatorKPI;
    },
    getGBGKPITotal(state) {
      return state.gbgTotalKPI;
    },
    gbgEKLoaded(state) {
      return state.gbgEKLoaded;
    },
    gbgEKTLoaded(state) {
      return state.gbgEKTLoaded;
    },
  },

  mutations: {
    SET_GBG_ESTIMATOR_KPI(state, payload) {
      state.gbgEstimatorKPI = payload;
      state.gbgEKLoaded = true;
    },
    SET_GBG_ESTIMATOR_KPI_TOTAL(state, payload) {
      state.gbgTotalKPI = payload;
      state.gbgEKTLoaded = true;
    },
    REMOVE_GBG_DATA(state) {
      state.gbgEstimatorKPI = [];
      state.gbgTotalKPI = [];
      state.gbgEKLoaded = false;
      state.gbgEKTLoaded = false;
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
