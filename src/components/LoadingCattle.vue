<template>
  <div class="loading-cattle">
    <div class="load-img"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'loadingCattle'
}
</script>

<style lang="less">
.loading-cattle {
  position: fixed;
  width: 100%;
  top: 30%;
  text-align: center;
  .load-img {
    background-size: cover;
    width: 110px;
    height: 110px;
    margin-left: 50%;
    transform: translateX(-55px);
    background-image: url("https://static.rong360.com/upload/png/15/d3/15d382419bc9575db18dba42e3976aca.png");
    animation: myloading steps(1, end) 1.5s infinite;
  }
  @keyframes myloading {
    0% {
      background-position-y: 0px;
    }
    5% {
      background-position-y: 110px;
    }
    10% {
      background-position-y: 220px;
    }
    15% {
      background-position-y: 330px;
    }
    20% {
      background-position-y: 440px;
    }
    25% {
      background-position-y: 550px;
    }
    30% {
      background-position-y: 660px;
    }
    35% {
      background-position-y: 770px;
    }
    40% {
      background-position-y: 880px;
    }
    45% {
      background-position-y: 990px;
    }
    50% {
      background-position-y: 1100px;
    }
    55% {
      background-position-y: 1210px;
    }
    60% {
      background-position-y: 1320px;
    }
    65% {
      background-position-y: 1430px;
    }
    70% {
      background-position-y: 1540px;
    }
    75% {
      background-position-y: 1650px;
    }
    80% {
      background-position-y: 1760px;
    }
    85% {
      background-position-y: 1870px;
    }
    90% {
      background-position-y: 1980px;
    }
    95% {
      background-position-y: 2090px;
    }
    100% {
      background-position-y: 2200px;
    }
  }
}
</style>
