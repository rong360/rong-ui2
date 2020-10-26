<template>
  <div>
    <Titlebar theme="b"
              @on-back="onBack">Dialog</Titlebar>
    <p v-for="item in list">{{item}}</p>
  </div>
</template>

<script>
export default {
  data () {
    let list = []
    for (var i = 0; i < 100; i++) {
      list.push(Math.random())
    }
    return {
      list: list
    }
  },
  mounted () {
    this.$dialog({
      propsData: {
        title: '这里是标题',
        showCloseBtn: true,
        message: '',
        cancelBtnText: 'cancel',
        // showConfirmBtn: false,
        // showCancelBtn: false,
        confirmBtnText: 'submit',
        dlgStyleObj: {},
        contentStyleObj: { color: 'red' },
        rContentData: {
          user: 'zyx'
        }
      },
      components: {
        rContent: resolve => resolve(require('./repaymentTip.vue'))
      },
      methods: {
        onConfirm () {
          this.remove()
        },
        onClose () {
          this.remove()
        }
      }
    })
  },
  methods: {
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>
