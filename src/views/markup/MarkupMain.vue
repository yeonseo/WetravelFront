<template>
    <Header />

    <div class="main-top icons">
        <a class="location" v-for="index in 10" @click="thisClick()">
            <div class="circle">
            </div>
            <p>위치여기저기</p>
        </a>
    </div>

    <div class="main-list">


        <div class="header-icon">
            <div class="circle">
            </div>
            <span>위치여기저기</span>
        </div>
        <div class="main-images">
            <div class="image">
                <img src="@/assets/images/image01.jpg" />
            </div>
            <div class="posting">
                <span class="name">임창정형</span> 댄쓰댄쓰~ 땐쏠라잇~ 나의 손을 잡아봐~ 사랑사랑할꺼야~ 너만 좋아할꺼야~
            </div>
        </div>

        <div class="header-icon">
            <div class="circle">
            </div>
            <span>위치여기저기</span>
        </div>
        <div class="main-images">
            <div class="image">
                <img src="@/assets/images/image02.jpg" />
            </div>
            <div class="posting">
                <span class="name">임창정형</span> 댄쓰댄쓰~ 땐쏠라잇~ 나의 손을 잡아봐~ 사랑사랑할꺼야~ 너만 좋아할꺼야~
            </div>
        </div>

        <div class="header-icon">
            <div class="circle">
            </div>
            <span>위치여기저기</span>
        </div>
        <div class="main-images">
            <div class="image">
                <img src="@/assets/images/image03.jpg" />
            </div>
            <div class="posting">
                <span class="name">임창정형</span> 댄쓰댄쓰~ 땐쏠라잇~ 나의 손을 잡아봐~ 사랑사랑할꺼야~ 너만 좋아할꺼야~
            </div>
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    name: 'MarkupMain',

    setup() {
        const thisClick = () => {
            alert("HI")
        }

        return {
            thisClick
        }
    },
    components: {
        Header,
    }
}
</script>