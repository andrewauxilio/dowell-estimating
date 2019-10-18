import axios from "axios";

export default {
  state: {
    estimatorKPI: {},
    totalKPI: []
  },

  getters: {
    getGBGKPI(state) {
      return state.estimatorKPI;
    },
  },

  mutations: {
    SET_ESTIMATOR_KPI(state, estimatorKPI) {
      state.estimatorKPI = estimatorKPI;
    }
  },

  actions: {
    getGBGKPI(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/qld/kpi/gbg")
          .then(response => {
            const estimatorKPI = response

            context.commit("SET_ESTIMATOR_KPI", estimatorKPI);
            console.log(response);
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
  }
};
