<template>
  <v-app>
    <v-container>
      <v-row class="search">
        <v-col cols="1">
          <span><v-icon color="blue">mdi-magnify</v-icon>search:</span>
        </v-col>
        <v-col cols="2" sm="2" md="2">
          <input
            autofocus
            placeholder="Find all npm packages :)"
            v-model="inputSearchText"
            @keypress.enter="handleGetData"
          />
        </v-col>
        <v-col cols="1"
          ><v-btn @click="handleGetData" color="light-blue"
            >submit</v-btn
          ></v-col
        >
      </v-row>
    </v-container>

    <v-main v-if="paginatedData.length">
      <v-table class="ma-2">
        <thead>
          <tr>
            <th class="text-left">Package</th>
            <th class="text-left">Version</th>
          </tr>
        </thead>
        <tbody></tbody>
        <tr v-for="p in paginatedData" :key="p.package" @click="showDetails">
          <td @click="findCurrentPackage(p.package)">
            {{ p.package.name }}
          </td>
          <td>{{ p.package.version }}</td>
        </tr>
        <div>
          <v-btn
            class="ma-2"
            color="cyan"
            @click="prevPage"
            :disabled="pageNumber == 0"
          >
            <v-icon dark left>mdi-arrow-left</v-icon>
            Previous
          </v-btn>
          <v-btn
            class="ma-2"
            color="cyan"
            @click="nextPage"
            :disabled="pageNumber >= packageCount - 1"
          >
            Next
            <v-icon dark right>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-table>
    </v-main>
    <NpmModal
      v-if="showModal"
      :currentPackage="currentPackage"
      @close="hideDetails"
    ></NpmModal>
  </v-app>
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

<style scoped>
.search {
  align-items: flex-end;
}
.search input:focus-visible {
  outline: none;
}
@media screen and (max-width: 1280px) {
  .search {
    align-items: baseline;
    flex-direction: column;
  }
}
</style>
