<template>
  <header>
    <router-link to="/home">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
          d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>
    </router-link>
    <div id="title">
      <h2 v-if="page == 1">პირადი ინფო</h2>
      <h2 v-else-if="page == 2">გამოცდილება</h2>
      <h2 v-else>განათლება</h2>
      <span>{{ page }}/3</span>
    </div>
    <hr />
  </header>
</template>

<script>
export default {
  props: ["page"],
};
</script>

<style scoped>
#title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--offblack);
}

svg {
  position: absolute;
  width: 1rem;
  left: 1rem;
}
</style>