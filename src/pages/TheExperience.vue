<template>
  <div id="experience">
    <the-header page=2></the-header>
    <main>
      <experience-form v-for="i in amounOfForm" :key="i"></experience-form>

      <button @click="addForm" id="more">მეტი გამოცდილების დამატება</button>

      <div id="buttons">
        <router-link to="/PersonalInfo">უკან</router-link>
        <router-link to="/Education">შემდეგი</router-link>
      </div>
    </main>
  </div>
  <resume-component></resume-component>
</template>

<script>
import ExperienceForm from "../components/ExperienceForm.vue";

export default {
  components: { ExperienceForm },
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