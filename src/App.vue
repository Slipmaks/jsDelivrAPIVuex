<template>
  <div>
    <h1>hello</h1>
    <input type="text" v-model="inputSearchText" />
    <button @click="getData">submit</button>
  </div>

  <div>
    <h3>{{ inputSearchText }}</h3>
    <div v-if="paginatedData">
      <p>Data</p>
      <div v-for="p in paginatedData" :key="p.package.name">
        <h2>{{ p.package.name }} - {{ p.package.version }}</h2>
        <p>{{ p.package.description }}</p>
      </div>
    </div>
    <div>
      <button @click="prevPage" :disabled="pageNumber == 0">Previous</button>
      <button @click="nextPage" :disabled="pageNumber >= packageCount - 1">
        Next
      </button>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";

export default {
  setup() {
    const inputSearchText = ref("");
    const rawData = ref([]);
    const pageNumber = ref("1");
    const size = ref(10);

    // grab data from npmjs
    const getData = async () => {
      fetch(
        `https://registry.npmjs.org/-/v1/search?text=${inputSearchText.value}`
      ).then((response) => {
        response.json().then((r) => {
          rawData.value = r.objects;
        });
      });
    };
    //compute page
    const nextPage = () => {
      pageNumber.value++;
    };
    const prevPage = () => {
      pageNumber.value--;
    };
    const packageCount = computed(() => {
      let list = rawData.value.length;
      let currentSize = size.value;
      return Math.ceil(list / currentSize);
    });
    const paginatedData = computed(() => {
      const start = pageNumber.value * size.value;
      const end = start + size.value;
      return rawData.value.slice(start, end);
    });

    return {
      inputSearchText,
      getData,
      paginatedData,
      packageCount,
      nextPage,
      prevPage,
      pageNumber,
    };
  },
};
</script>

<style></style>
