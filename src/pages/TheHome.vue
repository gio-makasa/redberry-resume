<template>
  <main>
    <img src="../assets/images/redberry.png" alt="redberry" />
    <hr />
    <router-link to="/PersonalInfo">რეზიუმეს დამატება</router-link>
  </main>
</template>

<script>
export default {
  mounted() {
    localStorage.clear();
  },
};
</script>

<style scoped>
main {
  background-image: url("../assets/images/background.png");
  background-size: cover;
  height: 100vh;
  padding: 2rem 4rem;
}

a {
  position: absolute;
  text-decoration: none;
  background-color: var(--offblack);
  color: white;
  font-weight: bold;
  padding: 0.5rem 5rem;
  border-radius: 0.4rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

a::after {
  position: absolute;
  content: url("../assets/images/circleLOGO.png");
  top: -3rem;
  left: 12rem;
  pointer-events: none;
}
</style>