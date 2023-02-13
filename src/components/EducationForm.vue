<template>
  <form>
    <div class="Input">
      <label for="institute">სასწავლებელი</label>
      <input
        type="text"
        name="institute"
        placeholder="სასწავლებელი"
        @input="Validation"
      />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div id="dblInput">
      <div class="Input">
        <label for="degree">ხარისხი</label>

        <select name="degree" @input="Validation">
          <option value="" disabled selected>აირჩიეთ ხარისხი</option>
          <option v-for="i in degrees" :key="i.id" :value="i.id">
            {{ i.title }}
          </option>
        </select>
      </div>

      <div class="Input">
        <label for="due_date">დამთავრების რიცხვი</label>
        <input type="date" name="due_date" @input="Validation" />
      </div>
    </div>

    <div class="Input">
      <label for="description">აღწერა</label>
      <textarea
        name="description"
        placeholder="განათლების აღწერა"
        @input="Validation"
      ></textarea>
    </div>

    <hr />
  </form>
</template>

<script>
export default {
  props: ["degrees", "validatedEducation", "failedInput"],

  data() {
    return {
      formData: {},
      validatedEducationObj: {
        institute: null,
        degree: null,
        due_date: null,
        description: null,
      },
    };
  },

  methods: {
    Validation(event) {
      let name = event.target.name;
      let id = event.path.find((element) => element.tagName == "FORM").id - 1;
      switch (name) {
        case "institute":
          if (event.target.value.length >= 2) {
            event.target.previousSibling.classList.add("success");
            event.target.previousSibling.classList.remove("failed");
            this.validatedEducationObj[name] = true;
          } else {
            event.target.previousSibling.classList.add("failed");
            event.target.previousSibling.classList.remove("success");
            this.validatedEducationObj[name] = false;
            if (event.target.value.length == 0) {
              this.validatedEducationObj[name] = null;
            }
          }
          break;
        default:
          this.validatedEducationObj[name] = true;
          event.target.previousSibling.classList.add("success");
          event.target.previousSibling.classList.remove("failed");
          if (event.target.value.length == 0) {
            this.validatedEducationObj[name] = null;
            event.target.previousSibling.classList.add("failed");
            event.target.previousSibling.classList.remove("success");
          }
          break;
      }
      this.saveData(id);
    },
    saveData(id) {
      let form = document.getElementsByTagName("form")[id];
      this.formData = new FormData(form);
      this.$emit("data", { id: id, data: this.formData });
      this.$emit("validation", {
        id: id,
        validation: this.validatedEducationObj,
      });
    },
    markFails() {
      console.log(1);
    },
  },

  watch: {
    failedInput(data) {
      data.previousSibling.classList.add("failed");
    },
  },

  beforeCreate() {
    if (this.validatedEducation) {
      this.validatedEducationObj = this.validatedEducation;
    } else {
      localStorage.setItem(
        "validatedEducation",
        JSON.stringify([this.validatedEducationObj])
      );
    }
    if (localStorage.educationData) {
      let educationData = JSON.parse(localStorage.getItem("educationData"));
      for (let i in educationData) {
        for (let j in educationData[i]) {
          document.getElementsByName(j)[i].value = educationData[i][j];
        }
      }
    }
  },
};
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

.success + textarea,
.success + input {
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

.failed + textarea,
.failed + input {
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