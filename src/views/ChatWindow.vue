<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import AppHeader from '../components/appheader.vue'
import Navbar from '../components/navbar.vue'
import { useUserStore } from '@/store/user';
import { useAiBotStore } from '@/store/ai_bot'
import { useDashboardStore } from '@/store/dashboard'
import { computed } from 'vue';
import Loading from '../components/svg/loading.vue'

import axios from '../axios'

const userStore = useUserStore()
const aiStore = useAiBotStore()
const dashboardStore = useDashboardStore()
const loading = ref(false)
const message = ref('')
const messageHistory = ref('')

const userName = computed(() => {
    return userStore.user.profile.name.split(' ')[0]
})

function getCurrentFormattedDate() {
    const options: any = {
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', options);
}
async function submitQuery() {
    messageHistory.value = message.value
    message.value = ''
    userStore.updateUserChatHistory(message.value)
    dashboardStore.updateChatMessages({
        message: messageHistory.value,
        type: 'user',
        time: getCurrentFormattedDate()
    })

    try {
        loading.value = true
        const response = await axios.post('/api/v1/chat', {
            "question": messageHistory.value,
            "chat_history": dashboardStore.chat_history,
            "get_highest_ranking_response": true,
            "temperature": 0
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dashboardStore.updateChatHistory([messageHistory.value, response.data.ai_response])
        message.value = ''
        dashboardStore.updateChatMessages({
            message: response.data.ai_response,
            type: 'bot',
            time: getCurrentFormattedDate()
        })
    } catch (error: any) {
        if (error.response.status === 401) {
            router.push('/sign-in')
        }
    } finally {
        loading.value = false
    }
}

function formattedText(str: string) {
    return str.replace(/\n\n/g, "<br> <br>");
}

const router = useRouter()
</script>
<template>
    <div>
        <AppHeader>
            <Navbar />
            <div class="chat-head wrapper">
                <div class="back-btn" @click="router.go(-1)">
                    <img src="../../public/back.svg" alt="">

                </div>
                <h2>AI Chat</h2>
            </div>
        </AppHeader>
        <div class="app-chat-window wrapper">
            <div class="app-chat-window-messages">
                <div class="msg ai-msg">
                    <div class="content">
                        <div class="profile">
                            <img src="../../public/chatbot-profile.svg" alt="">
                        </div>
                        <div class="body">
                            <p>
                                Hello, {{ userName }} how can i help you today?
                            </p>
                        </div>
                    </div>
                    <span class="time">{{ getCurrentFormattedDate() }}</span>
                </div>
                <!-- looped message -->
                <div v-for="chat in dashboardStore.chat_messages" class="msg"
                    :class="chat.type === 'user' ? 'user-msg' : 'ai-msg'">

                    <!-- bot message start. -->
                    <div class="content" v-if="chat.type === 'bot'">
                        <div class="profile">
                            <img src="../../public/chatbot-profile.svg" alt="">
                        </div>
                        <div class="body">
                            <p v-html="formattedText(chat.message)">
                            </p>
                        </div>
                    </div>
                    <!-- bot message end. -->
                    <div class="body" v-if="chat.type === 'user'">
                        <p>
                            {{ chat.message }}
                        </p>
                    </div>
                    <span class="time">{{ chat.time }}</span>
                </div>
                <!-- looped message end -->

                <div class="msg ai-msg" :class="{ loading: loading }" v-if="loading">
                    <div class="content">
                        <div class="profile">
                            <img src="../../public/chatbot-profile.svg" alt="">
                        </div>
                        <div class="body">
                            <Loading />
                        </div>
                    </div>
                </div>

            </div>
            <form class="wrapper" @submit.prevent="submitQuery">
                <div class="app-input">
                    <input v-model="message" type="text" placeholder="Type here..." ref="message-box">
                    <button class="cta" type="submit">
                        <img src="../../public/send.svg" />
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped lang="scss">
.chat-head {
    @media screen and (min-width: 1024px) {
        transform: translateY(20px);
    }
}

.app-header {

    @media screen and (min-width: 1024px) {
        height: 235px !important;
    }
}

.app-desktopnav {
    display: none;

    @media screen and (min-width: 1024px) {
        display: flex;
    }
}

.app-header {
    height: 155px;

    .chat-head {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .back-btn {
            cursor: pointer;
            position: absolute;
            left: 35px;

        }

        h2 {
            color: #fff;
            text-align: center;
        }
    }
}

.app-chat-window {
    padding: 35px 35px 115px 35px;

    &-messages {
        height: 350px;
        overflow-y: auto;
        padding-right: 20px;

        @media screen and (min-height: 670px) {
            height: 610px;
            overflow-y: auto;
            padding-right: 20px;
        }


        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar {
            width: 6px;
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, .3);
            background-color: #EFEFFF;
        }

        .msg {

            &:not(:last-child) {
                margin-bottom: 15px;
            }

            .content {
                display: flex;
            }

            &.ai-msg {
                .profile {
                    width: 50px;
                    height: 50px;
                    flex: none;

                    img {
                        width: 100%;
                        object-fit: cover;
                    }
                }

                .body {
                    background: #EFEFFF;
                    border-radius: 10px 25px 25px 25px;
                    padding: 10px;
                    margin-left: 22px;
                    width: 70%;

                    @media screen and (min-width: 420px) {
                        padding: 24px;
                    }


                    @media screen and (min-width: 768px) {
                        width: 60%;
                    }

                    p {
                        word-break: break-word;
                        font-size: 14px;
                        line-height: 20px;
                    }
                }

                &.loading {
                    .body {
                        @media screen and (min-width: 420px) {
                            padding: 0px 10px;
                        }
                    }
                }

                .time {
                    margin-left: 73px;
                    margin-top: 10px;
                }
            }

            .time {
                display: block;
                flex: none;
                color: #808DA4;
                font-size: 12px;
            }

            &.user-msg {
                display: flex;
                justify-content: flex-end;
                flex-direction: column;
                align-items: end;

                .body {
                    border-radius: 25px 10px 25px 25px;
                    background: var(--linear, linear-gradient(133deg, #7C3CE1 0%, #1614DB 100%));
                    padding: 10px;
                    width: 70%;

                    @media screen and (min-width: 420px) {
                        padding: 24px;
                    }

                    @media screen and (min-width: 768px) {
                        width: 60%;
                    }

                    p {
                        color: #fff;
                        font-size: 14px;
                        line-height: 20px;
                    }
                }

                .time {

                    margin-top: 10px;
                }
            }
        }
    }
}

form {

    bottom: 30px;
    width: 95%;
    left: 0;
    right: 0;
    margin: 0 auto;
    position: fixed;

    .app-input {
        position: relative;

        input {
            border-radius: 100px;
            height: 58px;
            width: 100%;
            margin: 0 auto;
            padding: 24px 23px;
            border: none;
            box-shadow: 0px 0px 23px 0px rgb(185 135 255 / 18%);
            background: #fff;

            &:focus-visible {
                outline: none;
            }
        }

        .cta {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 15px;
            top: 2px;
        }
    }
}
</style>