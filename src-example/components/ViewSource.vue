<template>
  <div class="view-sourc-code">
    <button @click="viewDemo"
            class="btn">查看Demo源码</button>
  </div>
</template>

<script>
export default {
  props: {
    code: String
  },
  methods: {
    viewDemo () {
      this.$dialog({
        propsData: {
          dlgStyleObj: { width: "95%" },
          contentStyleObj: { padding: 0, lineHeight: 0 },
          message: `
          <textarea
            style="width: 100%;
            height: 400px;
            overflow: scroll;
            background-color: #333;
            color: #fff"
            class="scroll-area"
          >${this.code}
          </textarea>
          `,
          showCancelBtn: false
        },
        methods: {
          onConfirm () {
            this.remove()
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.view-sourc-code {
  padding: 15px;
  .btn {
    background-color: darkseagreen;
    padding: 0 10px;
    line-height: 40px;
    border: none;
    position: fixed;
    right: 0;
    bottom: 80px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
}
</style>
