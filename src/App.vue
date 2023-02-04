<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
@font-face {
  font-family: HelveticaNeue;
  src: url("./assets/Fonts/HelveticaNeue.ttc");
}

:root{
  --offblack: #1A1A1A;
  --lightblack: #BCBCBC;
  --whiteback: #F9F9F9;
  --titlecolor: #F93B1D;
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