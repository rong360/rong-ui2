<template>
  <div class="action-sheet-demo">
    <Titlebar theme="b"
              @on-back="onBack">Action Sheet</Titlebar>
    <div class="p-20">
      <nav-item @on-click="showActionSheet = true">action sheet</nav-item>
      <r-actionsheet v-model="showActionSheet"
                    title="标题"
                    :actions="actions"
                    :show-close-btn="true"
                    :radius="true"
                    @on-select="handleSelect"
                    @on-close="handleClose"></r-actionsheet>

      <nav-item @on-click="showCustomActionSheet = true">自定义action sheet内容</nav-item>
      <action-sheet v-model="showCustomActionSheet">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
      </action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      actions: [
        { name: '选项一', color: 'red' },
        { name: '选项二', disabled: true },
        { name: '选项三', fontWeight: 'bold' }
      ],
      showActionSheet: false,
      showCustomActionSheet: false
    }
  },
  methods: {
    handleSelect (item, index) {
      this.message = item.name
      this.showActionSheet = false
    },
    handleClose () {
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>
