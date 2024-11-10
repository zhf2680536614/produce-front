<!-- 关于我们 -->
<template>
  <div>
    <homeTop />
    关于我们
    username{{ user.username }}

  </div>

</template>

<script>
import homeTop from '@/components/homeTop.vue';
import { mapState } from 'vuex';
export default {
  components: {
    homeTop
  },
  computed: mapState([
    'user'
  ]),
  name: 'aboutPage',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped></style>
