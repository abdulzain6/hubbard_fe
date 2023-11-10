<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const store = useUserStore()
</script>
<template>
    <nav class="app-desktopnav">
        <div class="logo">
            <router-link to="/dashboard">

                <img src="../../public/logo-nav.svg" alt="">
            </router-link>
        </div>
        <ul>
            <!-- v-if="store.user.role === 'admin'" -->
            <li>
                <router-link to="/admin">
                    <img src="/message.svg" alt="">
                    <span>
                        Admin
                    </span>
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard">Home</router-link>
            </li>
            <li>
                <router-link to="/chat">Chat</router-link>
            </li>
            <li>
                <router-link to="/profile">Profile</router-link>
            </li>
            <li>
                <router-link to="/leaderboard">Leaderboard</router-link>
            </li>
            <li>
                <a href="/sign-in">Logout</a>
            </li>
        </ul>
        <div class="profile">
            <router-link to="/">
                <img src="../../public/profile.png" alt="">
            </router-link>
        </div>
    </nav>
</template>
<style scoped lang="scss">
.app-desktopnav {
    position: absolute;
    z-index: 1;
    display: flex;
    width: 100%;
    justify-content: space-between;
    max-width: 1024px;
    margin: 0 auto;
    padding: 15px 29px;
    align-items: center;
    left: 0;
    right: 0;

    .logo {
        display: none;

        @media screen and (min-width: 1024px) {
            display: block;
        }
    }

    ul {
        display: none;

        @media screen and (min-width: 1024px) {
            display: flex;
        }

        li {
            margin-right: 45px;
            list-style-type: none;

            a {
                text-decoration: none;
                color: #fff;
                font-size: 12px;
            }
        }
    }

    .profile {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 25px;
            object-fit: cover;
        }
    }
}
</style>