<template>
  <form>
    <div class="Input">
      <label for="position">თანამდებობა</label>
      <input
        type="text"
        name="position"
        placeholder="დეველოპერი, დიზაინერი, ა.შ."
      />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div class="Input">
      <label for="employer">დამსაქმებელი</label>
      <input type="text" name="employer" placeholder="დამსაქმებელი" />
      <span>მინიმუმ 2 სიმბოლო</span>
    </div>

    <div id="dates">
      <div class="Input">
        <label for="Sdate">დაწყების რიცხვი</label>
        <input type="date" name="Sdate" />
      </div>
      <div class="Input">
        <label for="Fdate">დამთავრების რიცხვი</label>
        <input type="date" name="Fdate" />
      </div>
    </div>

    <div class="Input">
      <label for="aboutjob">აღწერა</label>
      <textarea
        name="aboutjob"
        placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
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

#dates {
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

hr{
  background-color: #C1C1C1;
}
</style>