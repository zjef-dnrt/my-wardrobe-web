
export default defineNuxtRouteMiddleware((to, _) => {
  if (to.path !== "/") return

  const user = useSupabaseUser();
  if (!user.value) {
    return navigateTo("/login");
  } else {
    return navigateTo("/wardrobe");
  }
});