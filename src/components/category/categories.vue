<script lang="ts" setup>
import CategoryItem from './categoryitem.vue'
import { useUserStore } from '@/store/user'
import { ChatTypeEnum, useAiBotStore, type ChatSettings } from '@/store/ai_bot';
import { useRouter } from 'vue-router';
const userStore = useUserStore()
const router = useRouter()
const botStore = useAiBotStore()
async function setEvaluateOption(settings: ChatSettings) {
    botStore.setChat(ChatTypeEnum.evaluate, settings)
    botStore.clearChat()
    router.push('/chat')
}
</script>
<template>
    <div class="app-categories">
        <div class="app-categories-list">
            <CategoryItem v-for="(scenario, i) in userStore.activeScenarios" :key="i" :title="scenario.name"
                :description="scenario.description" @click="setEvaluateOption({
                    scenario: scenario.name,
                    description: scenario.description,
                    difficulty: scenario.difficulty
                })"></CategoryItem>

        </div>
    </div>
</template>
<style scoped lang="scss">
.app-categories {
    background: #DFE3F2;
    padding: 54px 20px 74px 20px;
    margin-top: -30px;

    &-list {

        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        @media screen and (min-width: 768px) {
            justify-content: center;
        }


        @media screen and (min-width: 1024px) {
            width: 1000px;
        }
    }
}
</style>