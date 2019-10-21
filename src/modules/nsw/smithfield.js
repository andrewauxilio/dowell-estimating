import axios from "axios";

export default {
  state: {
    smtEstimatorKPI: [],
    smtTotalKPI: [],
    smtLoaded: false,
  },

  getters: {
    getSMTKPI(state) {
      return state.smtEstimatorKPI;
    },
    getSMTKPITotal(state) {
      return state.smtTotalKPI;
    },
    smtLoaded(state) {
      return state.smtLoaded;
    },
  },

  mutations: {
    SET_SMT_ESTIMATOR_KPI(state, payload, payload2) {
      state.smtEstimatorKPI = payload;
      state.smtTotalKPI = payload2;
      state.smtLoaded = true;
    },
    // SET_SMT_ESTIMATOR_KPI_TOTAL(state, payload) {
    //   state.smtTotalKPI = payload;
    //   state.smtLoaded = true;
    // },
    REMOVE_SMT_DATA(state) {
      state.smtEstimatorKPI = [];
      state.smtTotalKPI = [];
      state.smtLoaded = false;
    },
  },

  actions: {
    removeSMTData(context) {
      context.commit("REMOVE_SMT_DATA");
    },
    getSMTKPIData(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      let _smtEstimatorKPI = []
      let _smtTotalKPI = []

      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/nsw/kpi/smt")
          .then(response => {
            _smtEstimatorKPI = response.data
            context.commit('SET_SMT_ESTIMATOR_KPI', _smtEstimatorKPI, _smtTotalKPI)
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })

          axios
          .get("/estimating/nsw/kpi/smt-total")
          .then(response => {
            _smtTotalKPI = response.data
            context.commit('SET_SMT_ESTIMATOR_KPI', _smtEstimatorKPI, _smtTotalKPI)
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })

          
      });
      context.commit('SET_SMT_ESTIMATOR_KPI', _smtEstimatorKPI, _smtTotalKPI)
    },
  },

};
