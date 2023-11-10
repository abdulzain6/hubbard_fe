<script lang="ts" setup>

defineProps({
    icon: String,
    title: String,
    description: String
})

function renderImg(str: any) {
    return new URL(str, import.meta.url).toString()
}

</script>
<template>
    <div class="category-item">
        <img :src="`/edit.svg`" :alt="title">
        <h3>{{ title }}</h3>
        <p>
            {{ description }}
        </p>
    </div>
</template>
<style scoped lang="scss">
.category-item {
    width: 156px;
    height: 150px;
    padding: 15px;
    border-radius: 22px;
    background: linear-gradient(224deg, #FFF 0%, #FFF 0.01%, #FFF 16.02%);
    box-shadow: 0px 0px 23px 0px rgba(185, 135, 255, 0.11);
    margin-right: 0;
    width: calc(100% / 2 - 10px);

    @media screen and (min-width: 768px) {    
        width: calc(100% / 3 - 10px);
        margin-right: 20px;
        height: 190px;
    }
    
    @media screen and (min-width: 768px) {    
        width: calc(100% / 4 - 10px);
        max-width: 215px
    }


    &:not(:last-child) {
        margin-bottom: 25px;
    }

    img {
        width: 36px;
        margin-bottom: 10px;
    }

    h3 {
        font-size: 16px;
        color: #182E4E;
        margin-bottom: 8px;
    }

    p {
        color: #808DA4;
        font-size: 12px;
        width: 95%;
        display: block;
    }
}
</style>