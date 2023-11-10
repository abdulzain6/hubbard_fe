<script lang="ts" setup>
import { reactive } from 'vue';

import { useUserStore } from '@/store/user';

const userStore = useUserStore()

const formData = reactive({
    username: '',
    password: ""
})

async function onLogin() {
    if (!formData.username || !formData.password) {
        return userStore.setMessage({
            message: "Email and Username is required.",
            type: "error"
        })
    }

    userStore.login(formData)
}

</script>
<template>
    <div class="app-login-screen">
        <form class="app-form" @submit.prevent="onLogin">
            <h3>Login</h3>
            <div class="app-input">
                <div class="app-input-icon">
                    <img src="../../../public/email.svg" />
                </div>
                <input v-model="formData.username" placeholder="Email" type="text" />
            </div>
            <div class="app-input">

                <div class="app-input-icon">
                    <img src="../../../public/lock.svg" />
                </div>
                <input v-model="formData.password" placeholder="Password" type="password" />

            </div>
            <button class="cta" type="submit">Login</button>

            
            <span :class="userStore.message.type === 'error' ? 'error' : 'success'" v-if="userStore.message">
                {{ userStore.message.message }}
            </span>
        </form>
        <div class="login-option">
            <div class="login-option-head">
                <div class="line"></div>
                <span>or</span>

                <div class="line"></div>
            </div>
            <div class="login-option-actions">
                <button class="cta transparent">
                    <img src="../../../public/google.svg" />
                </button>
                <button class="cta">
                    <img src="../../../public/facebook.svg" />
                </button>
            </div>
        </div>
        <div class="login-footer">
            <span>
                Don't have an account?
                <router-link to="/sign-up">
                    Sign up
                </router-link>
            </span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.app-login-screen {
    width: 325px;
    margin: 0 auto;
    height: 100%;

    @media screen and (min-width: 768px) {
        width: 450px;
    }

    .login-option {

        &-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 40px 0;

            .line {
                width: calc(100% / 2 - 30px);
                background: #182E4E;
                height: 1px;
                display: block;
                opacity: 0.2;
            }

            span {
                text-transform: uppercase;
                opacity: 0.5;
                font-size: 12px;
            }
        }

        &-actions {
            display: flex;
            justify-content: space-between;

            button {
                width: calc(100% / 2 - 10px);
            }
        }
    }

    .login-footer {
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