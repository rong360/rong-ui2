<template>
  <div class="example">
    <h1>Rong-ui2效果演示</h1>
    <ul class="effect-list">
      <li><router-link to="/titlebar">Titlebar</router-link></li>
      <li><router-link to="/button">Button</router-link></li>
      <li><router-link to="/flexfixed">FlexFixed</router-link></li>
      <li><router-link to="/input">Input</router-link></li>
      <li><router-link to="/select">Select</router-link></li>
      <li><router-link to="/form">Form</router-link> &nbsp;&nbsp;&nbsp;&nbsp; <router-link to="/form/css">Form（css效果）</router-link></li>
      <li><router-link to="/range">Range</router-link></li>
      <li><router-link to="/dialog">Dialog</router-link></li>
      <li><router-link to="/toast">Toast</router-link></li>
    </ul>
  </div>
</template>

<style lang="less">
.effect-list {
  padding: 15px;
  li {
    line-height: 40px;
    font-size: 14px;
    list-style: none;
  }
}
</style>
