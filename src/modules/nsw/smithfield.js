import axios from "axios";

export default {
  state: {
    smtEstimatorKPI: [],
    smtTotalKPI: [],

    smtEKLoaded: false,
    smtEKTLoaded: false,
  },

  getters: {
    getSMTKPI(state) {
      return state.smtEstimatorKPI;
    },
    getSMTKPITotal(state) {
      return state.smtTotalKPI;
    },
    smtEKLoaded(state) {
      return state.smtEKLoaded;
    },
    smtEKTLoaded(state) {
      return state.smtEKTLoaded;
    },
  },

  mutations: {
    SET_SMT_ESTIMATOR_KPI(state, payload) {
      state.smtEstimatorKPI = payload;
      state.smtEKLoaded = true;
    },
    SET_SMT_ESTIMATOR_KPI_TOTAL(state, payload) {
      state.smtTotalKPI = payload;
      state.smtEKTLoaded = true;
    },
    REMOVE_SMT_DATA(state) {
      state.smtEstimatorKPI = [];
      state.smtTotalKPI = [];
      state.smtEKLoaded = false;
      state.smtEKTLoaded = false; 
    },
  },

  actions: {
    removeSMTData(context) {
      context.commit("REMOVE_SMT_DATA");
    },
    getSMTKPI(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/nsw/kpi/smt")
          .then(response => {
            context.commit("SET_SMT_ESTIMATOR_KPI", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    getSMTKPITotal(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/nsw/kpi/smt-total")
          .then(response => {
            context.commit("SET_SMT_ESTIMATOR_KPI_TOTAL", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  },

};
