<template>
  <section class="header">
    <header
      class="ma-8 my-lg-12 mx-lg-16 px-lg-16 d-flex justify-lg-space-between align-center gap-1"
    >
      <section class="d-flex align-center">
        <v-avatar size="84px">
          <img src="../assets/photo.jpg" alt="Avatar" />
        </v-avatar>
        <h1 class="ml-2">Maksym Matsydulskas</h1>
      </section>
      <section>
        <a href="http://github.com/Slipmaks" target="_blank">
          <v-tooltip activator="parent" location="start">github</v-tooltip>
          <v-icon>mdi-github</v-icon>
        </a>
        <a href="https://telegram.me/+380669723993" target="_blank">
          <v-tooltip activator="parent" location="start">telegram</v-tooltip>
          <v-icon>mdi-forum</v-icon>
        </a>
      </section>
    </header>
  </section>
</template>
<style scoped>
.header {
  background: rgba(216, 216, 216, 0.116);
}
a {
  text-decoration: none;
}
a:visited {
  color: inherit;
}
a {
  color: inherit;
}
</style>
