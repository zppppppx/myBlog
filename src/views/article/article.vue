<template>
    <navbar />

    <div class="article-head" :style="imageCover">
        <img :src="article.image_cover">
        <div class="article-info">
            caption
        </div>
    </div>

    <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css2?family=Tillana:wght@500;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
        integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0" crossorigin="anonymous">

    <div class="article-wrap">
        <div v-html="article.html" class="article"></div>
    </div>
</template>

<script>
import axios from 'axios';
import 'md-editor-v3/lib/style.css';
const appUrl = import.meta.env.VITE_APP_URL
import navbar from '../../components/navbar.vue';
import '../../stylesheet/article.css';

export default {
    data() {
        return {
            article: {
                html: ''
            },
            query: {}
        }
    },

    created() {
        Object.assign(this.query, this.$route.query)
        axios.get(`${appUrl}admin/getArticle`, { params: this.query })
            .then(res => {
                Object.assign(this.article, res.data)
            })
    },

    computed: {
        imageCover() {
            return {
                '--image-cover': this.article.image_cover
                // '--image-cover':'https://d585tldpucybw.cloudfront.net/sfimages/default-source/default-album/element-style.png?sfvrsn=fd8e5f5a_1'
            }
        }
    },

    components: {
        navbar
    }
}
</script>

<style scoped lang="less">
:root {
    --image-url: var(--image-cover);
}

.article-head {
    width: 100%;
    height: 300px;

    /* background-color: black; */
    position: relative;
    /* background: var(--image-cover) no-repeat center center fixed; */
    background-image: var(--image-url);
    /* background-size: cover; */

    overflow: hidden;
    animation-name: fadeInDown;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .article-info {
        // align-self: flex-end;
        bottom: 10px;
        position: absolute;
        z-index: 1;
        position: absolute;
    }

    @media (max-width: 768px) {
        .article-info {
            background-color: #fff;
        }
    }
}



.container {
    width: 600px;
    height: 400px;
    position: relative;
    background: var(--image-cover) no-repeat center center fixed;
    background-size: cover;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-150px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>



