<script lang="ts" setup>
import AppHeader from '../components/appheader.vue'
import RobotIcon from '../components/icons/roboticon.vue'
import CircleFlow from '../components/svg/circle-flow.vue'
import Login from '../components/forms/applogin.vue'
import { Toaster } from 'vue-sonner'

</script>
<template>
    <div>
        <Toaster position="top-center"/>
        <AppHeader>
            <CircleFlow>
                <RobotIcon />
            </CircleFlow>
        </AppHeader>
        <Login></Login>
    </div>
</template>
<style scoped lang="scss">
.robot-icon {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -48px;
}
</style>