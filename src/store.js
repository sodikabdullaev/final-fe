import { reactive } from "vue";

export const store = reactive({
  isLoggedIn: false,
  isFormVisible: false,
  // isButtonVisible: false,
  comments: [],
  recentDocs: []
});
