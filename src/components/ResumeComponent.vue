<template>
  <div id="resume">
    <img v-if="$store.getters.imgURL != null" id="profile" :src="$store.getters.imgURL" alt="profilePhoto" />

    <h2 id="name">
      {{ $store.state.mainData.name }} {{ $store.state.mainData.surname }}
    </h2>

    <div v-if="$store.state.mainData.email" class="contact" id="email">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z" />
      </svg>
      <span>{{ $store.state.mainData.email }}</span>
    </div>

    <div v-if="$store.state.mainData.phone_number" class="contact" id="mobile">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
      </svg>
      <span>{{ $store.state.mainData.phone_number }}</span>
    </div>

    <div v-if="$store.state.mainData.about_me" id="aboutme">
      <h3>ჩემს შესახებ</h3>
      <p>{{ $store.state.mainData.about_me }}</p>
      <hr />
    </div>

    <div class="experience" v-for="i in $store.state.mainData.experiences" :key="findIdExp(i)">
      <div v-if="showExperience(i)" class="section">
        <h3>გამოცდილება</h3>
        <h4 v-if="i.position || i.employer">
          {{ i.position }}<span v-if="i.employer">, {{ i.employer }} </span>
        </h4>
        <p v-if="i.start_date || i.due_date" class="dates">
          {{ i.start_date }} - {{ i.due_date }}
        </p>
        <p>
          {{ i.description }}
        </p>
        <hr />
      </div>
    </div>

    <div class="education" v-for="i in $store.state.mainData.educations" :key="findIdEdu(i)">
      <div v-if="showEducation(i)" class="section">
        <h3>განათლება</h3>
        <h4 v-if="i.institute || i.degree_id">
          {{ i.institute
          }}<span v-if="i.degree_id">, {{ degree(i.degree_id) }} </span>
        </h4>
        <p v-if="i.due_date" class="dates">
          {{ i.due_date }}
        </p>
        <p>
          {{ i.description }}
        </p>
        <hr />
      </div>
    </div>

    <img id="logo" src="../assets/images/logo.png" alt="redberryLogo" />
  </div>

  <teleport to="body">
    <SuccessBox v-show="success" />
  </teleport>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

import SuccessBox from "../components/SuccessBox.vue";

const success = ref(false);
const store = useStore();
const props = defineProps(["send", "degrees"]);

function findIdExp(obj) {
  return store.state.mainData.experiences.findIndex(
    (elem) => elem == obj
  );
}

function findIdEdu(obj) {
  return store.state.mainData.educations.findIndex(
    (elem) => elem == obj
  );
}

function showExperience(obj) {
  for (let i of Object.values(
    store.state.mainData.experiences[findIdExp(obj)]
  )) {
    if (i) return true;
  }
  return false;
}

function showEducation(obj) {
  for (let i of Object.values(
    store.state.mainData.educations[findIdEdu(obj)]
  )) {
    if (i) return true;
  }
  return false;
}

function degree(id) {
  if (props.degrees[id - 1]) {
    return props.degrees[id - 1].title;
  }
}
onMounted(() => {
  let getData = true;

  Object.values(store.state.mainData).forEach((element) => {
    if (typeof element == "string") {
      getData = false;
    }
  });

  if (getData) {
    if (localStorage.mainData) {
      store.commit("getLS");
    }
  }

  if (props.send) {
    let formData = new FormData();
    for (let [idx, value] of Object.entries(store.state.mainData)) {
      formData.set(idx, value);

      if (idx == "experiences") {
        value.forEach((element, d) => {
          for (let i in element) {
            formData.set(`experiences[${d}][${i}]`, element[i]);
          }
        });
      }
      if (idx == "educations") {
        value.forEach((element, d) => {
          for (let i in element) {
            formData.set(`educations[${d}][${i}]`, element[i]);
          }
        });
      }
    }

    axios
      .post("https://resume.redberryinternship.ge/api/cvs", formData)
      .then((Response) => {
        success.value = true;
        console.log(Response);
      }).catch(function (error) {
        if (error) {
          success.value = false;
        }
      })
  }
})
</script>

<style scoped>
#resume {
  position: relative;
  width: 50%;
  padding: 2rem 3rem 7rem;
  margin: auto;
  min-height: 95vh;
  height: fit-content;
}

#profile {
  position: relative;
  float: right;
  width: 40%;
}

h2,
h3 {
  color: var(--titlecolor);
  margin: 2rem 0 1.5rem 0;
}

p {
  margin: 0.8rem 0;
}

#name {
  font-size: xx-large;
}

.contact {
  display: flex;
  gap: 8px;
  color: var(--offblack);
  margin: 1rem 0;
}

svg {
  width: 1rem;
}

#logo {
  position: absolute;
  bottom: 3rem;
}

.dates {
  color: #909090;
  font-style: italic;
}

hr {
  background-color: #c8c8c8;
}
</style>