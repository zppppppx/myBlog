<template>
    <div>
        <router-link to="/home">hahad</router-link>
        <h1>{{ this.msg }}</h1>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>

<script setup>
    import HelloWorld from '../components/HelloWorld.vue'
</script>

<script>
    import axios from "axios"
    export default {
        name: 'Home',
        data() {
            return {
                msg: "",
            }
        },
        created() {
            axios
                .get("http://localhost:3000/haha")
                .then((res) => {
                    this.msg = res.data;
                })
                .catch( err => {
                    console.log(err);
                })
        },
    }
</script>