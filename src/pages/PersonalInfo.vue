<template>
  <div id="info">
    <the-header page="1"></the-header>
    <main>
      <form @submit.prevent="next" id="form">
        <div id="fullName">
          <div class="Input">
            <label for="name">სახელი</label>
            <input type="text" name="name" placeholder="ანზორ" v-model="$store.state.mainData.name"
              @input="Validation($event.target)" />
            <span>მინიმუმ 2 ასო, ქართული ასოები</span>
          </div>

          <div class="Input">
            <label for="surname">გვარი</label>
            <input type="text" name="surname" placeholder="მუმლაძე" v-model="$store.state.mainData.surname"
              @input="Validation($event.target)" />
            <span>მინიმუმ 2 ასო, ქართული ასოები</span>
          </div>
        </div>

        <div id="personPhoto">
          <label for="image">პირადი ფოტოს ატვირთვა</label>
          <div id="photo">
            ატვირთვა
            <input type="file" name="image" accept="image/png, image/jpeg" @input="Validation($event.target)" />
          </div>
        </div>

        <div class="Input">
          <label for="about_me">ჩემ შესახებ (არასავალდებულო)</label>
          <textarea name="about_me" placeholder="ზოგადი ინფო შენს შესახებ" v-model="$store.state.mainData.about_me"
            @input="Validation($event.target)"></textarea>
        </div>

        <div class="Input">
          <label for="email">ელ.ფოსტა</label>
          <input type="text" name="email" placeholder="anzorr666@redberry.ge" v-model="$store.state.mainData.email"
            @input="Validation($event.target)" />
          <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
        </div>

        <div class="Input">
          <label for="phone_number">მობილურის ნომერი</label>
          <input type="text" name="phone_number" placeholder="+995 551 12 34 56"
            v-model="$store.state.mainData.phone_number" @input="Validation($event.target)" />
          <span>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</span>
        </div>

        <button>შემდეგი</button>
      </form>
    </main>
  </div>
  <ResumeComponent />
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const validated = reactive({
  name: false,
  surname: false,
  image: false,
  email: false,
  phone_number: false,
})

function Validation(event) {
  let name = event.name;
  let value = event.value;
  switch (name) {
    case "name":
    case "surname":
      if (/^[ა-ჰ]+[ა-ჰ]$/g.test(value)) {
        event.previousSibling.classList.add("success");
        event.previousSibling.classList.remove("failed");
        validated[name] = true;
      } else {
        event.previousSibling.classList.add("failed");
        event.previousSibling.classList.remove("success");
        validated[name] = false;
      }
      break;
    case "image":
      if (value == "") {
        event.parentElement.classList.add("failed");
        event.parentElement.classList.remove("success");
      } else {
        event.parentElement.classList.add("success");
        event.parentElement.classList.remove("failed");
        store.state.mainData.image = event.files[0];
        validated[name] = true;
      }
      break;
    case "email":
      if (/@redberry.ge$/g.test(value) && /^[a-z]/i.test(value)) {
        event.previousSibling.classList.add("success");
        event.previousSibling.classList.remove("failed");
        validated[name] = true;
      } else {
        event.previousSibling.classList.add("failed");
        event.previousSibling.classList.remove("success");
        validated[name] = false;
      }
      break;
    case "phone_number":
      value = value.replaceAll(" ", "");
      if (/([+]995)[5][0-9]{8}/gm.test(value) && value.length == 13) {
        event.previousSibling.classList.add("success");
        event.previousSibling.classList.remove("failed");
        validated[name] = true;
      } else {
        event.previousSibling.classList.add("failed");
        event.previousSibling.classList.remove("success");
        validated[name] = false;
      }
      break;
  }
  localStorage.setItem(
    "validatedPersonalData",
    JSON.stringify(validated)
  );
  store.commit("saveLS");
}

function next() {
  for (let i in validated) {
    if (!validated[i]) {
      Validation(document.getElementsByName(i)[0]);
      return;
    }
  }
  router.replace({ path: "/experience" });
}

onMounted(() => {
  if (localStorage.validated) {
    validated = JSON.parse(
      localStorage.getItem("validatedPersonalData")
    );
    validated["image"] = false;
  }
})
</script>

<style scoped>
#info {
  background-color: var(--whiteback);
  width: 50%;
  float: left;
  padding: 2rem 4rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem 0;
}

#fullName {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
}

.Input {
  display: flex;
  position: relative;
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

#personPhoto {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  padding-right: 50px;
  gap: 1rem;
}

#photo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.8rem;
  background-color: #0e80bf;
  color: white;
  width: fit-content;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
}

#photo input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
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

button {
  background-color: var(--buttoncolor);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 2.2rem;
  margin-top: 6rem;
  align-self: flex-end;
  cursor: pointer;
}

button:hover {
  background-color: var(--buttonhover);
}

button:focus {
  background-color: var(--buttonclicked);
}

.success {
  color: var(--offblack);
}

.success+input {
  border-color: var(--successgreen);
}

.success::after {
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

.failed+input {
  border-color: var(--failedred);
}

.failed::after {
  position: absolute;
  content: url("../assets/images/warning.png");
  width: fit-content;
  height: fit-content;
  right: 5px;
  top: 40%;
}

.success[id="photo"]::after,
.failed[id="photo"]::after {
  top: 15%;
}
</style>