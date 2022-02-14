<template>
  <div class="backdrop">
    <div class="modal">
      <h1>Package name: {{ currentPackage.name }}</h1>
      <h3>Description: {{ currentPackage.description }}</h3>
      <p>version: {{ currentPackage.version }}</p>
      <footer>
        <h2>Author: {{ currentPackage.author.name }}</h2>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currentPackage"],
};
</script>
