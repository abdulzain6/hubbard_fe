<script setup lang="ts">
import AppHeader from '../components/appheader.vue'
import AppMobileNav from '../components/mobilenav.vue'
import Navbar from '../components/navbar.vue'
import { useUserStore } from '@/store/user';
const userStore = useUserStore()
const series = [{
    name: 'Series 1',
    data: [0, 80],
}, {
    name: 'Series 2',
    data: [20, 30, 40, 80, 20, 80],
}, {
    name: 'Series 3',
    data: [44, 76, 78, 13, 43, 10],
}]
const chartOptions = {
    chart: {
        height: 350,
        type: 'radar',
    },
    xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June']
    }
}
userStore.getLeaderboard()
</script>
<template>
    <div>
        <AppHeader>
            <Navbar />
            <h1 class="header-title">
                Leaderboard
            </h1>
        </AppHeader>
        <div class="leaderboard-view">
            <div class="app-badges">
                <div class="badge-icons">
                    <h3>Badges</h3>
                    <img src="/badge_diamond.png" alt="">
                    <img src="/badge_camera.png" alt="">
                    <img src="/badge_bone.png" alt="">
                    <img src="/badge_thumb.png" alt="">
                    <img src="/badge_smile.png" alt="">
                </div>
            </div>
            <div class="app-radar-graph">
                <div id="chart">
                    <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>

                </div>
            </div>
            <div class="app-leaderboard">
                <div class="app-leaderboard-head">
                    <div class="user" v-if="userStore.score.leaderboard[1]">
                        <div class="thumbnail">
                            <img src="/user-portrait.jpg" alt="">
                            <span class="place">2</span>
                        </div>
                        <div class="points">
                            <span class="name">
                                Lucas Jack
                            </span>
                            <span class="total-points">
                                23750 Points
                            </span>
                        </div>
                    </div>
                    <div v-else class="user">
                        <div class="thumbnail">
                            <img src="/Unknown_person.jpg" alt="">
                            <span class="place">--</span>
                        </div>
                        <div class="points">
                            <span class="name">
                                --
                            </span>
                            <span class="total-points">
                                --
                            </span>
                        </div>
                    </div>
                    <div class="user" v-if="userStore.score.leaderboard[0]">
                        <div class="thumbnail">
                            <img src="/user-portrait2.jpeg" alt="">
                            <span class="place">1</span>
                        </div>
                        <div class="points">
                            <span class="name">
                                {{ userStore.score.leaderboard[0][0] }}
                            </span>
                            <span class="total-points">
                                {{ userStore.score.leaderboard[0][1] }} points
                            </span>
                        </div>
                    </div>
                    <div class="user" v-if="userStore.score.leaderboard[2]">
                        <div class="thumbnail">
                            <img src="/user-portrait3.jpg" alt="">
                            <span class="place">3</span>
                        </div>
                        <div class="points">
                            <span class="name">
                                Hasan Nisar
                            </span>
                            <span class="total-points">
                                22500 Points
                            </span>
                        </div>
                    </div>
                    <div v-else class="user">
                        <div class="thumbnail">
                            <img src="/Unknown_person.jpg" alt="">
                            <span class="place">--</span>
                        </div>
                        <div class="points">
                            <span class="name">
                                --
                            </span>
                            <span class="total-points">
                                --
                            </span>
                        </div>
                    </div>
                </div>
                <div class="app-leaderboard-list">
                    <div class="leaderboard-item" v-for="(user,i) in userStore.score.leaderboard" :key="i">
                        <div class="leaderboard-item-thumbnail-container">
                            <div class="leaderboard-item-thumbnail">
                                <img src="/user-portrait2.jpeg" alt="">
                                <span class="leaderboard-item-place">{{ i + 1 }}</span>

                            </div>
                            <span class="leaderboard-item-name">{{ user[0] }}</span>
                        </div>
                        <span class="leaderboard-item-points">{{ user[1] }} points</span>
                    </div>
                </div>
            </div>
        </div>
        <AppMobileNav />
    </div>
</template>
<style scoped lang="scss">
.leaderboard-view {
    padding-bottom: 140px;
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
}

.app-badges {

    border-radius: 0px 0px 20px 20px;
    background: linear-gradient(133deg, rgba(124, 60, 225, 0.05) 0%, rgba(22, 20, 219, 0.05) 100%);
    transform: translateY(-30px);
    padding: 70px 20px 50px 20px;

    h3 {
        color: #182E4E;
        margin-bottom: 11px;
        font-size: 16px;
    }

    .badge-icons {
        max-width: 1024px;
        margin: 0 auto;

        img {
            &:not(:last-child) {
                margin-right: 20px;
            }
        }
    }

}

.app-leaderboard {
    margin: 90px auto 0 auto;

    .app-leaderboard-head {
        display: flex;
        justify-content: space-between;
        transform: translateX(-13px);
        max-width: 300px;
        margin: 0 auto;

        @media screen and (min-width: 420px) {
            max-width: 400px;
            transform: translateX(-35px);
        }

        .user {
            display: flex;
            flex-direction: column;
            flex: none;
            width: calc(100% / 3 - 10px);

            &:first-child {
                img {

                    border: 6px solid #26ADDD;
                }

                .place {
                    background: #26ADDD;
                }

                .total-points {
                    color: #26ADDD;
                }
            }

            &:nth-child(2) {
                margin: 0 25px;

                @media screen and (min-width: 420px) {
                    margin: 0 50px;
                }

                .thumbnail {
                    transform: translateY(-33px) scale(1.4);
                }

                img {

                    border: 6px solid #7C3CE1;
                }

                .place {
                    background: #7C3CE1;
                }

                .total-points {
                    color: #7C3CE1;
                }
            }

            &:nth-child(3) {
                img {

                    border: 6px solid #4D7FFF;
                }

                .place {
                    background: #4D7FFF;
                }

                .total-points {
                    color: #4D7FFF;
                }
            }

            .thumbnail {
                width: 100%;
                position: relative;
                height: 90px;


                @media screen and (min-width: 420px) {
                    height: 129px;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 100%;
                }

                span {
                    position: absolute;
                    left: 0;
                    right: 0;
                    text-align: center;
                    bottom: -12px;
                    border-radius: 100%;
                    background: red;
                    width: 30px;
                    height: 30px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: bold;
                }
            }

            .points {
                margin-top: 30px;
                text-align: center;

                span {
                    display: block;
                }

                .name {
                    font-size: 14px;
                    color: #182E4E;
                    font-weight: bold;
                }

                .total-points {
                    font-size: 12px;
                    margin-top: 8px;
                    font-weight: bold;
                }
            }
        }
    }
}


.app-leaderboard-list {
    display: flex;
    flex-direction: column;
    max-height: 350px;
    overflow-y: auto;
    padding: 10px;
    max-width: 1024px;
    margin: 40px auto 0 auto;

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
        background-color: #7C3CE1;
    }

    .leaderboard-item {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        border-radius: 100px;
        background: #fff;
        box-shadow: 0px 0px 23px 0px rgba(185, 135, 255, 0.11);
        padding: 6px 19px 6px 9px;
        margin-bottom: 15px;

        .leaderboard-item-thumbnail-container {
            display: flex;
            align-items: center;
        }

        &-thumbnail {
            width: 50px;
            height: 50px;
            position: relative;
            margin-right: 15px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
                object-fit: cover;
            }


            .leaderboard-item-place {
                height: 20px;
                width: 20px;
                font-size: 10px;
                background: #7C3CE1;
                text-align: center;
                justify-content: center;
                display: flex;
                align-items: center;
                color: #fff;
                position: absolute;
                bottom: 0;
                right: 0;
                border-radius: 100%;
                border: 1px solid #fff;
            }
        }

        &-name {
            font-size: 12px;
            font-weight: bold;
        }


        &-points {
            font-size: 12px;
            color: #7C3CE1;
            font-weight: bold;
        }
    }
}
</style>