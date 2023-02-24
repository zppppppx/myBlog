<template>
    <div class="user-form">
        <userForm/>
    </div>
    
</template>

<script>
    import userForm from '../../components/userForm.vue';

    export default {
        components: {
            userForm,
        }
    }
</script>

<style scoped lang="less">
.user-form {
    width: 100%;
    // display: flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>