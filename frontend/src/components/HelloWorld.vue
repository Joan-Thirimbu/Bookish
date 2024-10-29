<template>
  <div>
    <h1>{{ message }}</h1>
    <ul>
      <li v-for="book in books" :key="book.isbn">{{ book.coverImage	 }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      books: []
    };
  },
  mounted() {
    axios.get('http://localhost:5000/api/hello')
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.error(error);
      });

      axios.get('http://localhost:5000/api/books')
      .then(response => {
        this.books = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
