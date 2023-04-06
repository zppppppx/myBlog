<template>
    <!-- <v-col cols="8" style="display: flex"> -->

    <v-card class="articleCard" @click="getArticle">

        <div class="post-content">
            <!-- <div class="left"> -->
            <div class="post-meta"> <span class="mdi mdi-calendar-month-outline"></span> posted at {{ createdAt }}</div>
            <h2 style="margin: 15px 0px">{{ article.title }}</h2>
            <div class="post-meta"> likes and comments</div>
            <div class="post-desc"> {{ article.description }} </div>
            <div class="post-tags">
                <span class="post-tag" v-for="category in article.categories" :key="category">{{ category.category }}</span>
                <span class="post-tag" v-for="tag in article.tags" :key="tag">{{ tag.tag }}</span>
            </div>
        </div>

        <div class="post-image">
            <img :src="article.image_cover" alt="">
        </div>
    </v-card>
</template>

<script>
import { formDate } from "../utils/helper.js"

export default {
    data() {
        return {

        }
    },
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        createdAt() {
            return formDate(this.article.createdAt)
        }
    },
    methods: {
        getArticle() {
            console.log('haha')
            this.$router.push(`article?id=${this.article.id}`)
        }
    }


}
</script>

<style scoped lang="less">
.articleCard {
    max-width: 750px;
    width: 100%;
    height: 300px;
    margin: 0px 0px 30px 0px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    position: relative;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px hsla(0, 0%, 43.1%, 0.4);
}


.articleCard:hover {
    box-shadow: 0px 0px 10px 5px rgba(194, 219, 167, 0.4);
    overflow: hidden;
}


.post-content {
    width: 50%;
    height: 100%;
    padding: 20px 35px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .post-meta {
        font-size: 15px;
        color: #797979;
        margin-bottom: 10px
    }

    .post-desc {}

    .post-tags {
        margin-top: auto;

        .post-tag {
            background-color: #ddd;
            padding: 3px 12px;
            margin-right: 3px;
            border-radius: 3px;
            transition: all 0.5s ease 0s;
        }

        .post-tag:hover {
            background-color: #ABD55D;
            transition: all 0.5s ease 0s;
            color: white;
        }
    }
}

.post-content .left {
    position: absolute;
    left: 0;
    text-align: left;
    padding: 20px 35px;
}

.post-image {
    float: left;
    width: 50%;
    height: 100%;
    // background-color: black;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        transition: all 1s ease 0s;
        transform: scale(1);
        -webkit-transition: all 1s ease 0s;
        -webkit-transform: scale(1);
        overflow: hidden;
        object-fit: cover;
    }
}


.post-image:hover img {
    transition: all 1s ease 0s;
    transform: scale(1.1);
    -webkit-transition: all 1s ease 0s;
    -webkit-transform: scale(1.1);
}
</style>