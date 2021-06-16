<template>
  <div class="loading-animate-circle">
    <div class="loading-item">
      <div class="top loading-part">
        <div class="loading-rotator"></div>
      </div>
      <div class="bottom loading-part">
        <div class="loading-rotator"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'loadingAnimateCircle'
}
</script>

<style lang="less">
.loading-animate-circle {
  position: fixed;
  top: 30%;
  width: 120px;
  height: 120px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  font-size: 12px;
  .loading-item {
    box-sizing: border-box;
    animation: loading-animation-box 1.5s linear infinite;
    height: 30px;
    width: 30px;
    margin: 10px;
    .loading-part {
      overflow: hidden;
      height: 15px;
      width: 30px;
    }
    .loading-rotator {
      width: 30px;
      height: 30px;
      border: 4px solid transparent;
      border-right-color: #fff;
      border-top-color: #fff;
      border-radius: 50%;
      box-sizing: border-box;
    }
    .top {
      .loading-rotator {
        animation: loading-animation-top 1.5s linear infinite;
        transform: rotate(135deg);
      }
    }
    .bottom {
      transform: rotate(180deg);
      .loading-rotator {
        animation: loading-animation-bottom 1.5s linear infinite;
        transform: rotate(135deg);
      }
    }
    @keyframes loading-animation-top {
      0% {
        transform: rotate(135deg);
      }
      50% {
        transform: rotate(315deg);
      }
      75% {
        transform: rotate(495deg);
      }
      100% {
        transform: rotate(495deg);
      }
    }

    @keyframes loading-animation-box {
      0% {
        transform: rotate(90deg);
      }
      100% {
        transform: rotate(450deg);
      }
    }
    @keyframes loading-animation-bottom {
      0% {
        transform: rotate(135deg);
      }
      50% {
        transform: rotate(135deg);
      }
      100% {
        transform: rotate(495deg);
      }
    }
  }
}
</style>
