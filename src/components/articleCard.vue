<template>

    <!-- <v-col cols="8" style="display: flex"> -->
    <v-card class="articleCard">
        <div class="post-content">
            <!-- <div class="left"> -->
            <div class="post-meta"> time </div>
            <h2 style="margin: 15px 0px">Title</h2>
            <div class="post-meta"> likes and comments</div>
            <div class="post-desc"> Description </div>
            <div class="post-tag"> <span>tag1</span> <span>tag2</span> </div>
            <!-- </div> -->

        </div>
        <div class="post-image">
            <img src="https://res.cloudinary.com/dhwbsgmjw/image/upload/v1672623897/cld-sample-4.jpg" alt="">
        </div>
    </v-card>
</template>

<script>
import { object } from 'webidl-conversions';


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
    }
}
</script>

<style scoped lang="less">
.articleCard {
    max-width: 700px;
    height: 300px;
    margin: 20px 20px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    position: relative;
    border-radius: 20px;
    flex-wrap: wrap;
}


.articleCard:hover {
    box-shadow: 10px 10px lightblue;
    overflow: hidden;
}



.post-content {
    width: 55%;
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

    .post-tag {
        margin-top: auto;
        // position: relative;
        // bottom: 10px;
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
    width: 45%;
    height: 100%;
    background-color: black;
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