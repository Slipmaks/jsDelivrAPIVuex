<template>
  <div>
    <input
      type="text"
      v-model="inputSearchText"
      @keypress.enter="handleGetData"
    />
    <button @click="handleGetData">submit</button>
  </div>

  <div>
    <h3>search: {{ inputSearchText }}</h3>
    <div v-if="paginatedData.length">
      <div v-for="p in paginatedData" :key="p.package" @click="showDetails">
        <div @click="findCurrentPackage(p.package)">
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
  </div>
  <NpmModal
    v-if="showModal"
    :currentPackage="currentPackage"
    @close="hideDetails"
  ></NpmModal>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import NpmModal from "./components/NpmModal.vue";

export default {
  setup() {
    const inputSearchText = ref("");
    const showModal = ref(false);
    const pageNumber = ref(0);
    const size = ref(10);
    const store = useStore();

    const handleGetData = async () => {
      await store.dispatch("getData", inputSearchText.value);
      inputSearchText.value = "";
    };
    const nextPage = () => {
      pageNumber.value++;
    };
    const prevPage = () => {
      pageNumber.value--;
    };
    const data = computed(() => store.state.rawData);
    const currentPackage = computed(() => store.state.currentPackage);
    const packageCount = computed(() => {
      let list = data.value.length;
      let currentSize = size.value;
      return Math.ceil(list / currentSize);
    });
    const paginatedData = computed(() => {
      const start = pageNumber.value * size.value;
      const end = start + size.value;
      return data.value.slice(start, end);
    });
    const findCurrentPackage = (p) => {
      store.dispatch("getCurrentPackage", p);
    };
    const showDetails = () => {
      showModal.value = true;
    };
    const hideDetails = () => {
      showModal.value = false;
    };
    return {
      inputSearchText,
      handleGetData,
      pageNumber,
      prevPage,
      nextPage,
      packageCount,
      paginatedData,
      showDetails,
      showModal,
      currentPackage,
      findCurrentPackage,
      hideDetails,
    };
  },
  components: { NpmModal },
};
</script>

<style></style>
