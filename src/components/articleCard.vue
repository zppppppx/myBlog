<template>

    <!-- <v-col cols="8" style="display: flex"> -->
    <v-card class="articleCard">
        <div class="post-content">
            <!-- <div class="left"> -->
            <div class="post-meta"> <span class="mdi mdi-calendar-month-outline"></span> posted at time </div>
            <h2 style="margin: 15px 0px">Title</h2>
            <div class="post-meta"> likes and comments</div>
            <div class="post-desc"> Description </div>
            <div class="post-tags">
                <span class="post-tag">tag1</span> <span class="post-tag">tag2</span>
            </div>
            <!-- </div> -->

        </div>
        <div class="post-image">
            <img src="https://res.cloudinary.com/dhwbsgmjw/image/upload/v1672623897/cld-sample-4.jpg" alt="">
        </div>
    </v-card>
</template>

<script>
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
    max-width: 750px;
    width: 80%;
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

    .post-tags {
        margin-top: auto;

        .post-tag {
            background-color: #E4EDDD;
            padding: 3px 12px;
            border-radius: 3px;
            transition: all 0.5s ease 0s;
        }

        .post-tag:hover {
            background-color: #F2E461;
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