import moment from "moment";

export default {
  state: {
    start_date: "",
    end_date: ""
  },

  getters: {
    getStartDate(state) {
        return state.start_date;
    },
    getEndDate(state) {
        return state.end_date;
    }
  },

  mutations: {
    SET_START_DATE(state, payload) {
      state.start_date = payload;
      },
    SET_END_DATE(state, payload) {
      state.end_date = payload;
    },
  },

  actions: {
    getDates(context) {
        let end = moment().format("YYYYMMDD");
        let start = moment().format("YYYYMMDD");
        //let start = moment().subtract(30, 'days').format("YYYYMMDD");
        context.commit("SET_START_DATE", start);
        context.commit("SET_END_DATE", end);
    }
  }
};
