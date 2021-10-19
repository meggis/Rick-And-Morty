<template>
  <Header />
  <hr />
  <div class="layout">
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Footer from './views/shared/footer.vue'
import Header from './views/shared/header.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Footer,
    Header,
  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
