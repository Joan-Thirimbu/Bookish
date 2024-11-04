<template>
    <div class="grid-wrap">
        <div class="d-flex justify-content-center">
            <div class="cover">
                <img :src="book.coverImage"/>
            </div>
            <div class="ms-4">
                <div class="d-flex mt-4">
                    <h1 class="title m-0">{{ book.title }}</h1>
                    <span class="book-view-count d-flex align-items-center ms-2">
                        <i class="me-1 eye-icon material-icons">visibility</i>
                        {{ book.viewCount }}
                    </span>
                    <div class="ms-auto d-flex align-self-center">
                        <i class="share-icon material-symbols-outlined">share</i>
                        <i class="ms-3 bookmark-icon material-symbols-outlined">bookmark</i>
                        <i class="ms-3 heart-icon material-symbols-outlined">favorite</i>
                    </div>
                </div>
                <div class="d-flex book-author">
                    <i class="icon material-icons">person</i>
                    <span class="author align-self-center ms-1">{{ book.author }}</span>
                </div>
                <div class="rating mt-1">
                    <span v-for="star in fullStars" :key="'full-' + star" class="star filled">★</span>
                    <span v-if="hasHalfStar" class="star half">★</span>
                    <span v-for="star in emptyStars" :key="'empty-' + star" class="star">★</span>
                    <span class="rate-text ms-1">{{ book.rating }}</span>
                </div>
                <div class="desc mt-2">
                    <h6 class="m-0">Synopsis</h6>
                    <p class="m-0 mt-1">{{ book.description }}</p>
                    <div class="d-flex mt-1">
                        <h6 class="m-0 align-self-center">Genre:&nbsp;</h6>
                        <p class="m-0"> {{ book.genres.join(', ') }}</p>
                    </div>
                    <div class="d-flex mt-1">
                        <h6 class="m-0 align-self-center">Language:&nbsp;</h6>
                        <p class="m-0"> {{ book.language }}</p>
                    </div>
                    <div class="d-flex mt-1">
                        <h6 class="m-0 align-self-center">No. of Pages:&nbsp;</h6>
                        <p class="m-0"> {{ book.pages }}</p>
                    </div>
                </div>
                <div class="action-btn mt-3">
                    <button class="btn btn-read">Start Reading</button>
                    <button class="btn ms-3 btn-buy">${{ book.price }} (Buy Hardcopy)</button>
                </div>
            </div>
        </div>
        <div class="book-related-card">
            <div class="py-4">
                <h5 class="mx-4 px-1">You might also like</h5>
                <div class="mt-4 mx-4 carousel d-flex flex-wrap">
                    <swiper ref="swiper" v-if="recommendedBooks.length > 0" :slides-per-view="'auto'"  :space-between="24" class="book-slider m-0" @swiper="onSwiper">
                        <swiper-slide v-for="book in recommendedBooks" :key="book.id">
                            <div class="book-related-cover">
                                <router-link :to="'/library/' + book.isbn">
                                    <img :src="book.coverImage" :alt="book.title" />
                                    <p class="m-0 mt-2 book-related-title">{{ book.title }}</p>
                                </router-link>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="carousel-navigation" v-if="recommendedBooks.length > slidesPerView">
                        <button @click="previousSlide" class="carousel-button left">
                            <i class="icon material-icons">arrow_back_ios</i>
                        </button>
                        <button @click="nextSlide" class="carousel-button right">
                            <i class="icon material-icons">arrow_forward_ios</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="book-review-card py-4">
            <h5 class="mx-4 px-1">Reviews</h5>
            <div v-for="(review, index) in book.reviews" :key="index" class="m-4 p-3 review-card"> 
                <i class="icon material-icons float-end">more_vert</i>
                <div class="comment mb-4 mt-2">
                    <span>{{ review.reviewText }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-end">
                    <div class="">
                        <i class="icon material-symbols-outlined">thumb_up</i>
                        <i class="ms-3 icon material-icons">reply</i>
                    </div>
                    <div class="user-details me-2">
                        <span>{{ review.userId }}</span>
                        <span>{{ review.createdAt }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { books } from '../temp-data';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
    name: "BookDetailsPages",
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            books,
            book: books.find(book => book.isbn === this.$route.params.bookId),
            userRating: null,
            slidesPerView: 7,
            swiper: null,
        };
    },
    computed: {
        fullStars() {
            return Math.floor(this.userRating || this.book?.rating || 0);
        },
        hasHalfStar() {
            return (this.userRating || this.book?.rating || 0) % 1 >= 0.5;
        },
        emptyStars() {
            return 5 - Math.ceil(this.userRating || this.book?.rating || 0);
        },
        selectedBook() {
            return books.find(book => book.isbn === this.$route.params.bookId);
        },
        recommendedBooks() {
            if (!this.selectedBook) return [];
            return books.filter(book => 
                book.isbn !== this.selectedBook.isbn && 
                book.genres.some(genre => this.selectedBook.genres.includes(genre)) 
            );
        },
    },
    watch: {
        '$route.params.bookId': function(newIsbn) {
            this.book = books.find(book => book.isbn === newIsbn); 
            this.userRating = null; 
        }
    },
    mounted() {
        this.book = books.find(book => book.isbn === this.$route.params.bookId);
    },
    methods: {
        setRating(rating) {
            this.userRating = rating;
        },
        nextSlide() {
            if (this.swiper) {
                const currentIndex = this.swiper.activeIndex;
                const slidesToScroll = 3; 
                const newIndex = currentIndex + slidesToScroll;

                if (newIndex < this.swiper.slides.length) {
                    this.swiper.slideTo(newIndex);
                }
            }
        },
        previousSlide() {
            if (this.swiper) {
                const currentIndex = this.swiper.activeIndex;
                const slidesToScroll = 3;
                const newIndex = currentIndex - slidesToScroll;

                if (newIndex >= 0) {
                    this.swiper.slideTo(newIndex);
                }
            }
        },
        onSwiper(swiper) {
            this.swiper = swiper; 
        },
    },
}
</script>

<style>
.cover{
    border: none;
    transition: transform 0.2s;
    display: inline-block;
}
.cover img{
    width: 300px;
    height: 450px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.2s;
    margin: 10px;
    display: inline-block;
}
.book-view-count{
    font-size: 12px;
    color: #a2a2a2;
    font-weight: 600;
}
.eye-icon{
    font-size: 14px;
}
.share-icon, .bookmark-icon, .heart-icon{
    font-size: 20px;
    color: #a2a2a2;
}
.star{
    position: relative;
    color: #a2a2a226;
}
.star.filled {
  color: gold;
}
.star.half {
  color: transparent;
}
.star.half::after {
  content: '★';
  color: gold;
  position: absolute;
  left: 0;
  width: 50%; 
  overflow: hidden;
  top: -5%;
}
.rate-text{
    font-size: 10px; 
    font-weight: 600;
    color: #a2a2a2;
}
.desc h6{
    font-size: 12px;
    font-weight: 600;
    color: #212427cc;
}
.desc p{
    font-size: 12px;
    line-height: 1.7;
}
.btn-read{
    padding: 8px 16px 8px 16px;
    border-radius: 14px;
    border: 1px solid #E6E5E5;
    font-size: 12px;
    color: #a2a2a2;
    font-weight: 600;
}
.btn-read:hover{
    border: 1px solid #21242770;
    color: #212427;
}
.btn-buy{
    padding: 8px 16px 8px 16px;
    color: #212427a8;
    border-radius: 14px;
    font-size: 12px;
    background-color: #ddd0c8;
    font-weight: 600;
}
.btn-buy:hover{
    background-color: #ddd0c8;
}
.book-related-card{
    background-color: #ddd0c82e;
    margin-top: 2.5em;
}
.book-related-card h5{
    font-weight: 600;
}
.book-related-cover img{
    width: 150px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.2s;
    display: inline-block;
}
.book-related-title{
    font-size: 14px;
    font-weight: 600;
    width: calc(100% - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
}
.swiper-slide {
    width: 150px; 
    display: flex; 
    justify-content: center;
}
.book-related-cover {
    width: 100%;
    max-width: 150px; 
}
.carousel{
    position: relative;
}
.carousel-navigation {
    position: absolute;
    top: 35%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.carousel:hover .carousel-navigation {
    opacity: 1; 
    pointer-events: auto;
}
.carousel-button {
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
    background: #21242780;
}
.carousel-button i{
    color: #fff;
}
.carousel-button.left {
    left: 10px; 
}
.carousel-button.right {
    right: 10px;
}
.book-review-card{
    background-color: #ddd0c82e;
    margin: 2.5em 0;
}
.book-review-card h5{
    font-weight: 600;
}
.review-card{
    border: 1px solid #E6E5E5;
    border-radius: 5px;
}
.comment{
    font-size: 14px;
  font-weight: 600;
}
.comment span{
    color: #21242780;
}
.user-details{
    display: grid;
    text-align: end;
}
.user-details span{
    font-size: 12px;
    font-weight: 600;
    color: #21242787;
}
a{
    color: #212427;
    text-decoration: none;
}
</style>