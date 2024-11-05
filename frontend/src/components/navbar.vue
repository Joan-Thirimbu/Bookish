<template>
    <div class="navbar m-0 p-4" :class="{ 'scrolled': isScrolled }">
        <div class="navbar-logo">
            <img :src="logo" />
        </div>
        <ul class="navbar-links m-0">
            <li>
                <router-link :to="'/:pathMatch(.*)*'">
                    <span class="mx-4">Home</span>
                </router-link>
            </li>
            <li>
                <router-link :to="'/library'">
                    <span class="mx-4">Library</span>
                </router-link>
            </li>
            <li>
                <router-link :to="'/:pathMatch(.*)*'">
                    <span class="mx-4">About</span>
                </router-link>
            </li>
        </ul>
        <button class="btn btn-sign-i">
            <div>
                <span>Sign In</span>
            </div>
        </button>
    </div>
</template>

<script>
import logo from '@/assets/logo.svg'

export default{
    name: "NavBar",
    data() {
        return {
            logo,
            isScrolled: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            this.isScrolled = window.scrollY > 50;
        });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>

<style>
.navbar{
    position: fixed !important;
    display: flex;
    align-items: center;
    background: transparent;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: transparent; 
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.navbar.scrolled {
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.navbar-logo{
    flex: 0 0 auto;
    cursor: pointer;
}
.navbar-links{
    list-style: none;
    flex: 1;
    display: flex;
    justify-content: center;
    padding-left: 0px;
}
.navbar-links li span{
    font-size: .8em;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
}
.navbar-links li:not(:last-child)::after {
    content: "/";
    color: #2124276b;
}
</style>