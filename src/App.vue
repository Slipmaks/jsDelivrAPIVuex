<template>
  <v-app>
    <the-header></the-header>
    <v-container>
      <v-row class="search d-flex align-center my-1">
        <span><v-icon color="blue">mdi-magnify</v-icon>search:</span>

        <input
          autofocus
          placeholder="Find all npm packages :)"
          v-model="inputSearchText"
          @keypress.enter="handleGetData"
        />

        <v-btn @click="handleGetData" color="light-blue">submit</v-btn>
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

        <!-- <v-pagination
          v-model="page"
          :length="packageCount"
          :total-visible="7"
          rounded="circle"
          prev-icon=""
          next-icon=""
        ></v-pagination> -->
        <div class="d-flex">
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
import TheHeader from "./components/TheHeader.vue";

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
    const page = computed(() => {
      return pageNumber.value + 1;
    });
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
    const lengthPages = computed(() => {
      return data.value.length / 10;
    });
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
      lengthPages,
      page,
    };
  },
  components: { NpmModal, TheHeader },
};
</script>

<style scoped>
.search {
  align-items: flex-end;
  justify-content: center;
}
.search span {
  margin-right: 5px;
}
.search input:focus-visible {
  outline: none;
}
.v-container {
  width: 80%;
}
.v-main {
  margin: 0 10%;
  border: 1px solid grey;
  flex: 0 0 auto;
}
tr {
  cursor: pointer;
}
@media screen and (max-width: 720px) {
  .v-main {
    margin: 0 4%;
  }
}
</style>
