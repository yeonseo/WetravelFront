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
        <div v-for="item in data">
            <div class="header-icon">
                <div class="circle">
                </div>
                <span>위치여기저기</span>
            </div>
            <div class="main-images">
                <div class="image">
                    <img :src="item.img.toString()" />
                </div>
                <div class="posting">
                    <span class="name">{{item.name}}</span>{{item.content}}
                </div>
            </div>
        </div>

    </div>

    <div class="bottom btn">
        <div class="btn-circle" @click="$router.push({name: 'MarkupWrite'})"><span>+</span></div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import BoardService from '@/services/api/board.service';
import BoardScrollService from '@/services/boardScroll/board-scroll.service';

import {reactive, toRefs, onUnmounted, onMounted, inject} from 'vue';

export default {
    name: 'MarkupMain',

    setup() {
        const state = reactive({
            // 게시물 관련
            pageable : {
                page: 0,
                size: 3,
            },

            data: [],

            // 무한 스크롤
            scrollLocation: 0,
            process: false, //중복 방지 플래그
        });

        onMounted(async () => {
            await getList()
        });

        const getList = async (getNext = false) => {
            try {
                let params = {
                    page: state.pageable.page,
                    size: state.pageable.size,
                };

                // const list = await BoardService.getList(params);
                const list = {
                    data : [
                        {
                            name: '임창정형',
                            content: '댄쓰댄쓰~ 땐쏠라잇~ 나의 손을 잡아봐~ 사랑사랑할꺼야~ 너만 좋아할꺼야~',
                            img:'/src/assets/images/image01.jpg'
                        },
                        {
                            name: '임창정형',
                            content: '댄쓰댄쓰~ 땐쏠라잇~ 나의 손을 잡아봐~ 사랑사랑할꺼야~ 너만 좋아할꺼야~',
                            img:'/src/assets/images/image02.jpg'
                        },
                        {
                            name: '임창정형',
                            content: '댄쓰댄쓰~ 땐쏠라잇~ 나의 손을 잡아봐~ 사랑사랑할꺼야~ 너만 좋아할꺼야~',
                            img:'/src/assets/images/image03.jpg'
                        }
                    ]
                }
                state.data = state.data.concat(list.data);

                if(list && list.data){
                    let res = await BoardScrollService.initItem(list, getNext)
                    state.data = res.data
                    state.hasNext = true
                    // state.data = res.data
                    // state.hasNext = res.hasNext

                    state.process = false;
                }
            } catch (e) {
                console.log(e);
                state.data = [];
            }
        };

        const onScrollHandle = async (e) => {
            // 인피니티 스크롤
            let screen = window.screen.height
            let scroll = window.scrollY
            let body = document.body.scrollHeight

            if (screen + scroll >= body - (screen*0.2) && state.hasNext) {
                if(state.process) return;
                state.process = true;
                state.pageable.page += 1

                await getList(true);
            }
        };

        window.addEventListener('scroll', onScrollHandle);

        onUnmounted(() => {
            window.removeEventListener('scroll', onScrollHandle)
        });

        const thisClick = () => {
            alert("HI")
        }

        return {
            ...toRefs(state),
            thisClick
        }
    },
    components: {
        Header,
    }
}
</script>