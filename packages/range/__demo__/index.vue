<template>
  <div class="wrap">
    <r-titlebar theme="b"
              @on-back="onBack">Range</r-titlebar>
    <div class="exp">
      <div class="tip">效果一</div>
      {{config0.amount}}
      <r-range v-model="config0.amount"
             :min="config0.min"
             :max="config0.max"
             :step="config0.step">
        <span slot="start">{{config0.min}}</span>
        <span slot="end">{{config0.max}}</span>
      </r-range>

      <br><br>

      <div class="tip">效果二</div>
      <div class="range-title">{{config1.amount}}</div>
      <r-range v-model="config1.amount"
             :min="config1.min"
             :max="config1.max"
             :step="config1.step">
        <span slot="start"
              class="decrease"
              @click="decrease">-</span>
        <span slot="end"
              class="increase"
              @click="increase">+</span>
      </r-range>
      <div class="range-footer">
        <span class="min">{{config1.min}}</span>
        <span class="max">{{config1.max}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RangeExp",
  data () {
    return {
      config0: {
        amount: 20000,
        min: 0,
        max: 100000,
        step: 5000
      },
      config1: {
        amount: 8000,
        min: 5000,
        max: 13000,
        step: 3000
      }
    }
  },
  methods: {
    decrease () {
      let amount = this.config1.amount
      amount -= this.config1.step
      amount = Math.max(this.config1.min, amount)
      this.config1.amount = amount
    },
    increase () {
      let amount = this.config1.amount
      amount += this.config1.step
      amount = Math.min(this.config1.max, amount)
      this.config1.amount = amount
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
#ta {
  color: #666;
  border: 1px solid #e5e5e5;
}
.tip {
  padding: 0.5rem 0.8rem;
  text-align: left;
  font-size: 0.8rem;
  color: #4080e8;
  background: rgb(245, 231, 185);
}
.r-range {
  padding: 0 1rem;
}
.decrease,
.increase {
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
}
.decrease {
  margin-right: 1rem;
}
.increase {
  margin-left: 1rem;
}
.range-footer {
  display: flex;
  justify-content: space-between;
  .min {
    padding-left: 1rem;
  }
  .max {
    padding-right: 1rem;
  }
}
</style>
