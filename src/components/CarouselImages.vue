<template>
    <v-carousel cycle height="100%" hide-delimiter-background show-arrows="hover">
        <v-carousel-item v-for="(image, i) in images" :key="i">
            <v-sheet>
                <!-- <div class="d-flex fill-height justify-center align-center"> -->
                   <v-img :src="image"></v-img>
                <!-- </div> -->
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    data() {
        return {
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
            images: [
                "https://static.hm.com.cn/media/tool/template/images/2023/11/14/t/e/teaser-pc.jpg",
                "https://static.hm.com.cn/media/tool/template/images/2023/11/14/1/5/1509b-3x2-1_compressed.jpg",
                "https://static.hm.com.cn/media/tool/template/images/2023/11/14/5/0/5038f-3x2-1_compressed.jpg",
                "https://static.hm.com.cn/media/tool/template/images/2023/11/15/t/e/teaser-logo.jpg"
            ]
        }
    },
}
</script>