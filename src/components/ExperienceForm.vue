<template>
  <form>
    <div class="Input">
      <label for="position">თანამდებობა</label>
      <input
        type="text"
        name="position"
        placeholder="დეველოპერი, დიზაინერი, ა.შ."
        @input="Validation"
      />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div class="Input">
      <label for="employer">დამსაქმებელი</label>
      <input
        type="text"
        name="employer"
        placeholder="დამსაქმებელი"
        @input="Validation"
      />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div id="dates">
      <div class="Input">
        <label for="start_date">დაწყების რიცხვი</label>
        <input type="date" name="start_date" @input="Validation" />
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
        placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
        @input="Validation"
      ></textarea>
    </div>

    <hr />
  </form>
</template>

<script>
export default {
  props: ["validatedExperience", "failedInput"],
  data() {
    return {
      formData: {},
      validatedExperienceObj: {
        position: null,
        employer: null,
        start_date: null,
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
        case "position":
        case "employer":
          if (event.target.value.length >= 2) {
            event.target.previousSibling.classList.add("success");
            event.target.previousSibling.classList.remove("failed");
            this.validatedExperienceObj[name] = true;
          } else {
            event.target.previousSibling.classList.add("failed");
            event.target.previousSibling.classList.remove("success");
            this.validatedExperienceObj[name] = false;
            if (event.target.value.length == 0) {
              this.validatedExperienceObj[name] = null;
            }
          }
          break;
        default:
          this.validatedExperienceObj[name] = true;
          event.target.previousSibling.classList.add("success");
          event.target.previousSibling.classList.remove("failed");
          if (event.target.value.length == 0) {
            this.validatedExperienceObj[name] = null;
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
        validation: this.validatedExperienceObj,
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

  mounted() {
    if (this.validatedExperience) {
      this.validatedExperienceObj = this.validatedExperience;
    }
    if (localStorage.experienceData) {
      let experienceData = JSON.parse(localStorage.getItem("experienceData"));
      for (let i in experienceData) {
        for (let j in experienceData[i]) {
          document.getElementsByName(j)[i].value = experienceData[i][j];
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