<template>
  <form :id="id">
    <div class="Input">
      <label for="position">თანამდებობა</label>
      <input type="text" name="position" placeholder="დეველოპერი, დიზაინერი, ა.შ."
        v-model="$store.state.mainData.experiences[id - 1].position" @input="Validation" />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div class="Input">
      <label for="employer">დამსაქმებელი</label>
      <input type="text" name="employer" placeholder="დამსაქმებელი"
        v-model="$store.state.mainData.experiences[id - 1].employer" @input="Validation" />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div id="dates">
      <div class="Input">
        <label for="start_date">დაწყების რიცხვი</label>
        <input type="date" name="start_date" v-model="$store.state.mainData.experiences[id - 1].start_date"
          @input="Validation" />
      </div>
      <div class="Input">
        <label for="due_date">დამთავრების რიცხვი</label>
        <input type="date" name="due_date" v-model="$store.state.mainData.experiences[id - 1].due_date"
          @input="Validation" />
      </div>
    </div>

    <div class="Input">
      <label for="description">აღწერა</label>
      <textarea name="description" placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
        v-model="$store.state.mainData.experiences[id - 1].description" @input="Validation"></textarea>
    </div>

    <hr />
  </form>
</template>

<script setup>
import { onUpdated, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps(["id", "failedInput"]);
const emit = defineEmits(['validatedObj']);

let validatedExperience = reactive({
  position: null,
  employer: null,
  start_date: null,
  due_date: null,
  description: null,
});

function Validation(event) {
  let name = "";
  if (event.target) {
    event = event.target;
    name = event.name;
  } else {
    name = event.name;
  }
  switch (name) {
    case "position":
    case "employer":
      if (event.value.length >= 2) {
        event.previousSibling.classList.add("success");
        event.previousSibling.classList.remove("failed");
        validatedExperience[name] = true;
      } else {
        event.previousSibling.classList.add("failed");
        event.previousSibling.classList.remove("success");
        validatedExperience[name] = false;
        if (event.value.length == 0) {
          validatedExperience[name] = null;
        }
      }
      break;
    default:
      if (event.value.length == 0) {
        validatedExperience[name] = null;
        event.previousSibling.classList.add("failed");
        event.previousSibling.classList.remove("success");
      } else {
        validatedExperience[name] = true;
        event.previousSibling.classList.add("success");
        event.previousSibling.classList.remove("failed");
      }
      break;
  }
  store.commit("saveLS");
  emit("validatedObj", props.id - 1, validatedExperience);
}

if (localStorage.validatedExperience) {
  validatedExperience = JSON.parse(
    localStorage.getItem("validatedExperience")
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

#dates {
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

input {
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

.success[for|="position"]::after,
.success[for|="employer"]::after {
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

.failed[for|="position"]::after,
.failed[for|="employer"]::after {
  position: absolute;
  content: url("../assets/images/warning.png");
  width: fit-content;
  height: fit-content;
  right: 5px;
  top: 40%;
}
</style>