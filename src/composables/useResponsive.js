import { ref, onMounted, onBeforeUnmount } from "vue";

export function useResponsive() {
  const isMobile = ref(window.innerWidth <= 768);
  const isSidebarOpen = ref(true);

  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
    if (isMobile.value) {
      isSidebarOpen.value = false;
    }
  };

  onMounted(() => window.addEventListener("resize", handleResize));
  onBeforeUnmount(() => window.removeEventListener("resize", handleResize));

  return { isMobile, isSidebarOpen };
}
