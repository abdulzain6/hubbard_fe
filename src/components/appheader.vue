<template>
    <header class="app-header">
        <slot />
    </header>
</template>
<style lang="scss" scoped>
.app-header {
    border-radius: 0px 0px 40px 40px;
    background: linear-gradient(133deg, #7C3CE1 0%, #1614DB 100%);
    width: 375px;
    height: 245px;
    flex-shrink: 0;
    width: 100%;
    position: relative;

    @media screen and (min-width: 768px) {
        height: 290px;
    }

    @media screen and (min-width: 1024px) {
        height: 350px;
    }


    &:before {
        content: "";
        background: #211DB9;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 5px;
        left: 0;
        z-index: -1;
        border-radius: 0px 0px 40px 40px;
    }
}
</style>