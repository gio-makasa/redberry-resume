<template>
  <div id="info">
    <the-header page="1"></the-header>
    <main>
      <form @keyup="saveLocal" id="form">
        <div id="fullName">
          <div class="Input">
            <label for="name">სახელი</label>
            <input type="text" name="name" placeholder="ანზორ" />
            <span>მინიმუმ 2 ასო, ქართული ასოები</span>
          </div>
          <div class="Input">
            <label for="surname">გვარი</label>
            <input type="text" name="surname" placeholder="მუმლაძე" />
            <span>მინიმუმ 2 ასო, ქართული ასოები</span>
          </div>
        </div>

        <div id="personPhoto">
          <label for="image">პირადი ფოტოს ატვირთვა</label>
          <div id="photo">
            ატვირთვა
            <input type="file" name="image" accept="image/png, image/jpeg" />
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
          />
          <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
        </div>

        <div class="Input">
          <label for="phone_number">მობილურის ნომერი</label>
          <input type="text" name="phone_number" placeholder="+995 551 12 34 56" />
          <span>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</span>
        </div>

        <router-link to="/Experience">შემდეგი</router-link>
      </form>
    </main>
  </div>
  <resume-component></resume-component>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    saveLocal() {
      this.formData = new FormData(document.getElementById("form"));
      for (const [key, value] of this.formData) {
        console.log(`${key}: ${value}\n`);
      }
    },
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

a {
  background-color: #6b40e3;
  color: white;
  border-radius: 0.5rem;
  padding: 0.8rem 2.2rem;
  margin-top: 6rem;
  align-self: flex-end;
  text-decoration: none;
}
</style>