import axios from "axios";

export default {
  state: {
    //Specific Estimator KPI Data
    eliEstimatorKPI: [],
    //Total Estimator KPI Data
    eliTotalKPI: [],
    //Specific Estimator Data Loading Status
    eliEstKPILoaded: false,
    //Total Estimator Data Loading Status
    eliTotalKPILoaded: false 
  },

  getters: {
    //Returns Specific Estimator Data
    getELIKPI(state) {
      return state.eliEstimatorKPI;
    },
    //Returns Total Estimator Data
    getELIKPITotal(state) {
      return state.eliTotalKPI;
    },
    //Returns Total Specific Estimator Data Loading Status
    getELITotalKPIStatus(state) {
      return state.eliTotalKPILoaded;
    },
    //Returns Total Estimator Data Loading Status
    getELIKPIStatus(state) {
      return state.eliEstKPILoaded;
    },
  },

  mutations: {
    //Assign the specific estimator data into state
    SET_ELI_ESTIMATOR_KPI(state, payload) {
      state.eliEstimatorKPI = payload;
    },
    //Assign the total estimator data into state
    SET_ELI_ESTIMATOR_KPI_TOTAL(state, payload) {
      state.eliTotalKPI = payload;
    },
    //Remove all ELI state data
    REMOVE_ELI_DATA(state) {
      state.eliEstimatorKPI = [];
      state.eliTotalKPI = [];
      state.eliTotalKPILoaded = false;
      state.eliEstKPILoaded = false;
    },
    //Toggles the specific estimator loading status
    TOGGLE_ELI_EST_KPI_STATUS(state) {
      state.eliEstKPILoaded = !state.eliEstKPILoaded
    },
    //Toggles the total estimator loading status
    TOGGLE_ELI_KPI_TOTAL_STATUS(state) {
      state.eliTotalKPILoaded = !state.eliTotalKPILoaded
    }
  },

  actions: {
    //Removes ELI Data
    removeELIData(context) {
      context.commit("REMOVE_ELI_DATA");
    },
    //Toggles KPI Data Loading Status
    toggle_eli_est_KPI_status(context) {
      context.commit("TOGGLE_ELI_EST_KPI_STATUS")
    },
    //Toggles Total KPI Data Loading Status
    toggle_eli_total_KPI_status(context) {
      context.commit("TOGGLE_ELI_KPI_TOTAL_STATUS")
    },
    //Fetch Monthly Estimator KPI Data from API
    getELIKPIMonth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/sa/kpi/eli-month")
          .then(response => {
            context.commit("SET_ELI_ESTIMATOR_KPI", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
      });
    },
    //Fetch Monthly Estimator Total KPI Data from API
    getELIKPITotalMonth(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/sa/kpi/eli-total-month")
          .then(response => {
            context.commit("SET_ELI_ESTIMATOR_KPI_TOTAL", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
      });
    },
    //Fetch Monthly Estimator KPI Data from API
    getELIKPIWeek(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/sa/kpi/eli-week")
          .then(response => {
            context.commit("SET_ELI_ESTIMATOR_KPI", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          })
      });
    },
    //Fetch Weekly Estimator Total KPI Data from API
    getELIKPITotalWeek(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/estimating/sa/kpi/eli-total-week")
          .then(response => {
            context.commit("SET_ELI_ESTIMATOR_KPI_TOTAL", response.data);
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
