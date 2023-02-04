<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
@font-face {
  font-family: HelveticaNeue;
  src: url("./assets/Fonts/HelveticaNeue.ttc") format("truetype");
  font-display: swap;
}

:root {
  --offblack: #1a1a1a;
  --lightblack: #bcbcbc;
  --whiteback: #f9f9f9;
  --titlecolor: #f93b1d;
  --successgreen: #98e37e;
  --failedred: #ef5050;
  --buttoncolor: #6b40e3;
  --buttonhover: #7949FF;
  --buttonclicked: #512FAF;
}

* {
  font-family: HelveticaNeue;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

hr {
  margin: 0.5rem 0;
  background-color: var(--offblack);
  height: 0.2rem;
}
</style>