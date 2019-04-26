<template>
  <div class="header">
    <b-navbar toggleable type="light" variant="light" fixed="top">
      <b-navbar-brand href="#">Kenya's Area Deprivation Index</b-navbar-brand>

      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text>Navbar text</b-nav-text>
      </b-navbar-nav>
    </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> /*style limited to this component*/

</style>
