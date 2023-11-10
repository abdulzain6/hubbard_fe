<script lang="ts" setup>
import AppHeader from '../components/appheader.vue'
import AppMobileNav from '../components/mobilenav.vue'
import Navbar from '../components/navbar.vue'
</script>
<template>
    <div>
        <AppHeader>
            <Navbar />
            <h1 class="header-title">
                Feedback
            </h1>
            <div class="app-user-profile">
                <img src="../../public/write.svg" alt="">
            </div>
        </AppHeader>
        <div class="main">
            <div class="review">
                <div class="header">
                    <span class="name">Marvin McKinney</span>
                    <span class="username">@marvinmc</span>
                </div>
                <div class="body">
                    <span class="title">Enjoy Our App</span>
                    <span class="subtitle">
                        If you enjoy using our app, <br>
                        please rate us.
                    </span>
                    <div class="stars">
                        <img src="../../public/star-active.svg" alt="">
                        <img src="../../public/star-active.svg" alt="">
                        <img src="../../public/star-active.svg" alt="">
                        <img src="../../public/star.svg" alt="">
                        <img src="../../public/star.svg" alt="">
                    </div>
                </div>
                <form>
                    <h3>Send Feedback</h3>
                    <textarea placeholder="Enter review here..." name="" id="" cols="30" rows="10"></textarea>
                    <button class="cta">Submit</button>
                </form>
            </div>
        </div>
        <AppMobileNav />

    </div>
</template>
<style scoped lang="scss">
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

.main {
    max-width: 620px;
    margin: 0 auto;
    margin-top: 5rem;
    width: 90%;
    padding-bottom: 100px;

    @media screen and (min-width: 420px) {
    width: 390px;
    }
}

.review {
    .header {
        text-align: center;

        .name {
            display: block;
            font-size: 14px;
            font-weight: bold;
            color: #182E4E;
        }

        .username {
            color: #182E4E;
            opacity: 0.7;
            font-size: 12px;
            margin-top: 7px;
            display: block;
        }
    }

    .body {
        border-radius: 22px;
        background: var(--ffffff, #FFF);
        box-shadow: 0px 0px 23px 0px rgba(185, 135, 255, 0.11);
        padding: 20px 10px;
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;

        .title {
            display: block;
            font-weight: bold;
            color: #182E4E;
        }

        .subtitle {
            font-size: 13px;
            margin: 15px 0;
            display: block;
            color: #808DA4;
        }


        .stars {
            img {
                width: 18px;

                &:not(:last-child) {

                    margin-right: 10px;
                }
            }
        }
    }
}


form {
    h3 {
        color: #182E4E;
        font-size: 17px;
        margin-bottom: 12px;
    }

    textarea {
        border-radius: 22px;
        background: var(--ffffff, #FFF);
        box-shadow: 0px 0px 23px 0px rgba(185, 135, 255, 0.11);
        border: none;
        width: 100%;
        margin-bottom: 10px;
        outline: none;
        padding: 20px;

        &:placeholder {
            color: #808DA4;
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