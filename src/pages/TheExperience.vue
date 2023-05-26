<template>
  <div id="experience">
    <the-header page="2"></the-header>
    <main>
      <ExperienceForm v-for="i in amountOfForm" :key="i" :id="i" :failedInput="failedInput"
        @validatedObj="getValidation" />

      <button @click="addForm" id="more">მეტი გამოცდილების დამატება</button>

      <div id="buttons">
        <button @click="back">უკან</button>
        <button @click="next">შემდეგი</button>
      </div>
    </main>
  </div>
  <ResumeComponent />
</template>

<script setup>
import { onMounted, ref, toRaw } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ExperienceForm from "../components/ExperienceForm.vue";

const store = useStore();
const router = useRouter();

let validatedExperience = [];
const amountOfForm = ref(1);
const failedInput = ref(null);


function addForm() {
  amountOfForm.value++;
  store.commit({
    type: "addObj",
    field: "experiences",
    obj: {
      position: null,
      employer: null,
      start_date: null,
      due_date: null,
      description: null,
    },
  });
  getValidation(amountOfForm.value - 1, {
    position: null,
    employer: null,
    start_date: null,
    due_date: null,
    description: null,
  });
}

function getValidation(id, validatedExperienceObj) {
  validatedExperience[id] = validatedExperienceObj;
  localStorage.setItem(
    "validatedExperience",
    JSON.stringify(validatedExperience)
  );
}

function back() {
  router.replace({ path: "/PersonalInfo" });
}

function next() {
  let next = true;
  validatedExperience.forEach((expObj, id) => {
    if (
      Object.values(expObj).includes(true) ||
      Object.values(expObj).includes(false) ||
      id == 0
    ) {
      for (let i in expObj) {
        if (expObj[i] != true) {
          failedInput.value = document.getElementsByName(i)[id];
          next = false;
        }
      }
    }
  });
  if (next) {
    router.replace({ path: "/education" });
  }
}

onMounted(() => {
  amountOfForm.value = store.state.mainData.experiences.length;

  if (localStorage.validatedExperience) {
    validatedExperience = JSON.parse(
      localStorage.getItem("validatedExperience")
    );
  } else {
    localStorage.setItem(
      "validatedExperience",
      JSON.stringify([
        {
          position: null,
          employer: null,
          start_date: null,
          due_date: null,
          description: null,
        },
      ])
    );
  }
})
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