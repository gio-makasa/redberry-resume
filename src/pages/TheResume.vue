<template>
  <router-link to="/home">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path
        d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
      />
    </svg>
  </router-link>
  <SuccessBox />
  <ResumeComponent :send="true" :degrees="degrees" />
</template>

<script>
import SuccessBox from "../components/SuccessBox.vue";
export default {
  components: { SuccessBox },
  data() {
    return {
      degrees: [],
    };
  },
  beforeCreate() {
    fetch("https://resume.redberryinternship.ge/api/degrees")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.degrees = data;
      });
  },
};
</script>

<style scoped>
#resume {
  left: -50%;
  max-width: 40%;
  transform: translateX(50%);
  border: 1px solid black;
  margin: 0.5rem 0;
}

svg {
  position: absolute;
  width: 1rem;
  top: 1rem;
  left: 1rem;
}
</style>