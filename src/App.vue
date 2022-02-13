<template>
  <div>
    <h1>hello</h1>
    <input type="text" v-model="inputSearchText" />
    <button @click="getData">submit</button>
  </div>

  <div>
    <h3>{{ inputSearchText }}</h3>
    <div v-if="rawData">
      <p>Data</p>
      <div v-for="p in rawData" :key="p.package.name">
        <p>{{ p.package.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const inputSearchText = ref("");
    const rawData = ref([]);

    const showData = () => {
      show.value = !show.value;
      console.log(show.value);
    };

    const getData = async () => {
      fetch(
        `https://registry.npmjs.org/-/v1/search?text=${inputSearchText.value}`
      ).then((response) => {
        response.json().then((r) => {
          rawData.value = r.objects;
        });
      });
    };

    return { inputSearchText, getData, rawData };
  },
};
</script>

<style></style>
