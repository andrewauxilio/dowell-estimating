import axios from "axios";
import moment from "moment";

export default {
  state: {
    //Specific Estimator KPI Data
    GBGKPI: [],
    //Total Estimator KPI Data
    GBGKPITotal: [],
    //
    GBGLoaded: false
  },

  getters: {
    isGBGLoaded(state) {
      return state.GBGLoaded;
    },
    //Returns Specific Estimator Data
    getGBGKPI(state) {
      return state.GBGKPI;
    },
    //Returns Total Estimator Data
    getGBGKPITotal(state) {
      return state.GBGTotalKPI;
    }
  },

  mutations: {
    //Assign the specific estimator data into state
    SET_GBG_KPI(state, payload) {
      state.GBGKPI = payload;
    },
    //Assign the total estimator data into state
    SET_GBG_KPI_TOTAL(state, payload) {
      state.GBGKPITotal = payload;
    },
    //
    TOGGLE_GBG_LOAD(state) {
      state.GBGLoaded = !state.GBGLoaded;
    },
    //Remove all GBG state data
    REMOVE_GBG_DATA(state) {
      state.GBGKPI = [];
      state.GBGKPITotal = [];
    }
  },

  actions: {
    //Removes GBG Data
    removeGBGData(context) {
      context.commit("REMOVE_GBG_DATA");
    },

    TOGGLE_GBG_LOAD(context) {
      context.commit("TOGGLE_GBG_LOAD");
    },

    //Fetch Monthly Estimator KPI Data from API
    getGBGKPIMonth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      let endDate = moment();
      let startDate = moment()
        .subtract(30, "days")
        .calendar();

      return new Promise((resolve, reject) => {
        axios
          .post("/estimating/qld/kpi", {
            end: endDate,
            start: startDate,
            site: "GBG",
            grouped: 1
          })
          .then(response => {
            let data = response.data
            sessionStorage.setItem("gbg_kpi", data);
            context.commit("SET_GBG_KPI", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //Fetch Monthly Estimator Total KPI Data from API
    getGBGKPITotalMonth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      let endDate = moment();
      let startDate = moment()
        .subtract(30, "days")
        .calendar();

      return new Promise((resolve, reject) => {
        axios
          .post("/estimating/qld/kpi", {
            end: endDate,
            start: startDate,
            site: "GBG",
            grouped: 0
          })
          .then(response => {
            let data = response.data
            sessionStorage.setItem("gbg_total_kpi", data);
            context.commit("SET_GBG_KPI_TOTAL", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    }
  }
};
