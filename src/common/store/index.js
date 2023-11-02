import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
      acccessToken: null,
    }
  },
  mutations: {
    setUser(state, user) {
      state.acccessToken = user.access_token;
      state.user = JSON.parse(user.profile.attributes.tlwUser);
      let grade = state.user.organizationGrade;
      if (grade == '市局') {
        state.user.grade = 1;
      } else if (grade == '县局') {
        state.user.grade = 2;
      } else if (grade == '镇局') {
        state.user.grade = 3;
      }
    },
    removeUser(state) {
      state.user = null;
      state.acccessToken = null;
      localStorage.clear();
      sessionStorage.clear();
    },
  },
  getters: {
  },
  actions: {
  }
})

export default store