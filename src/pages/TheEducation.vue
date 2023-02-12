<template>
  <div id="education">
    <the-header page="3"></the-header>
    <main>
      <education-form
        v-for="i in amounOfForm"
        :id="i"
        :key="i"
        :degrees="degrees"
        :validatedEducation="checkValidatedEducation(i - 1)"
        :failedInput="failedInput"
        @data="getData"
        @validation="getValidation"
      ></education-form>

      <button @click="addForm" id="more">სხვა სასწავლებლის დამატება</button>

      <div id="buttons">
        <button @click="back">უკან</button>
        <button @click="next">დასრულება</button>
      </div>
    </main>
  </div>
  <resume-component :education="educationData"></resume-component>
</template>

<script>
import EducationForm from "../components/EducationForm.vue";

export default {
  components: { EducationForm },
  data() {
    return {
      amounOfForm: 1,
      degrees: [],
      educationData: {},
      validatedEducation: [],
      failedInput: {},
    };
  },
  methods: {
    addForm() {
      this.amounOfForm++;
    },
    getData(data) {
      this.educationData = data;
    },
    getValidation(data) {
      this.validatedEducation[data.id] = data.validation;
      localStorage.setItem(
        "validatedEducation",
        JSON.stringify(this.validatedEducation)
      );
    },
    checkValidatedEducation(id) {
      if (this.validatedEducation[id]) {
        return this.validatedEducation[id];
      }
      return null;
    },
    back() {
      this.$router.replace({ path: "/experience" });
    },
    next() {
      let remove = [];
      let next = true;
      this.validatedEducation.forEach((expObj, id) => {
        if (
          Object.values(expObj).includes(true) ||
          Object.values(expObj).includes(false) ||
          id == 0
        ) {
          for (let i in expObj) {
            if (expObj[i] != true) {
              this.failedInput = document.getElementsByName(i)[id];
              next = false;
              return;
            }
          }
        } else {
          remove.push(id);
        }
      });
      if (next) {
        remove.forEach((id) => {
          let data = JSON.parse(localStorage.getItem("educationData"));
          data.splice(id, 1);
          localStorage.setItem("educationData", JSON.stringify(data));
        });
        this.$router.replace({ path: "/Resume" });
      }
    },
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

  created() {
    if (localStorage.educationData) {
      this.amountOfForm = JSON.parse(
        localStorage.getItem("educationData")
      ).length;
    }
    if (localStorage.validatedEducation) {
      this.validatedEducation = JSON.parse(
        localStorage.getItem("validatedEducation")
      );
    } else {
      this.validatedEducation[0] = {
        institute: null,
        degree: null,
        due_date: null,
        description: null,
      };
      localStorage.setItem(
        "validatedEducation",
        JSON.stringify(this.validatedEducation)
      );
    }
  },
};
</script>

<style scoped>
#education {
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