<template>
  <div id="education">
    <the-header page="3"></the-header>
    <main>
      <EducationForm v-for="i in amountOfForm" :key="i" :id="i" :failedInput="failedInput" @validatedObj="getValidation"
        :degrees="degrees" />

      <button @click="addForm" id="more">სხვა სასწავლებლის დამატება</button>

      <div id="buttons">
        <button @click="back">უკან</button>
        <button @click="next">დასრულება</button>
      </div>
    </main>
  </div>
  <ResumeComponent :degrees="degrees" />
</template>

<script setup>
import { onMounted, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import EducationForm from "../components/EducationForm.vue";

const store = useStore();
const router = useRouter();

let validatedEducation = [];
const amountOfForm = ref(1);
const failedInput = ref(null);
const degrees = ref([]);

function addForm() {
  amountOfForm.value++;
  store.commit({
    type: "addObj",
    field: "educations",
    obj: {
      institute: null,
      degree_id: null,
      due_date: null,
      description: null,
    },
  });
  getValidation(amountOfForm.value - 1, {
    institute: null,
    degree_id: null,
    due_date: null,
    description: null,
  });
}

function getValidation(id, validatedEducationObj) {
  validatedEducation[id] = validatedEducationObj;
  localStorage.setItem(
    "validatedEducation",
    JSON.stringify(validatedEducation)
  );
}

function back() {
  router.replace({ path: "/Experience" });
}

function next() {
  let next = true;
  validatedEducation.forEach((eduObj, id) => {
    if (
      Object.values(eduObj).includes(true) ||
      Object.values(eduObj).includes(false) ||
      id == 0
    ) {
      for (let i in eduObj) {
        if (eduObj[i] != true) {
          failedInput.value = document.getElementsByName(i)[id];
          next = false;
        }
      }
    }
    if (next) {
      router.replace({ path: "/Resume" });
    }
  });
}

fetch("https://redberry-resume-default-rtdb.firebaseio.com/degrees.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    degrees.value = data;
    // console.log(Object(degrees.value.target).keys)
  });

  
onMounted(() => {
  amountOfForm.value = store.state.mainData.educations.length;

  if (localStorage.validatedEducation) {
    validatedEducation = JSON.parse(
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
})
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