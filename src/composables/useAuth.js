import { ref } from "vue";

export function useAuth() {
  const user = ref(null);

  const login = (userData) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  const loadUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) user.value = JSON.parse(savedUser);
  };

  return { user, login, logout, loadUser };
}