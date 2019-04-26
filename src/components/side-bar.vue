<template lang="html">
  <div class="card" style="height: 18rem;">
    <div class ="card-text">
      <li>Info about County</li>
      <li>County Name:  </li>
      <li>County KADI: </li>
      <li>Number of Resources: </li>
      </div>
  <div class="card-body">
    <h5 class="card-title">Legend</h5>
    <div class="legend-holder">
      <div class="card-legend-col">
        <div class="legend-block legend-block-color-1"></div>
        <span class="legend-block-text block-1">1</span>
      </div>
    </div>
    <a href="#" class="btn btn-primary">Show/Hide Markers</a>
  </div>
</div>

</template>

<script>

export default {
  name: "sidebar",
  //props: ['ctyInfo']
}
</script>

<style lang="css" scoped>
.legend-holder {
  margin: 4px 4px 6px 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.card-legend-col {
  /* display:inline-block;
  position: relative; */
  text-align: center;
  width: 20px;
}
.legend-block-color-1 {
  background: rgba(49,54,149, 0.8);
  border-color: #313695;
}
.legend-block {
    height: 16px;
    width: 16px;
    border: 2px solid;
    margin: 0 auto;
}


</style>
