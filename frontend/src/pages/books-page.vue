<template>
    <bookList :books="books"/>
</template>

<script>
import { books } from '../temp-data';
import bookList from '../components/book-list.vue';

export default{
    name: "BooksPages",
    components: {
        bookList,
    },
    data(){
        return {
            books,
        }
    }
}
</script>

<style>
.row h3{
    text-align: center;
    margin: 1.5em 0;
}
.grid-wrap {
    padding: 0 140px; 
    max-width: 1440px; 
    margin: 0 auto; 
}
.book-item{
    justify-content: center;
}
.book-cover{
    border: none;
    transition: transform 0.2s;
    display: inline-block;
    background: transparent;
}
.book-cover img{
    width: 100px;
    height: 150px;
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
    margin-right: 5px;
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