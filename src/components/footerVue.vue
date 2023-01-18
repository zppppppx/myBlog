

<template>

  <div class="footer">
    <span class="content">jokes</span>
    <span class="cpyright">copy right</span>
  </div>
</template>

<script>

</script>

<style scoped lang="less">
.footer {
  width: 100%;
  height: 70px;
  border-radius: 25px 25px 0 0;
  background: linear-gradient(-45deg, #79CBFF, #4EDEC4,
  #9BE065, #FAF370);
   background-size: 300% 300%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: gradientBG 5s ease infinite;

  .content {
    margin: 10px 0px 6px 0px;
    font-size: 18px;
  }

  .cpyright {
    color: gray;
  }
}

@keyframes gradientBG {
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>