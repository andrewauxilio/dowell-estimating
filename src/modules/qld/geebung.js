import axios from "axios";

export default {
  state: {
    //Data 
    gbgEstimatorKPI: [],
    gbgTotalKPI: [],

    gbgEstKPILoad: false,
    gbgTotalKPILoad: false 
  },

  getters: {
    getGBGKPI(state) {
      return state.gbgEstimatorKPI;
    },
    getGBGKPITotal(state) {
      return state.gbgTotalKPI;
    },
    getTotalKPILoad(state) {
      return state.gbgTotalKPILoad;
    },
    getKPILoad(state) {
      return state.gbgEstKPILoad;
    },
  },

  mutations: {
    SET_GBG_ESTIMATOR_KPI(state, payload) {
      state.gbgEstimatorKPI = payload;
    },
    SET_GBG_ESTIMATOR_KPI_TOTAL(state, payload) {
      state.gbgTotalKPI = payload;
    },
    REMOVE_GBG_DATA(state) {
      state.gbgEstimatorKPI = [];
      state.gbgTotalKPI = [];
      state.gbgTotalKPILoad = false;
      state.gbgEstKPILoad = false;
    },
    TOGGLE_GBG_EST_KPI_LOAD(state) {
      state.gbgEstKPILoad = !state.gbgEstKPILoad
    },
    TOGGLE_GBG_KPI_TOTAL_LOAD(state) {
      state.gbgTotalKPILoad = !state.gbgTotalKPILoad
    }
  },

  actions: {
    removeGBGData(context) {
      context.commit("REMOVE_GBG_DATA");
    },

    toggle_gbg_est_KPI(context) {
      context.commit("TOGGLE_GBG_EST_KPI_LOAD")
    },

    toggle_gbg_total_KPI(context) {
      context.commit("TOGGLE_GBG_KPI_TOTAL_LOAD")
    },

    getGBGKPIMonth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/qld/kpi/gbg-month")
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

    getGBGKPITotalMonth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/qld/kpi/gbg-total-month")
          .then(response => {
            context.commit("SET_GBG_ESTIMATOR_KPI_TOTAL", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
      });
    },

    getGBGKPIWeek(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/qld/kpi/gbg-week")
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

    getGBGKPITotalWeek(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/qld/kpi/gbg-total-week")
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
