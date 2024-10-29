<template>
    <h1 class="text-center pb-4"> Books </h1>
    <div class="grid-wrap gy-3">
        <div class="row">
            <div class="book-item col-xs-12 col-sm-6 d-flex" v-for="book in books" :key="book.isbn">
                <div class="card book-cover">
                    <img :src="book.coverImage"/>
                </div>
                <div class="book-details pt-3">
                    <h5 class="book-name m-0">{{ book.title }}</h5>
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
import { books } from '../temp-data';

export default{
    name: "BooksPages",
    data(){
        return {
            books,
        }
    }
}
</script>

<style>
.grid-wrap {
    padding: 0 140px; 
    max-width: 1440px; 
    margin: 0 auto; 
}
.book-item{
    justify-content: center;
}
.book-cover {
    border: none;
    transition: transform 0.2s;
    display: inline-block;
}
.book-cover img{
    width: 100px;
    height: 150px;
    border: 2px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.2s;
    margin: 10px;
    display: inline-block;
}
.book-cover:hover{
    transform: scale(1.05);
}
.book-details{
    width: calc(100% - 160px);
}
.icon{
    font-size: 17px;
    color: #a2a2a2;
}
.author{
    font-weight: 600;
    font-size: 11px;
    color: #a2a2a2;
}
.limited-text{
    font-size: 12px;
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.book-genre-span{
    padding: 4px 14px 6px 15px;
    border-radius: 14px;
    border: 1px solid #E6E5E5;
    margin-right: 3px;
    color: #a2a2a2;
    line-height: 1.36;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: max-content;
    max-width: 150px;
    font-size: 12px;
    font-weight: 600;
}
</style>