<template>
  <div class="about">
    <h1>This login information stored in application state:</h1>
    <pre class="bg-secondary text-white">{{ this.$store.state }}</pre>
    <h4>Users in database are:</h4>
    <div>
      <pre>{{ this.$store.state.users }}</pre>
    </div>
  </div>
</template>
