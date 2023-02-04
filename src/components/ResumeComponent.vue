<template>
  <div id="resume">
    <img
      id="profile"
      src="../assets/images/profile.png"
      alt="profilePhoto"
    />

    <h2 id="name">{{ Data.name }} {{ Data.surname }}</h2>

    <div v-if="Data.email" class="contact" id="email">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z"
        />
      </svg>
      <span>{{ Data.email }}</span>
    </div>

    <div v-if="Data.phone_number" class="contact" id="mobile">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
        />
      </svg>
      <span>{{ Data.phone_number }}</span>
    </div>

    <div v-if="Data.about_me" id="aboutme">
      <h3>ჩემ შესახებ</h3>
      <p>{{ Data.about_me }}</p>
      <hr />
    </div>

    <!-- 
    <div class="section" id="experience">
      <h3>გამოცდილება</h3>
      <h4>React</h4>
      <span>date-date</span>
      <p>
        Experienced Javascript Native Developer with 5 years in the industry.
        proficient withreact. Used problem-solving aptitude to encahge
        application performance by 14%.created Data visualisation tools and
        integrated designs.
      </p>
      <hr />
    </div>

    <div class="section" id="education">
      <h3>განათლება</h3>
      <h4>სკოლა და სტუდენტი</h4>
      <span>date</span>
      <p>
        ვსწავლობდი გულმოდგინეთ. მყავდა ფრიადები. რაც შემეძლო — ვქენი.
        კომპიუტერები მიყვარდა. ვიჯექი ჩემთვის, ვაკაკუნებდი ამ კლავიშებზე.
        მეუნებოდნენ — დაჯექი, წაიკითხე რამე, რას აკაკუნებ, დრო მოვა და
        ჩაგიკაკუნებსო. აჰა, მოვიდა დრო და ვერა ვარ დეველოპერი?
      </p>
      <hr />
    </div> -->

    <img id="logo" src="../assets/images/logo.png" alt="redberryLogo" />
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      Data: {},
    };
  },
  watch: {
    info() {
      for (const [key, value] of this.info) {
        this.Data[key] = value;
        if (key == "image" && value.name) {
          document.getElementById("profile").src = URL.createObjectURL(value);
        }
      }
      localStorage.setItem("data", JSON.stringify(this.Data));
    },
  },
  mounted(){
    if (localStorage.data) {
      this.Data = JSON.parse(localStorage.data);
    }
  }
};
</script>

<style scoped>
#resume {
  position: relative;
  width: 50%;
  padding: 2rem 3rem 7rem;
  float: right;
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

.section span {
  color: #909090;
  font-style: italic;
}

hr {
  background-color: #c8c8c8;
}
</style>