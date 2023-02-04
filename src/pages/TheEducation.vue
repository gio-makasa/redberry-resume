<template>
  <div id="experience">
    <the-header page=3></the-header>
    <main>
      <education-form v-for="i in amounOfForm" :key="i"></education-form>

      <button @click="addForm" id="more">სხვა სასწავლებლის დამატება</button>

      <div id="buttons">
        <router-link to="/Experience">უკან</router-link>
        <router-link to="/Resume">დასრულება</router-link>
      </div>
    </main>
  </div>
  <resume-component></resume-component>
</template>

<script>
import EducationForm from "../components/EducationForm.vue";

export default {
  components: { EducationForm },
  data() {
    return {
      amounOfForm: 1,
    };
  },
  methods: {
    addForm() {
      this.amounOfForm++;
    },
  },
};
</script>

<style scoped>
#experience {
  background-color: var(--whiteback);
  width: 50%;
  float: left;
  padding: 2rem 4rem;
}

#more {
  background-color: #62a1eb;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 6rem;
}

a {
  background-color: #6b40e3;
  color: white;
  border-radius: 4px;
  padding: 0.8rem 2.2rem;
  text-decoration: none;
}
</style>