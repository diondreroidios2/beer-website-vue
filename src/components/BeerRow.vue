<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ unit }}</td>
    <td>{{ tagline }}</td>
    <td><router-link :to="createRoute">Show Details</router-link></td>
  </tr>
</template>
<script>
export default {
  props: ["id", "name", "unit", "tagline"],
  computed: {
    createRoute() {
      return "/" + this.id;
    },
  },
};
</script>
