<template>
  <div id="info">
    <the-header page="1"></the-header>
    <main>
      <form @input="saveData" @submit.prevent="next" id="form">
        <div id="fullName">
          <div class="Input">
            <label for="name">სახელი</label>
            <input
              type="text"
              name="name"
              placeholder="ანზორ"
              @focusout="Validation"
            />
            <span>მინიმუმ 2 ასო, ქართული ასოები</span>
          </div>
          <div class="Input">
            <label for="surname">გვარი</label>
            <input
              type="text"
              name="surname"
              placeholder="მუმლაძე"
              @focusout="Validation"
            />
            <span>მინიმუმ 2 ასო, ქართული ასოები</span>
          </div>
        </div>

        <div id="personPhoto">
          <label for="image">პირადი ფოტოს ატვირთვა</label>
          <div id="photo">
            ატვირთვა
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              @change="Validation"
            />
          </div>
        </div>

        <div class="Input">
          <label for="about_me">ჩემ შესახებ (არასავალდებულო)</label>
          <textarea
            name="about_me"
            placeholder="ზოგადი ინფო შენ შესახებ"
          ></textarea>
        </div>

        <div class="Input">
          <label for="email">ელ.ფოსტა</label>
          <input
            type="text"
            name="email"
            placeholder="anzorr666@redberry.ge"
            @focusout="Validation"
          />
          <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
        </div>

        <div class="Input">
          <label for="phone_number">მობილურის ნომერი</label>
          <input
            type="text"
            name="phone_number"
            placeholder="+995 551 12 34 56"
            @focusout="Validation"
          />
          <span>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</span>
        </div>

        <button>შემდეგი</button>
      </form>
    </main>
  </div>
  <resume-component :info="formData"></resume-component>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      validated: {
        name: false,
        surname: false,
        image: false,
        email: false,
        phone_number: false,
      },
    };
  },

  methods: {
    Validation(event) {
      let name = event.target.name;
      let value = event.target.value;
      switch (name) {
        case "name":
        case "surname":
          if (/^[ა-ჰ]+[ა-ჰ]$/g.test(value)) {
            event.target.previousSibling.classList.add("success");
            event.target.previousSibling.classList.remove("failed");
            this.validated[name] = true;
          } else {
            event.target.previousSibling.classList.add("failed");
            event.target.previousSibling.classList.remove("success");
            this.validated[name] = false;
          }
          break;
        case "image":
          this.validated[name] = true;
          break;
        case "email":
          if (/@redberry.ge$/g.test(value) && /^[a-z]/i.test(value)) {
            event.target.previousSibling.classList.add("success");
            event.target.previousSibling.classList.remove("failed");
            this.validated[name] = true;
          } else {
            event.target.previousSibling.classList.add("failed");
            event.target.previousSibling.classList.remove("success");
            this.validated[name] = false;
          }
          break;
        case "phone_number":
          value = value.replaceAll(" ", "");
          if (/^\+9955\d{8}/gm.test(value) && value.length == 13) {
            event.target.previousSibling.classList.add("success");
            event.target.previousSibling.classList.remove("failed");
            this.validated[name] = true;
          } else {
            event.target.previousSibling.classList.add("failed");
            event.target.previousSibling.classList.remove("success");
            this.validated[name] = false;
          }
          break;
      }
      localStorage.setItem("validated", JSON.stringify(this.validated));
    },
    saveData() {
      this.formData = new FormData(document.getElementById("form"));
    },
    next() {
      for (let i in this.validated) {
        if (!this.validated[i]) {
          return;
        }
      }
      this.$router.replace({ path: "/experience" });
    },
  },

  mounted() {
    if (localStorage.data) {
      this.info = JSON.parse(localStorage.data);
      for (let i in this.info) {
        if (i !== "image") {
          document.getElementsByName(i)[0].value = this.info[i];
        }
      }
    }
    if (localStorage.validated) {
      this.validated = JSON.parse(localStorage.getItem("validated"));
    }
    this.saveData();
  },
};
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
  display: flex;
  align-items: center;
  gap: 1rem;
}

#photo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

.success + input {
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

.failed + input {
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
</style>