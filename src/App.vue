<template>
  <the-header></the-header>
  <main><router-view></router-view></main>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::after,
*::before {
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
}

ul {
  list-style: none;
}

a {
  color: rgb(25, 146, 194);
  text-decoration: none;
}

a:hover {
  color: rgb(3, 67, 92);
  text-decoration: underline;
}

main {
  margin-top: 70px;
}
</style>
