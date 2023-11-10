<script setup lang="ts">

</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.wrapper {
  max-width: 1024px;
  margin: 0 auto;
}

.cta {
  display: block;
  border: none;
  outline: none;
  border-radius: 25px;
  background: var(--linear, linear-gradient(133deg, #7C3CE1 0%, #1614DB 100%));
  width: 100%;
  height: 43px;
  margin-top: 7px;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #fff;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    opacity: 0.9;
  }

  &.transparent {
    background: transparent;
    border: 1px solid #E8EFF3;
    box-shadow: 0px 0px 23px 0px rgba(185, 135, 255, 0.11);

  }
}
</style>
