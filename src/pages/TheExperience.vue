<template>
  <div id="experience">
    <the-header page="2"></the-header>
    <main>
      <ExperienceForm
        v-for="i in amountOfForm"
        :key="i"
        :id="i"
        :failedInput="failedInput"
        @validatedObj="getValidation"
      />

      <button @click="addForm" id="more">მეტი გამოცდილების დამატება</button>

      <div id="buttons">
        <button @click="back">უკან</button>
        <button @click="next">შემდეგი</button>
      </div>
    </main>
  </div>
  <ResumeComponent />
</template>

<script>
import ExperienceForm from "../components/ExperienceForm.vue";

export default {
  components: { ExperienceForm },
  data() {
    return {
      validatedExperience: [],
      amountOfForm: 1,
      failedInput: null,
    };
  },

  methods: {
    addForm() {
      this.amountOfForm++;
      this.$store.state.mainData.experiences[this.id - 1] = {
        position: null,
        employer: null,
        start_date: null,
        due_date: null,
        description: null,
      };
    },
    getValidation(id, validatedExperienceObj) {
      this.validatedExperience[id] = validatedExperienceObj;
      localStorage.setItem(
        "validatedExperience",
        JSON.stringify(this.validatedExperience)
      );
    },
    back() {
      this.$router.replace({ path: "/PersonalInfo" });
    },
    next() {
      this.validatedExperience.forEach((expObj, id) => {
        if (
          Object.values(expObj).includes(true) ||
          Object.values(expObj).includes(false) ||
          id == 0
        ) {
          for (let i in expObj) {
            if (expObj[i] != true) {
              this.failedInput = document.getElementsByName(i)[id];
              return;
            }
          }
        }
        this.$router.replace({ path: "/education" });
      });
    },
  },

  mounted() {
    this.amountOfForm = this.$store.state.mainData.experiences.length;

    if (localStorage.validatedExperience) {
      this.validatedExperience = JSON.parse(
        localStorage.getItem("validatedExperience")
      );
    }
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

button {
  background-color: #6b40e3;
  color: white;
  border-radius: 4px;
  border: none;
  padding: 0.8rem 2.2rem;
  cursor: pointer;
}
</style>