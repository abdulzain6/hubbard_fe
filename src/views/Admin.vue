<script lang="ts" setup>
import { ref, reactive } from 'vue'
import AppHeader from '../components/appheader.vue'
import AppMobileNav from '../components/mobilenav.vue'
import Navbar from '../components/navbar.vue'
import axios from '../axios'
import { useUserStore } from '@/store/user'
import Loading from '@/components/svg/loading.vue'
import Dialog from 'primevue/dialog';
import { toast, Toaster } from 'vue-sonner'
const difficultyEnum = ['A', 'B', 'C']
const importanceEnum = [1, 2, 3]
const saved = ref(false)
const userStore = useUserStore()
const theme = ref('')
const loading = ref(false)
const saving = ref(false)
const errorMsg = ref('')
const dialog = ref(false)

let scenarioForm = reactive({
    name: '',
    description: '',
    scenario_description: '',
    best_response: '',
    response_explanation: '',
    difficulty: '',
    importance: 0
})

async function generateScenario() {
    try {
        saved.value = false
        errorMsg.value = ''
        loading.value = true
        const { data } = await axios.post(`/api/v1/scenarios/generate_scenario`, {theme: theme.value})
        userStore.updateScenario(data)
    } catch (error: any) {
        errorMsg.value = error.response.data.detail
    } finally {
        loading.value = false
    }
}

function onConfirm() {
    dialog.value = false
    saved.value = false
    userStore.updateScenario(scenarioForm)
}

async function saveScenario() {
    if (!difficultyEnum.includes(scenarioForm.difficulty)) {
        toast.error(`Difficulty must be any of the following: ${difficultyEnum}`)
        return
    }
    if (!importanceEnum.includes(scenarioForm.importance)) {
        toast.error( `Importance must be any of the following: ${importanceEnum}`)
        return
    }
    try {
        errorMsg.value = ''
        loading.value = true
        saving.value = true
        const res = await axios.post('/api/v1/scenarios/create_scenario', scenarioForm)
        if(res) {
           saved.value = true
        }
    } catch (error: any) {
        errorMsg.value = error.response.data.detail
    } finally {
        loading.value = false
        saving.value = false
        dialog.value = false
    }
}
</script>
<template>
    <Toaster position="top-center"/>
    <div>
        <AppHeader>
            <Navbar />
            <h1 class="header-title">
                Admin
                <img src="../../public/edit-pen.svg" alt="">
            </h1>
            <div class="app-user-profile">
                <img src="../../public/profile.svg" alt="">
            </div>
        </AppHeader>
        <AppMobileNav />
    </div>
    <div class="main">
        <Dialog v-model:visible="dialog" modal header="Create Scenario" :style="{ width: '50vw' }">
            <form class="app-form manualScenario" @submit.prevent="saveScenario">
                <div class="app-input">
                    <input required v-model="scenarioForm.name" placeholder="Name" type="text" />
                </div>
                <div class="app-input">
                    <input required v-model="scenarioForm.description" placeholder="Description" type="text" />
                </div>
                <div class="app-input">
                    <input required v-model="scenarioForm.scenario_description" placeholder="Details" type="text" />
                </div>
                <div class="app-input">
                    <input required v-model="scenarioForm.best_response" placeholder="Best Response" type="text" />
                </div>
                <div class="app-input">
                    <input required v-model="scenarioForm.response_explanation" placeholder="Response Explanation"
                        type="text" />
                </div>
                <div class="app-input">
                    <input required v-model="scenarioForm.difficulty" placeholder="difficulty" type="text" />
                    <span class="legend">[ A, B, C ]</span>
                </div>
                <div class="app-input">
                    <input required v-model="scenarioForm.importance" placeholder="Importance" type="number" />
                    <span class="legend">[ 1, 2, 3 ]</span>
                </div>
                <button class="cta" type="button" @click="onConfirm">Done</button>
                <span class="empty_placeholder" v-if="saving">
                    {{ saving ? 'Saving Scenario...' : 'Generated Scenario will be shown here...' }}
                </span>
                <span class="empty_placeholder" v-if="errorMsg">
                    ⚠️ {{ errorMsg }}
                </span>
            </form>
        </Dialog>

        <form class="wrapper generateScenarioForm" @submit.prevent="generateScenario">
            <div class="app-input">
                <button class="anchor-btn" type="button" @click="dialog = true">Or create manually.</button>
                <input v-model="theme" type="text" placeholder="Type in scenario theme." ref="message-box">
                <button class="cta" type="submit">
                    <img src="../../public/send.svg" />
                </button>
            </div>
        </form>
        <div class="loading-block" v-if="loading">
            <Loading />
        </div>
        <div class="scenario_generated" v-if="userStore.scenario.name && !loading">

            <div class="block">
                <label>Name:</label>
                <p>
                    {{ userStore.scenario.name }}
                </p>
            </div>
            <div class="block">
                <label>Description:</label>
                <p>
                    {{ userStore.scenario.description }}
                </p>
            </div>
            <div class="block">
                <label>Scenario:</label>
                <p>
                    {{ userStore.scenario.scenario }}
                </p>
            </div>
            <div class="block">
                <label>Best Response:</label>
                <p>
                    {{ userStore.scenario.best_response }}
                </p>
            </div>
            <div class="block">
                <label>Explanation:</label>
                <p>
                    {{ userStore.scenario.explanation }}
                </p>
            </div>
            <div class="block">
                <label>Difficulty:</label>
                <p>
                    {{ userStore.scenario.difficulty }}
                </p>
            </div>
            <div class="block">
                <label>Importance:</label>
                <p>
                    {{ userStore.scenario.importance }}
                </p>
            </div>

            <button class="cta" type="button" @click="saveScenario" :disabled="saved">{{ saved ? 'Saved' : 'Save Scenario' }}</button>

        </div>
        <span class="empty_placeholder" v-else>
            {{ saving ? 'Saving Scenario...' : 'Generated Scenario will be shown here...' }}
        </span>
        <span class="empty_placeholder" v-if="errorMsg">
            ⚠️ {{ errorMsg }}
        </span>
    </div>
</template>
<style scoped lang="scss">
.anchor-btn {
    text-decoration: underline;
    background: none;
    border: none;
    position: absolute;
    left: 22px;
    bottom: -20px;
    cursor: pointer;
    font-size: 12px;
    color: #6131df;
}

.legend {
    display: block;
    font-size: 10px;
    position: absolute;
    left: 4px;
}

.scenario_generated {
    height: 350px;
    overflow-y: auto;
    padding-right: 10px;
    padding-bottom: 30px;


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

    .block {

        label,
        p {
            font-size: 12px;
            line-height: 18px;
            word-break: break-word;
        }

        label {
            margin: 10px 0;
            font-weight: bold;
            display: block;
        }
    }
}

.loading-block {

    font-size: 12px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin-right: 1rem;
    }
}

.generateScenarioForm {

    bottom: 90px;
    width: 50%;
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
.cta::disabled {
    opacity: 0.8;
}
.empty_placeholder {
    padding: 10px;
    font-size: 12px;
    text-align: center;
    margin: 1rem auto;
    width: 100%;
    display: block;
    color: darkgrey;
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
}

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

            padding: 15px;
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