<template>
    <div class="circle-flow">
        <!-- <img class="circle circle-lg" src="../../assets/circle-flow.png" alt=""> -->
        <img class="circle base" src="../../../public/circle-flow.png" alt="Ellipse" />
        <img class="circle lg" src="../../../public/circle-flow-lg.png" alt="Ellipse" />
        <img class="circle xl" src="../../../public/circle-flow-xl.png" alt="Ellipse" />
        <slot />
    </div>
</template>
<style scoped lang="scss">
.circle-flow {

    position: relative;
    overflow: hidden;

    @media screen and (min-width: 768px) {
        height: 290px;
    }

    @media screen and (min-width: 1024px) {
        height: 350px;
    }

    .circle {
        width: 375px;
        margin: 0 auto;
        display: block;


        &.lg,
        &.xl {
            display: none;
        }

        @media screen and (min-width: 768px) {
            width: 730px;


            &.base,
            &.xl {
                display: none;
            }

            &.lg {
                display: block;
            }
        }

        @media screen and (min-width: 1024px) {
            width: 884px;

            &.base,
            &.lg {
                display: none;
            }

            &.xl {
                display: block;
            }
        }

    }
}
</style>