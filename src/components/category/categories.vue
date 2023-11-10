<script lang="ts" setup>
import CategoryItem from './categoryitem.vue'
import data from '../../data.json'
import { useUserStore } from '@/store/user'
const store = useUserStore()
</script>
<template>
    <div class="app-categories">
        <div class="app-categories-list">
            <CategoryItem v-for="(scenario, i) in store.activeScenarios" :key="i" :title="scenario.name"
                :description="scenario.description"></CategoryItem>

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