<template>
  <form :id="id">
    <div class="Input">
      <label for="institute">სასწავლებელი</label>
      <input type="text" name="institute" placeholder="სასწავლებელი"
        v-model="$store.state.mainData.educations[id - 1].institute" @input="Validation" />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div id="dblInput">
      <div class="Input">
        <label for="degree_id">ხარისხი</label>
        <select name="degree_id" v-model="$store.state.mainData.educations[id - 1].degree_id" @change="Validation">
          <option value="" disabled selected>აირჩიეთ ხარისხი</option>
          <option v-for="i in degrees" :key="i.id" :value="i.id">
            {{ i.title }}
          </option>
        </select>
      </div>

      <div class="Input">
        <label for="due_date">დამთავრების რიცხვი</label>
        <input type="date" name="due_date" v-model="$store.state.mainData.educations[id - 1].due_date"
          @input="Validation" />
      </div>
    </div>

    <div class="Input">
      <label for="description">აღწერა</label>
      <textarea name="description" placeholder="განათლების აღწერა"
        v-model="$store.state.mainData.educations[id - 1].description" @input="Validation"></textarea>
    </div>

    <hr />
  </form>
</template>

<script setup>
import { onUpdated, reactive, toRaw } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps(["id", "failedInput", "degrees"]);
const emit = defineEmits(['validatedObj']);

let validatedEducation = reactive({
  institute: null,
  degree_id: null,
  due_date: null,
  description: null,
})

function Validation(event) {
  let name = "";
  if (event.target) {
    event = event.target;
    name = event.name;
  } else {
    name = event.name;
  }
  switch (name) {
    case "institute":
      if (event.value.length >= 2) {
        event.previousSibling.classList.add("success");
        event.previousSibling.classList.remove("failed");
        validatedEducation[name] = true;
      } else {
        event.previousSibling.classList.add("failed");
        event.previousSibling.classList.remove("success");
        validatedEducation[name] = false;
        if (event.value.length == 0) {
          validatedEducation[name] = null;
        }
      }
      break;
    default:
      if (event.value.length == 0) {
        validatedEducation[name] = null;
        event.previousSibling.classList.add("failed");
        event.previousSibling.classList.remove("success");
      } else {
        validatedEducation[name] = true;
        event.previousSibling.classList.add("success");
        event.previousSibling.classList.remove("failed");
      }
      break;
  }
  emit("validatedObj", props.id - 1, validatedEducation);
  store.commit("saveLS");
}

if (localStorage.validatedEducation) {
  validatedEducation = JSON.parse(
    localStorage.getItem("validatedEducation")
  )[props.id - 1];
}

onUpdated(() => {
  if (props.failedInput) {
    Validation(props.failedInput);
  }
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem 0;
}

#dblInput {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.Input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  font-weight: bold;
}

input,
select {
  margin: 0.5rem 0;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid var(--lightblack);
}

span {
  font-size: small;
  color: var(--lightblack);
}

textarea {
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  resize: none;
  width: 100%;
  height: 6rem;
  border-radius: 0.5rem;
  border: 2px solid var(--lightblack);
}

hr {
  background-color: #c1c1c1;
}

.success {
  color: var(--offblack);
}

.success+textarea,
.success+input {
  border-color: var(--successgreen);
}

.success[for|="institute"]::after {
  position: absolute;
  content: url("../assets/images/checked.png");
  width: fit-content;
  height: fit-content;
  right: -25px;
  top: 40%;
}

.failed {
  color: var(--failedred);
}

.failed+textarea,
.failed+input {
  border-color: var(--failedred);
}

.failed[for|="institute"]::after {
  position: absolute;
  content: url("../assets/images/warning.png");
  width: fit-content;
  height: fit-content;
  right: 5px;
  top: 40%;
}
</style>