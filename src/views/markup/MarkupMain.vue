<template>
    <div class="main-top logo">
        <span>logo</span>
    </div>

    <div class="main-top icons">
        <a class="location" v-for="index in 10" @click="thisClick()">
            <div class="circle">
            </div>
            <p>위치여기저기</p>
        </a>
    </div>

    <div class="main-list">
        <div class="main-images" v-for="index in 3">

        </div>

        <div class="posting">

        </div>
    </div>
</template>

<script>
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
    }
}
</script>