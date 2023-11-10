<script lang="ts" setup>
import { reactive, watch } from 'vue';
import axios from '../../axios'

import { useUserStore } from '@/store/user';

const userStore = useUserStore()

const formData = reactive({
    email: "",
    password: "",
    name: "",
    country: "",
    phone: ""
})

async function signup() {
    if (!validateForm()) {
        return userStore.setMessage({ message: 'Must input all fields', type: 'error' })
    }
    userStore.register(formData)
}

function validateForm() {
    return (
        formData.email.trim() !== '' &&
        formData.password.trim() !== '' &&
        formData.name.trim() !== '' &&
        formData.country.trim() !== '' &&
        formData.phone.trim() !== ''
    );
}

</script>
<template>
    <div class="app-signup-screen">
        <form class="app-form" @submit.prevent="signup">
            <h3>Sign up</h3>
            <div class="app-input">
                <div class="app-input-icon">
                    <img src="../../../public/email.svg" />
                </div>
                <input v-model="formData.email" placeholder="Email" type="text" />
            </div>
            <div class="app-input">

                <div class="app-input-icon">
                    <img src="../../../public/lock.svg" />
                </div>
                <input v-model="formData.password" placeholder="Password" type="password" />

            </div>
            <div class="app-input">

                <div class="app-input-icon">
                    <img src="../../../public/user-2.svg" />
                </div>
                <input v-model="formData.name" placeholder="Name" type="text" />

            </div>
            <div class="app-input">

                <div class="app-input-icon">
                    <img src="../../../public/email.svg" />
                </div>
                <input v-model="formData.country" placeholder="Country" type="text" />

            </div>

            <div class="app-input">

                <div class="app-input-icon">
                    <img src="../../../public/phone.svg" />
                </div>
                <input v-model="formData.phone" placeholder="Phone" type="text" />

            </div>
            <button class="cta" type="submit">Signup</button>

            <span :class="userStore.message.type === 'error' ? 'error' : 'success'" v-if="userStore.message">
                {{ userStore.message.message }}
            </span>
        </form>
        <div class="signup-footer">
            <span>
                Already have an account?
                <router-link to="sign-in">
                    Sign in
                </router-link>
            </span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.app-signup-screen {
    width: 325px;
    margin: 0 auto;
    height: 100%;

    @media screen and (min-width: 768px) {
        width: 450px;
    }

    .signup-footer {
        text-align: center;
        bottom: 1.5rem;
        left: 0;
        right: 0;
        font-size: 14px;
        margin: 35px auto;

        @media screen and (min-width: 768px) {
            width: 450px;
            position: absolute;
            margin: 0 auto;
        }

        span {
            a {
                color: #7C3CE1;
                text-decoration: none;
            }
        }
    }
}

.app-form {
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;
    position: relative;


    .error {
        color: red;
        font-size: 12px;
    }

    .success {
        color: green;
        font-size: 12px;
    }

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
</style>