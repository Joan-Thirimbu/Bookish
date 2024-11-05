<template>
    <div class="page-not-found">
        <img :src="error"/>
        <span>Looks like this page does not exist!</span>
        <p class="mt-2 mb-3">Go back to homepage and continue exploring</p>
        <button class="btn btn-home">
            <a routerLink="">Back to Home</a>             
        </button>
    </div>
</template>

<script>
import error from '@/assets/404-error.svg'

export default{
    name: "PageNotFound",
    data() {
        return {
            error,
        }
    }
}
</script>

<style scoped>
.page-not-found{
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.page-not-found img{
    height: 100%;

}
.page-not-found span{
    font-size: 1.75rem;
    margin-top: 1rem;
    font-weight: bold;
}
.page-not-found p{
    margin: 1rem 0;
    font-size: 14px;
}
.btn{
    padding: 0.5rem 1.25rem;
    border-radius: .5rem;
    background: #ddd0c8;
    color: #212427;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    font-size: 14px;
    font-weight: 600;
}
</style>