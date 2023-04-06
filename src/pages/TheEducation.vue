<template>
  <div id="education">
    <the-header page="3"></the-header>
    <main>
      <EducationForm
        v-for="i in amountOfForm"
        :key="i"
        :id="i"
        :failedInput="failedInput"
        @validatedObj="getValidation"
        :degrees="degrees"
      />

      <button @click="addForm" id="more">სხვა სასწავლებლის დამატება</button>

      <div id="buttons">
        <button @click="back">უკან</button>
        <button @click="next">დასრულება</button>
      </div>
    </main>
  </div>
  <ResumeComponent :degrees="degrees" />
</template>

<script>
import EducationForm from "../components/EducationForm.vue";

export default {
  components: { EducationForm },
  data() {
    return {
      validatedEducation: [],
      amountOfForm: 1,
      failedInput: null,
      degrees: [],
    };
  },
  methods: {
    addForm() {
      this.amountOfForm++;
      this.$store.commit({
        type: "addObj",
        field: "educations",
        obj: {
          institute: null,
          degree_id: null,
          due_date: null,
          description: null,
        },
      });
      this.getValidation(this.amountOfForm - 1, {
        institute: null,
        degree_id: null,
        due_date: null,
        description: null,
      });
    },
    getValidation(id, validatedEducationObj) {
      this.validatedEducation[id] = validatedEducationObj;
      localStorage.setItem(
        "validatedEducation",
        JSON.stringify(this.validatedEducation)
      );
    },
    back() {
      this.$router.replace({ path: "/Experience" });
    },
    next() {
      let next = true;
      this.validatedEducation.forEach((eduObj, id) => {
        if (
          Object.values(eduObj).includes(true) ||
          Object.values(eduObj).includes(false) ||
          id == 0
        ) {
          for (let i in eduObj) {
            if (eduObj[i] != true) {
              this.failedInput = document.getElementsByName(i)[id];
              next = false;
            }
          }
        }
        if (next) {
          this.$router.replace({ path: "/Resume" });
        }
      });
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

  mounted() {
    this.amountOfForm = this.$store.state.mainData.educations.length;

    if (localStorage.validatedEducation) {
      this.validatedEducation = JSON.parse(
        localStorage.getItem("validatedEducation")
      );
    } else {
      localStorage.setItem(
        "validatedEducation",
        JSON.stringify([
          {
            institute: null,
            degree_id: null,
            due_date: null,
            description: null,
          },
        ])
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