<template>
  <div id="experience">
    <the-header page="2"></the-header>
    <main>
      <experience-form
        v-for="i in amountOfForm"
        :key="i"
        :id="i"
        :validatedExperience="checkValidatedExperience(i - 1)"
        :failedInput="failedInput"
        @data="getData"
        @validation="getValidation"
      ></experience-form>

      <button @click="addForm" id="more">მეტი გამოცდილების დამატება</button>

      <div id="buttons">
        <button @click="back">უკან</button>
        <button @click="next">შემდეგი</button>
      </div>
    </main>
  </div>
  <resume-component :experience="experienceData"></resume-component>
</template>

<script>
import ExperienceForm from "../components/ExperienceForm.vue";

export default {
  components: { ExperienceForm },
  data() {
    return {
      experienceData: {},
      validatedExperience: [],
      amountOfForm: 1,
      failedInput: {},
    };
  },

  methods: {
    addForm() {
      this.amountOfForm++;
    },
    getData(data) {
      this.experienceData = data;
    },
    getValidation(data) {
      this.validatedExperience[data.id] = data.validation;
      localStorage.setItem(
        "validatedExperience",
        JSON.stringify(this.validatedExperience)
      );
    },
    checkValidatedExperience(id) {
      if (this.validatedExperience[id]) {
        return this.validatedExperience[id];
      }
      return null;
    },
    back() {
      this.$router.replace({ path: "/PersonalInfo" });
    },
    next() {
      let remove = [];
      let next = true;
      this.validatedExperience.forEach((expObj, id) => {
        if (Object.values(expObj).includes(true) || Object.values(expObj).includes(false)) {
          for (let i in expObj) {
            if (expObj[i] != true) {
              this.failedInput = document.getElementsByName(i)[id];
              next = false;
              return
            }
          }
        } else {
          remove.push(id);
        }
      });
      if (next) {
        remove.forEach((id) => {
          let data = JSON.parse(localStorage.getItem("experienceData"));
          data.splice(id, 1);
          localStorage.setItem("experienceData", JSON.stringify(data));
        });
        this.$router.replace({ path: "/education" });
      }
    },
  },

  created() {
    if (localStorage.experienceData) {
      this.amountOfForm = JSON.parse(
        localStorage.getItem("experienceData")
      ).length;
    }
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