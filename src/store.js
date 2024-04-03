import { reactive } from "vue";

export const store = reactive({
  isLoggedIn: false,
  isFormVisible: false,
  documentExists: false,
  comments: [],
});
