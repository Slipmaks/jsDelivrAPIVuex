<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal" @click="closeModal">
      <v-icon>mdi-close</v-icon>
      <h1>Package name: {{ currentPackage.name }}</h1>
      <h3>Description: {{ currentPackage.description }}</h3>
      <p>version: {{ currentPackage.version }}</p>
      <div v-if="currentPackage.keywords">
        <h3>Tags:</h3>
        <div v-for="tag in currentPackage.keywords" :key="tag">
          <span>{{ tag }}</span>
        </div>
      </div>

      <footer v-if="currentPackage.author">
        <h2>Author: {{ currentPackage.author.name }}</h2>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currentPackage"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
