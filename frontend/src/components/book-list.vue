<template>
    <div class="grid-wrap gy-3">
        <div class="row">
            <h3>All Books</h3>
            <div class="book-item gy-1 col-xs-12 col-sm-6 d-flex" v-for="book in books" :key="book.isbn">
                <router-link :to="'/library/' + book.isbn">
                    <div class="card book-cover">
                        <img :src="book.coverImage"/>
                    </div>
                </router-link>
                <div class="book-details ms-1 pt-3">
                    <router-link :to="'/library/' + book.isbn">
                        <h5 class="book-name m-0">{{ book.title }}</h5>
                    </router-link>
                    <div class="d-flex book-author my-1">
                        <i class="icon material-icons">person</i>
                        <span class="author align-self-center ms-1">{{ book.author }}</span>
                    </div>
                    <p class="book-price my-2 limited-text">{{ book.description }}</p>
                    <div>
                        <span v-for="(genre, index) in book.genres" :key="index" class="book-genre-span"> {{ genre }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: "BookList",
    props: ['books'],
}
</script>