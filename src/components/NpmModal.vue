<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <v-icon @click="closeModal">mdi-close</v-icon>
      <v-spacer></v-spacer>
      <span class="text-h4">Package name: {{ currentPackage.name }}</span>
      <v-spacer></v-spacer>
      <span>Description: {{ currentPackage.description }}</span>
      <v-spacer></v-spacer>
      <span>version: {{ currentPackage.version }}</span>
      <v-spacer></v-spacer>
      <v-list v-if="currentPackage.keywords">
        <v-list-subheader>Tags:</v-list-subheader>
        <v-list-item
          v-for="tag in currentPackage.keywords"
          :key="tag"
          class="text-no-wrap"
          active-color="primary"
          variant="plain"
        >
          <span class="tag">{{ tag }}</span>
        </v-list-item>
      </v-list>

      <v-footer v-if="currentPackage.author">
        <span>Author: {{ currentPackage.author.name }}</span>
      </v-footer>
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

<style scoped>
.v-icon {
  align-self: end;
}
.v-list {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background: #e9e9e9;
  padding: 5px;
  border-radius: 4px;
  margin: 2px;
}
.v-list--density-default.v-list--one-line .v-list-item {
  padding: 0;
}
.backdrop {
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal {
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
}
@media screen and (max-width: 660px) {
  .modal {
    width: 96%;
  }
}
</style>
