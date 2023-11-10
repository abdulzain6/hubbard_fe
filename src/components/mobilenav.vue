<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const store = useUserStore()

</script>
<template>
    <nav class="app-mobilenav">
        <ul>
            <li v-if="store.user.role === 'admin'">
                <router-link to="/admin">
                    <img src="/user.svg" alt="">
                    <span>
                        Admin
                    </span>
                </router-link>
            </li>
            <li class="active">
                <router-link to="/">
                    <img src="/message.svg" alt="">
                    <span>
                        Home
                    </span>
                </router-link>
            </li>
            <li>
                <router-link to="/chat">
                    <img src="/chat.svg" alt="">
                    <span>Chat</span>
                </router-link>
            </li>
            <li>
                <router-link to="/profile">
                    <img src="/user.svg" alt="">
                    <span>Profile</span>
                </router-link>
            </li>
            <li>
                <router-link to="/leaderboard">
                    <img src="/shield.svg" alt="">
                    <span>Leaderboard</span>
                </router-link>
            </li>
            <li>
                <a href="/sign-in">
                    <img src="/logout.svg" alt="">
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<style scoped lang="scss">
.app-mobilenav {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0px -2px 24px 0px rgba(185, 135, 255, 0.23);
    
    @media screen and (min-width: 1024px) {
        display: none;
    }

    ul {

        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 76px;
        padding: 10px 45px;
        align-items: center;

        li {
            list-style-type: none;
            position: relative;

            a {
                text-decoration: none;
                display: flex;
                align-items: center;

                span {
                    font-size: 11px;
                    color: #182E4E;
                    margin-left: 10px;
                    display: none;

                    @media screen and (min-width: 768px) {

                        display: block;
                    }
                }
            }

            &:after {
                content: "";
                height: 2px;
                left: 4.5px;
                margin: 0 auto;
                position: absolute;
                bottom: -5px;
                background: #7C3CE1;
                transition: all .3s ease;
                width: 0;
            }

            &.active,
            &:hover {
                &:after {
                    width: 15px;
                }
            }
        }
    }
}
</style>