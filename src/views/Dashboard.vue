<script lang="ts" setup>
import AppHeader from '../components/appheader.vue'
import CircleFlow from '../components/svg/circle-flow.vue'
import Categories from '../components/category/categories.vue'
import AppMobileNav from '../components/mobilenav.vue'
import Navbar from '../components/navbar.vue'
import { useUserStore } from '@/store/user'
import { Toaster } from 'vue-sonner'
import { computed } from 'vue'

const store = useUserStore()

const userName = computed(() => {
    return store.user.profile.name.split(' ')[0]
})

store.getAllScenarios()

</script>
<template>
    <div class="app-categories">
        <Toaster position="top-center"/>
        <AppHeader>
            <Navbar />
            <CircleFlow>
                <router-link to="/chat">
                    <div class="tap-to-chat">
                        <span>
                            Hi, {{ userName }}
                            <img class="hand" src="../../public/hand.svg" alt=""></span>
                        <h3>Tap To Chat</h3>
                        <img src="../../public/wave.svg" alt="">
                    </div>
                </router-link>
            </CircleFlow>
        </AppHeader>
        <Categories />
        <AppMobileNav />
    </div>
</template>
<style scoped lang="scss">
.tap-to-chat {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    top: 50%;
    margin-top: -63px;
    cursor: pointer;

    @media screen and (min-width: 768px) {

        margin-top: -55px;
    }


    @media screen and (min-width: 1024px) {
        margin-top: -48px;
    }


    span {
        color: #808DA4;
        font-weight: 400;
    }

    h3 {
        color: #fff;
        font-weight: bold;
        margin: 30px 0;
    }
}
</style>