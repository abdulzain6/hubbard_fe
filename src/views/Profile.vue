<script lang="ts" setup>
import { reactive } from 'vue';
import AppHeader from '../components/appheader.vue'
import AppMobileNav from '../components/mobilenav.vue'
import Navbar from '../components/navbar.vue'
import { useUserStore } from '@/store/user'
import { Toaster } from 'vue-sonner'
const store = useUserStore()

const { name, email, phone, country } = store.user.profile

const formData = reactive({
    email: email,
    name: name,
    country: '',
    password: '',
    phone: ''
})


async function updateUser() {
    store.updateUser(formData)
}

</script>
<template>
    <div>
        <Toaster position="top-center"/>
        <AppHeader>
            <Navbar />
            <h1 class="header-title">
                Profile
                <img src="../../public/edit-pen.svg" alt="">
            </h1>
            <div class="app-user-profile">
                <img src="../../public/profile.svg" alt="">
            </div>
        </AppHeader>
        <div class="main">
            <div class="header">
                <span class="name">{{ name }}</span>
                <span class="username">@{{ email }}</span>
            </div>

            <form class="app-form" @submit.prevent="updateUser">
                <div class="app-input">
                    <div class="app-input-icon">
                        <img src="../../public/email.svg" />
                    </div>
                    <input v-model="formData.email" :placeholder="email ?? 'Email'" type="text" />
                </div>

                <div class="app-input">
                    <div class="app-input-icon">
                        <img src="../../public/user-2.svg" />
                    </div>
                    <input v-model="formData.name" :placeholder="name ?? 'Name'" type="text" />
                </div>
                <div class="app-input">
                    <div class="app-input-icon">
                        <img src="../../public/email.svg" />
                    </div>
                    <input v-model="formData.country" :placeholder="country ?? 'Country'" type="text" />
                </div>
                <div class="app-input">
                    <div class="app-input-icon">
                        <img src="../../public/lock.svg" />
                    </div>
                    <input v-model="formData.password" type="password" placeholder="Password" />
                </div>
                <div class="app-input">
                    <div class="app-input-icon">
                        <img src="../../public/phone.svg" />
                    </div>
                    <input v-model="formData.phone" :placeholder="phone ?? 'Phone'" type="text" />
                </div>

                <button class="cta" type="submit">Save</button>
            </form>
        </div>

        <AppMobileNav />
    </div>
</template>
<style lang="scss" scoped>
.app-form {
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;

    h3 {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        margin-bottom: 23px;
        color: #182E4E;
    }

    .app-input {
        position: relative;

        &:not(:last-child) {
            margin-bottom: 20px;
        }

        input {

            padding: 15px 15px 15px 48px;
            width: 100%;

            border-radius: 50px;
            border: 1px solid #E8EFF3;
            background: var(--ffffff, #FFF);
            box-shadow: 0px 0px 23px 0px rgba(185, 135, 255, 0.11);
            transition: all .3s ease;


            &:hover,
            &:focus,
            &:active {
                border: 1px solid #874EDC !important;
            }

            &:focus-visible {
                border: none;
                outline: none;
            }


            &:placeholder {
                color: #182E4E;
                font-size: 12px;
            }
        }

        .app-input-icon {
            position: absolute;
            top: 15px;
            left: 16px;
            width: 18px;

            img {
                width: 100%;
            }
        }
    }
}

.main {

    max-width: 620px;
    margin: 0 auto;
    margin-top: 5rem;
    padding-bottom: 100px;
    width: 90%;

    @media screen and (min-width: 420px) {
        width: 390px;
    }

    .header {
        text-align: center;

        .name {
            display: block;
            font-size: 14px;
            font-weight: bold;
            color: #182E4E;
        }

        .username {
            color: #182E4E;
            opacity: 0.7;
            font-size: 12px;
            margin-top: 7px;
            display: block;
        }
    }
}

.header-title {
    color: #fff;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -14px;
    font-size: 23px;

    img {
        position: absolute;
        right: 30px;
        top: -10px;
        cursor: pointer;

        @media screen and (min-width: 1024px) {
            display: none;
        }
    }
}

.app-user-profile {
    background: #DFE3F2;
    height: 130px;
    width: 130px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -66px;
    border: 12px solid #fff;



    img {}
}
</style>