<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gray-900;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: $gray-900;
}

#nav a.router-link-exact-active {
  color: $primary;
}
</style>
