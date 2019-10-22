import axios from "axios";

export default {
  state: {
    //Specific Estimator KPI Data
    gbgEstimatorKPI: [],
    //Total Estimator KPI Data
    gbgTotalKPI: [],
    //Specific Estimator Data Loading Status
    gbgEstKPILoaded: false,
    //Total Estimator Data Loading Status
    gbgTotalKPILoaded: false 
  },

  getters: {
    //Returns Specific Estimator Data
    getGBGKPI(state) {
      return state.gbgEstimatorKPI;
    },
    //Returns Total Estimator Data
    getGBGKPITotal(state) {
      return state.gbgTotalKPI;
    },
    //Returns Total Specific Estimator Data Loading Status
    getTotalKPIStatus(state) {
      return state.gbgTotalKPILoaded;
    },
    //Returns Total Estimator Data Loading Status
    getKPIStatus(state) {
      return state.gbgEstKPILoaded;
    },
  },

  mutations: {
    //Assign the specific estimator data into state
    SET_GBG_ESTIMATOR_KPI(state, payload) {
      state.gbgEstimatorKPI = payload;
    },
    //Assign the total estimator data into state
    SET_GBG_ESTIMATOR_KPI_TOTAL(state, payload) {
      state.gbgTotalKPI = payload;
    },
    //Remove all GBG state data
    REMOVE_GBG_DATA(state) {
      state.gbgEstimatorKPI = [];
      state.gbgTotalKPI = [];
      state.gbgTotalKPILoaded = false;
      state.gbgEstKPILoaded = false;
    },
    //Toggles the specific estimator loading status
    TOGGLE_GBG_EST_KPI_STATUS(state) {
      state.gbgEstKPILoaded = !state.gbgEstKPILoaded
    },
    //Toggles the total estimator loading status
    TOGGLE_GBG_KPI_TOTAL_STATUS(state) {
      state.gbgTotalKPILoaded = !state.gbgTotalKPILoaded
    }
  },

  actions: {
    //Removes GBG Data
    removeGBGData(context) {
      context.commit("REMOVE_GBG_DATA");
    },
    //Toggles KPI Data Loading Status
    toggle_gbg_est_KPI_status(context) {
      context.commit("TOGGLE_GBG_EST_KPI_STATUS")
    },
    //Toggles Total KPI Data Loading Status
    toggle_gbg_total_KPI_status(context) {
      context.commit("TOGGLE_GBG_KPI_TOTAL_STATUS")
    },
    //Fetch Monthly Estimator KPI Data from API
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
    //Fetch Monthly Estimator Total KPI Data from API
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
    //Fetch Monthly Estimator KPI Data from API
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
    //Fetch Weekly Estimator Total KPI Data from API
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
