<template>
  <section class="container">
    <div v-if="loading" class="loader">
      <p>Please wait while we fetching details...</p>
    </div>
    <div v-if="!loading" class="detail">
      <div class="image-container">
        <img :src="beerDetail.image_url" :alt="beerDetail.id" />
      </div>
      <p><strong>Name: </strong>{{ beerDetail.name }}</p>
      <p><strong>Tips: </strong>{{ beerDetail.brewers_tips }}</p>
      <p><strong>Contributed By: </strong>{{ beerDetail.contributed_by }}</p>
      <div>
        <h4>Food Pairing:</h4>
        <ul>
          <li v-for="singleFood in beerDetail.food_pairing" :key="singleFood">
            <span>&#x2022;</span> {{ singleFood }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      beerDetail: {},
      loading: false,
    };
  },
  methods: {
    async getSingleData() {
      this.loading = true;
      let url = `https://api.punkapi.com/v2/beers/${this.$route.params.id}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        this.beerDetail = res.data[0];
        this.loading = false;
      }
    },
  },

  mounted() {
    this.getSingleData();
  },
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.image-container img {
  max-height: 400px;
}

strong,
h4 {
  font-size: 18px;
  color: rgb(8, 53, 142);
}

p,
li {
  font-size: 16px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.loader p {
  color: green;
  font-size: 1rem;
  font-weight: 500;
}
</style>
