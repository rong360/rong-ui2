<template>
  <div class="loading-circle">
    <div class="load-img">
      <img src="../assets/images/loading-icon.png" alt="">
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'loadingCircle'
}
</script>

<style lang="less">
.loading-circle {
  position: fixed;
  width: 100%;
  top: 30%;
  text-align: center;
  .load-img {
    width: 72px;
    height: 72px;
    margin-left: 50%;
    transform: translateX(-36px);
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.87);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      -webkit-animation: 1.5s infinite loading-circle;
      animation: 1.5s infinite loading-circle;
    }
  }
  @keyframes loading-circle {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(720deg);
    }
  }
}
</style>
