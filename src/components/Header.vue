<template>
    <div class="main-top logo" v-if="isBack">
        <i class="fa-solid fa-arrow-left mr-10" @click="$router.go(-1)"></i>
        <span>{{title}}</span>
    </div>

    <div class="main-top logo" v-else>
        <span>We Travel</span>
    </div>
</template>
<script>
export default {
    props: ['isBack', 'title'],
}
</script>