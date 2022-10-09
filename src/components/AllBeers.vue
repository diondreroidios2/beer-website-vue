<template>
  <div class="search-container">
    <input v-model="searchText" type="text" placeholder="Search by name" />
  </div>
  <div class="container">
    <table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Unit</th>
        <th>Tagline</th>
        <th>Details</th>
      </tr>
      <beer-row
        v-for="beer in filteredBeers()"
        :key="beer.id"
        :id="beer.id"
        :name="beer.name"
        :unit="beer.unit"
        :tagline="beer.tagline"
      ></beer-row>
    </table>
    <div class="button-container">
      <button v-if="currentPage > 1" @click="handlePreviousPage">
        Previous Page
      </button>
      <button @click="handleNextPage">Next Page</button>
    </div>
  </div>
</template>

<script>
import BeerRow from "./BeerRow.vue";
import axios from "axios";

const POST_PER_PAGE = 5;

export default {
  components: {
    BeerRow,
  },
  data() {
    return {
      currentPage: 1,
      beers: [],
      searchText: "",
    };
  },
  methods: {
    async getAllData() {
      const url = `https://api.punkapi.com/v2/beers?page=${this.currentPage}&per_page=${POST_PER_PAGE}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        const tempArr = [];
        res?.data?.forEach((data) => {
          tempArr.push({
            id: data.id,
            name: data.name,
            unit: `${data.boil_volume.value} ${data.boil_volume.unit}`,
            tagline: data.tagline,
          });
        });
        this.beers = tempArr;
      }
    },
    handleNextPage() {
      this.currentPage = this.currentPage + 1;
      this.getAllData();
    },
    handlePreviousPage() {
      if (this.currentPage <= 1) return;
      this.currentPage = this.currentPage - 1;
      this.getAllData();
    },
    filteredBeers() {
      if (this.searchText && this.beers.length > 0) {
        return this.beers.filter((beer) =>
          beer.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else if (!this.searchText && this.beers.length > 0) {
        return this.beers;
      }
    },
  },
  mounted() {
    this.getAllData();
  },
};
</script>

<style>
.container,
.search-container,
.button-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.search-container {
  margin-top: 1rem;
}

.search-container input {
  padding: 0.5rem;
  font: inherit;
  border-radius: 3px;
  border: 1px solid gray;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.button-container {
  padding: 0;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.button-container button {
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
}
</style>
