<template>
  <label :class="wrapCls" @click.prevent="clickLabel">
    <slot name="prepend"></slot>
    <span :class="iconCls"></span>
    <slot></slot>
  </label>
</template>

<script>
const prefixCls = 'r--checkbox'

export default {
  name: 'Checkbox',
  props: {
    checkedValue: [Boolean, Array],
    value: [String, Number, Boolean],
    shape: {
      type: String,
      default: 'square'
    },
    theme: {
      type: String,
      default: 'default'
    }
  },
  model: {
    prop: 'checkedValue',
    event: 'change'
  },
  data () {
    return {
      currentValue: this.getChecked(this.checkedValue)
    }
  },
  watch: {
    checkedValue: function (newVal, oldVal) {
      this.currentValue = this.getChecked(newVal)
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.shape}`,
        `${prefixCls}-theme-${this.theme}`,
        {
          [`${prefixCls}-checked`]: this.currentValue
        }
      ]
    },
    iconCls () {
      return `${prefixCls}-icon`
    }
  },
  methods: {
    onChange (e) {
      let checked = e.target.checked
      this.currentValue = checked
      if (typeof this.checkedValue === 'boolean') {
        this.$emit('change', checked)
      } else if (Array.isArray(this.checkedValue)) {
        let arr = this.checkedValue
        let index = arr.findIndex(item => item === this.value)
        checked && index == -1 && arr.push(this.value)
        !checked && index > -1 && arr.splice(index, 1)
        this.$emit('change', arr)
      }
      this.$emit('on-change', e)
    },
    clickLabel (e) {
      let checked = this.currentValue
      checked = !checked
      this.currentValue = checked
      if (typeof this.checkedValue === 'boolean') {
        this.$emit('change', checked)
      } else if (Array.isArray(this.checkedValue)) {
        let arr = this.checkedValue
        let index = arr.findIndex(item => item === this.value)
        checked && index == -1 && arr.push(this.value)
        !checked && index > -1 && arr.splice(index, 1)
        this.$emit('change', arr)
      }
      this.$emit('on-change', e)
    },
    getChecked (checkedValue) {
      if (typeof checkedValue === 'boolean') {
        return checkedValue
      } else if (Array.isArray(checkedValue)) {
        return checkedValue.includes(this.value)
      }
    }
  }
}
</script>

<style lang="less">
@checkboxCls: r--checkbox;

.@{checkboxCls} {
  display: inline-block;
  font-size: 14px;
  line-height: 1;
  margin-right: 8px;
  -webkit-tap-highlight-color:transparent;
  &-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    border: 1px solid #dcdee2;
    background-color: #fff;
    transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    vertical-align: sub;
    &:after {
      content: " ";
      display: block;
      width: 4px;
      height: 8px;
      position: absolute;
      top: 1px;
      left: 4px;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(0);
      transition: all 0.2s ease-in-out;
    }
  }
  &-square &-icon {
    border-radius: 2px;
  }
  &-circle &-icon {
    border-radius: 50%;
  }
  &-rect {
    width: 78px;
    height: 30px;
    line-height: 30px;
    background-color: #e5e5e5;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    margin-right: 10px;
    margin-top: 5px;
  }
  &-rect&-checked {
    background-color: #666;
    color: #fff;
  }
  &-rect &-icon {
    display: none;
  }
  &-checked &-icon {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
    &::after {
      top: 2px;
      left: 5px;
      transform: rotate(45deg) scale(1);
    }
  }
  &-theme-a &-icon{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAFFklEQVRoBe1ZXWgcVRQ+Z2YTV61Ya2zqPlR8khb0zZf+iG1TQZRIhdaXPPkuFgQRNf2LiggFS9/7lJdWUBoqBZNWsWlffFNo6VOxwtLUWCumuk125nq+u3Mn987O7GZ3OzsGMrB7/+/5vvs3535DtPasjUBPI8A9tbYajxy79Xxd0Sgr3qpIVZi4oogqqCJGqpJXlbyqYnW1xDQ1c2jTL1bzrqM9EdCgQ+9t4vANUvRsRyiYbpDyzpa88FQvZLoiMPL5nc1BbWlCAI/JyHodAU9UllkJJWvSLw+Mz3yw4WaiuG2yIwL7z6jBP67dPiagDypFDzm9M/8ps/AtezTts3dT+VTd8Liq3l9gvhfQ0xxQJVDhZhXSXllTr5FSTzjtiWoe84knt2w89NUBXkyUZSZXTODVz/5+6t/Ff74mUjuc3pi/8ck7ufOloUtHdnHdKctIHPlelS79OL8zoPAdIbLPrcazDw8+8ub5Dx/73c1PT62IwJ5P514I62pKRv0Z0w0zX2af3r/48fAVk9dNuPuTuW0qoC+UUttNe2b61Svx6IWPhn82eVlhWwIAHyzRZRn5dehEgAeyhN774fCmE1mddpP/8tFb78p+OC5E/EZ7XvAHaHs7Ei0JYNnUlu79tDzyfNdnOnDh8PB0NyDbtdk9MfdKGNBpGaz1qIuZKA88+mKr5ZR5gmDDYs3b4Eu+vy0v8AB8cXz4O9gQ6HeRhm1gABak055MAvNXb8sx2diwWDYY+ZnxoWtpnTzIPNjwfHoLNhv9qh04+bJspC4hnPP12uJ1aVTWDZkOPug1nwXI5GNPyLH8ZZSulcqDz6W9J1JnIHpJafA4bfoNHqBhE7YjAuUIU5RcDpoIwD2Q4jFTBUelifc7TNgei7A5MJoI1MW3id0DeUn1es471jpMaNuCAc2ACdiSXTQR0I5ZVAtv2GSDfqcdDHAaE49DAC+t2KsU3wbuQaJ+35MaA/wsPOLxaowWCoeACtSoKZPj6dxKfRvTJo8QGIDF9G1jRJ5LIOQtpqI0yuVta/rvKGSaMfWVhRF5LgG5SZmKnuf9ZuJFh3DPDQbZzDFG5DkEcA2MK4o/b+JFh7hbGAw2RuQ5BMwdFgW4jCD8Pzw2FhsjsDkEbLC4SdnpIuOtsDgEBHE86rgGFgnatm1jsTGijkNANkhMAHdYu5Mi4zYWG2MTAdkgMQFcwIsEbdu2sdgYmwl4atnfVzRid1JkXCsZEQAIYzYWZwlJ4qwplN3+OtQDky4q1Bggw0QPVD0TR+gQ0AoZFDM8ottA+tDxAv80BqMhCbakiucQ0DhF7jN4tW5jEgWFDgYLm4HTRABapWwUyH2YhX3QbUzlfofadiR8AROwJTE0EYimaNJUhOhk4v0OE7Ynk8sHeJoIIBNCq7yH7yMOxUxfsJHo4wObllpXA6Y086kE9O1fcay8yfQd33N0bm9aB3nkwRZsmr4h+qYpEihPJYCCoa0bhTHPIg65T/TEMyMT8/F9Afl5PLABW5bEOAvFOstWJgFI3FCJIe81Gqv19SC4kudMoG/YkCGLpUVgaCW3ZxIAaGiSUIllJhYMCTmezuexJ9An+jbgYRO2W+miwLQil3lVy+uNkSda1R84DIl2n5hkOs/Jbxr3afOJCW3v/MUVuMTaqxQnEX4WXBXTbxTm+4nJNrZqP/LZJBBftZ9Zk0SQxkaH6ATdBtKHvIhSP3Sz3DnY56l2n47SbKzlrY1ADiPwH50UTn039g5vAAAAAElFTkSuQmCC) no-repeat center center;
    background-size: 16px 16px;
    border: none;
    &::after{
      display: none;
    }
  }
  &-theme-a&-checked  &-icon{
    background-image: url(data:image/png;base64,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);
  }
}
</style>
