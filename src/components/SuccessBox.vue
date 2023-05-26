<template>
    <div ref="success">
        <span @click="remove">&#10005;</span>
        <h3>რეზიუმე წარმატებით გაიგზავნა 🎉</h3>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const success = ref(null);

function remove() {
    success.value.classList.add('hide');
}
</script>

<style scoped>
div {
    position: absolute;
    right: 3rem;
    top: 2rem;
    padding: 2rem;
    width: 350px;
    color: var(--offblack);
    border: 1px solid #E4E4E4;
    border-radius: 8px;
    box-shadow: 0 0 10px black;
}

span {
    position: relative;
    float: right;
    top: -1.5rem;
    right: -1rem;
    cursor: pointer;
    font-weight: bold;
}

.hide {
    display: none;
}
</style>