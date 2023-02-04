<template>
  <form>
    <div class="Input">
      <label for="univesity">სასწავლებელი</label>
      <input type="text" name="univesity" placeholder="სასწავლებელი" />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div id="dblInput">
      <div class="Input">
        <label for="degree">ხარისხი</label>

        <select name="degree">
          <option value="აირჩიეთ ხარისხი">აირჩიეთ ხარისხი</option>
        </select>
      </div>

      <div class="Input">
        <label for="Fdate">დამთავრების რიცხვი</label>
        <input type="date" name="Fdate" />
      </div>
    </div>

    <div class="Input">
      <label for="abouteducation">აღწერა</label>
      <textarea
        name="abouteducation"
        placeholder="განათლების აღწერა"
      ></textarea>
    </div>

    <hr />
  </form>
</template>

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
</style>