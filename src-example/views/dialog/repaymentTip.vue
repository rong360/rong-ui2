<template>
  <div class="repayment-tip">
    hello {{rContentData.user}} {{name}}
    <div class="scroll-area" style="height: 100px; overflow-y:scroll; line-height:25px; margin-top: 10px; margin-bottom: 10px">顺丰到付加客服见识到了废旧塑料到开发机落实到积分类似的快捷方式来得及富士康福建省雷锋精神雷锋精神砥砺奋进收到了开发机上登录开发顺丰到付加客服见识到了废旧塑料到开发机落实到积分类似的快捷方式来得及富士康福建省雷锋精神雷锋精神砥砺奋进收到了开发机上登录开发</div>
    <button @click="toggleScrollArea">toggle scroll-area</button>
    <div v-if="showArea" class="scroll-area" style="height: 100px; overflow-y:scroll; line-height:25px">顺丰到付加客服见识到了废旧塑料到开发机落实到积分类似的快捷方式来得及富士康福建省雷锋精神雷锋精神砥砺奋进收到了开发机上登录开发顺丰到付加客服见识到了废旧塑料到开发机落实到积分类似的快捷方式来得及富士康福建省雷锋精神雷锋精神砥砺奋进收到了开发机上登录开发</div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'repaymentTip',
  props: {
    rContentData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    name: String
  },
  data () {
    return {
      showArea: false
    }
  },
  methods: {
    toggleScrollArea () {
      this.showArea = !this.showArea
    }
  }
}
</script>
