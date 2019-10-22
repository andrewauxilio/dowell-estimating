import axios from "axios";

export default {
  state: {
    token: sessionStorage.getItem("access_token") || null,
    apps: [],
    roles: [],
    states: [],
    sites: []
  },

  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },

    /**---------------------------------------
     *** Apps
     ***---------------------------------------
     **/
    isEstimating(state) {
      const apps = state.apps;
      return apps.includes("estimating") ? true : false;
    },

    /**---------------------------------------
     *** User Roles Getters
     ***---------------------------------------
     **/
    isManager(state) {
      const roles = state.roles;
      return roles.includes("manager") ? true : false;
    },
    isUser(state) {
      const roles = state.roles;
      return roles.includes("user") ? true : false;
    },

    /**---------------------------------------
     *** User States Getters
     ***---------------------------------------
     **/
    isNAT(state) {
      const states = state.states;
      return states.includes("nat") ? true : false;
    },
    isVIC(state) {
      const states = state.states;
      return states.includes("vic") ? true : false;
    },
    isQLD(state) {
      const states = state.states;
      return states.includes("qld") ? true : false;
    },
    isNSW(state) {
      const states = state.states;
      return states.includes("nsw") ? true : false;
    },
    isTAS(state) {
      const states = state.states;
      return states.includes("tas") ? true : false;
    },
    isACT(state) {
      const states = state.states;
      return states.includes("act") ? true : false;
    },
    isSA(state) {
      const states = state.states;
      return states.includes("sa") ? true : false;
    },
    isWA(state) {
      const states = state.states;
      return states.includes("wa") ? true : false;
    },
    isNT(state) {
      const states = state.states;
      return states.includes("nt") ? true : false;
    },

    /**---------------------------------------
     *** User Sites Getters
     ***---------------------------------------
     **/
    // Queensland
    isGBG(state) {
      const sites = state.sites;
      return sites.includes("gbg") ? true : false;
    },

    //Western Australia
    isWA(state) {
      const sites = state.sites;
      return sites.includes("per") ? true : false;
    },

    //Australian Capital Territory
    isQBN(state) {
      const sites = state.sites;
      return sites.includes("qbn") ? true : false;
    },

    //Tasmania
    isHOB(state) {
      const sites = state.sites;
      return sites.includes("hob") ? true : false;
    },

    // New South Wales
    isNOW(state) {
      const sites = state.sites;
      return sites.includes("now") ? true : false;
    },
    isNEW(state) {
      const sites = state.sites;
      return sites.includes("new") ? true : false;
    },
    isSMT(state) {
      const sites = state.sites;
      return sites.includes("smt") ? true : false;
    },

    //South Australia
    isELI(state) {
      const sites = state.sites;
      return sites.includes("eli") ? true : false;
    },
    isLON(state) {
      const sites = state.sites;
      return sites.includes("lon") ? true : false;
    },
    isEDI(state) {
      const sites = state.sites;
      return sites.includes("edi") ? true : false;
    },

    //Victoria
    isBAY(state) {
      const sites = state.sites;
      return sites.includes("bay") ? true : false;
    },
    isSHP(state) {
      const sites = state.sites;
      return sites.includes("shp") ? true : false;
    },
    isWOD(state) {
      const sites = state.sites;
      return sites.includes("wod") ? true : false;
    },
    isBEN(state) {
      const sites = state.sites;
      return sites.includes("ben") ? true : false;
    },
    isBAL(state) {
      const sites = state.sites;
      return sites.includes("bal") ? true : false;
    },
    isEPP(state) {
      const sites = state.sites;
      return sites.includes("epp") ? true : false;
    },
    isGEE(state) {
      const sites = state.sites;
      return sites.includes("gee") ? true : false;
    },
    isWAR(state) {
      const sites = state.sites;
      return sites.includes("war") ? true : false;
    },
    isTRA(state) {
      const sites = state.sites;
      return sites.includes("tra") ? true : false;
    }
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    REMOVE_TOKEN(state) {
      state.token = null;
    },
    SET_APPS(state, payload) {
      state.apps = payload;
    },
    SET_ROLES(state, payload) {
      state.roles = payload;
    },
    SET_STATES(state, payload) {
      state.states = payload;
    },
    SET_SITES(state, payload) {
      state.sites = payload;
    },
    REMOVE_APPS(state) {
      state.apps = [];
    },
    REMOVE_ROLES(state) {
      state.roles = [];
    },
    REMOVE_STATES(state) {
      state.states = [];
    },
    REMOVE_SITES(state) {
      state.sites = [];
    }
  },

  actions: {
    /**-------------------------------------------------------------------
     ***                   Retrieve User Details
     ***-------------------------------------------------------------------
     *** Function: Once the user logs in, this is  executed and the user
     *** apps, roles, states and sites will be stored in state as an array
     ***------------------------------------------------------------------
     **/
    getUserDetails(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/me")
          .then(response => {
            //Store objects and initialize array
            const _apps = response.data.apps;
            const apps = [];
            const _roles = response.data.roles;
            const roles = [];
            const _states = response.data.states;
            const states = [];
            const _sites = response.data.sites;
            const sites = [];

            //Loop array of objects and push to array
            _apps.forEach(el => {
              apps.push(el.app);
              //console.log(el.app)
            });
            _roles.forEach(el => {
              roles.push(el.role);
              //console.log(el.role)
            });
            _states.forEach(el => {
              states.push(el.state);
              //console.log(el.state)
            });
            _sites.forEach(el => {
              sites.push(el.site);
              //console.log(el.site)
            });

            //Save each array in state
            context.commit("SET_APPS", apps);
            context.commit("SET_ROLES", roles);
            context.commit("SET_STATES", states);
            context.commit("SET_SITES", sites);

            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    /**-------------------------------------------------------------------
     ***                   Retrieve User Details
     ***-------------------------------------------------------------------
     *** Function: The login function. This retrieves a token for the user
     *** and saves it into state and sessionStorage
     ***------------------------------------------------------------------
     **/
    getToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/login", {
            email: credentials.email,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.access_token;
            sessionStorage.setItem("access_token", token);
            context.commit("SET_TOKEN", token);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },

    /**-------------------------------------------------------------------
     ***                    Destroy User Token
     ***-------------------------------------------------------------------
     *** Function: The logout function. This destroys the token for the
     *** user and their user details
     ***-------------------------------------------------------------------
     **/
    removeUserDetails(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post("/auth/logout")
            .then(response => {
              sessionStorage.removeItem("access_token");
              context.commit("REMOVE_TOKEN");
              context.commit("REMOVE_APPS");
              context.commit("REMOVE_ROLES");
              context.commit("REMOVE_STATES");
              context.commit("REMOVE_SITES");
              resolve(response);
            })
            .catch(error => {
              sessionStorage.removeItem("access_token");
              context.commit("REMOVE_TOKEN");
              context.commit("REMOVE_APPS");
              context.commit("REMOVE_ROLES");
              context.commit("REMOVE_STATES");
              context.commit("REMOVE_SITES");
              reject(error);
            });
        });
      }
    },

    removeUserDetails2(context) {
      sessionStorage.removeItem("access_token");
      context.commit("REMOVE_TOKEN");
      context.commit("REMOVE_APPS");
      context.commit("REMOVE_ROLES");
      context.commit("REMOVE_STATES");
      context.commit("REMOVE_SITES");
    }
  }
};
