<template>
  <!-- app container -->
  <div id="app">
    <!-- Modal -->
     <!-- <div id="LegendDescrip" class="modal fade" role="dialog">
       <div class="modal-dialog"> -->
       <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">

         <!-- Modal content-->
         <div class="modal-content">
           <div class="modal-header">
             <h4 class="modal-title">What do the Scores mean?</h4>
             <button type="button" class="close" data-dismiss="modal"aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                  </button>
           </div>
           <div class="modal-body">
             <p><b>KADI Score:</b> The Kenya Deprivation index (KADI) Score represents the
             percentage of the countys deprivation index relative to all the counties indicies. A Higher
             scores mean that the county is more disadvantaged and lower score means it is less
             disadvantaged <br>
             <b>KADI Block:</b> The counties were divided into deciles based on their KADI score.
               In this case, block 1 is the least disadvantaged group of counties and block 10 is
               the most disadvataged.<br>
             <b>Legend:</b> The legend represents that colours given to each KADI Block on the map.
           </p>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-default" @click="showModal = false">Close</button>
           </div>
         </div>
         <!-- Modal content-->

         </div>
        </div>
      </transition>
    </div>
     <!-- Modal -->

    <!-- Navigation Bar -->
    <div class="navbar navbar-light bg-light">
      <!-- Navbar-brand -->
      <div class="navbar-brand" href="#">Kenya's Area Deprivation Index</div>
      <!-- Navbar-brand -->
    </div>

    <div  class="container-fluid margin-top-custom">
    <!-- Body Content -->
    <div class="row justify-content-md-center">
      <!-- Card -->
      <div class="card mb-3 fixed_h" style="max-width: 900px;" >
        <div class="row no-gutters">
        <!-- Card county text-->
     <div class="col-sm-3 scroll">
       <div class="card-text">
         <li><b>Info about County</b></li>
         <li><b>County Name:</b> {{ ctyName }}</li>
         <li><b>County KADI:</b> {{ ctyKADI }} </li>
         <li><b>County block:</b> {{ ctyBlock }}</li>
         <li><b>Number of Resources:</b> {{ noResources }}</li>
         </div>
       <h5 class="card-title">Legend</h5>
       <div class="legend-holder">
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-1"></div>
           <span class="legend-block-text block-1">1</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-2"></div>
           <span class="legend-block-text block-1">2</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-3"></div>
           <span class="legend-block-text block-1">3</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-4"></div>
           <span class="legend-block-text block-1">4</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-5"></div>
           <span class="legend-block-text block-1">5</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-6"></div>
           <span class="legend-block-text block-1">6</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-7"></div>
           <span class="legend-block-text block-1">7</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-8"></div>
           <span class="legend-block-text block-1">8</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-9"></div>
           <span class="legend-block-text block-1">9</span>
         </div>
         <div class="card-legend-col">
           <div class="legend-block legend-block-color-10"></div>
           <span class="legend-block-text block-1">10</span>
         </div>
       </div>
       <button type="button" class="btn btn-info" @click="showModal = true">
         Understand Legend
       </button>
       <h5 class="card-title">Resources:</h5>
       <ul class="list-group list-group-flush" v-if="noResources > 0">
        <li class="list-group-item"
        v-for="facility in resourceList" :key="facility.Code">
              <p><b>Name</b>: {{ facility.Name }} <br>
              <b>Type</b>: {{ facility.Facility_type}}<br>
              <b>Open late</b>: {{ facility.Open_late_night}}<br>
              <b>Open weekends</b>: {{ facility.Open_weekends}}<br>
              <b>Open public holidays</b>: {{ facility.Open_public_holidays}}<br>
            </p>
        </li>
      </ul>
       <!-- <sidebar></sidebar> -->
     </div>
     <!-- Card county text-->

     <!-- Card-content google map-->
     <div class="col-sm-5">
       <div class="card-body">
         <myMap
         v-on:poly-clicked="UpdateInfo" ></myMap>
       </div>
     </div>
     <!-- Card-content google map-->
   </div>
     </div>
     <!-- Card -->
   </div>

   <!-- Body Content -->
 </div>
   </div>
  <!-- app container -->
</template>

<script>
//import Header from './components/Header';
import myMap from './components/Map';
import facilities from './assets/allFacilities.json';
//import sidebar from './components/side-bar';

export default {
  name: 'app',
  components: {
    //Header,
    //sidebar,
    myMap
  },
  data () {
    return {
    ctyName: "",
    ctyKADI: "",
    ctyBlock: "",
    noResources: 0,
    resourceList: [],
    facilities,
    showModal: false
    }
  },
  methods: {
    UpdateInfo(e){
      var resources = facilities.data;
      this.ctyName = e.countyName;
      this.ctyKADI = e.KADI_score;
      this.ctyBlock = e.KADI_block;

      for (var r = 0; r < resources.length; r++)
      {
        if (resources[r].County.toUpperCase() == e.countyName.toUpperCase())
        {
          var facilArray = resources[r].facilities;
          this.noResources = facilArray.length;
          this.resourceList = facilArray;

          break;
        }

        this.noResources = 0;
      }

    }
  }

}
</script>

<style>  /*global to app */
 * {
   /* box-sizing: border-box; */
   margin: 0;
   padding: 0;
 }

  body,html {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
  .container-fluid {
    height:100%;
    min-height: 100%;
  }

  .margin-top-custom {
    margin-top: 10px;
  }
  #myMap {
    float: right;
  }
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
  .legend-block {
      height: 16px;
      width: 16px;
      border: 2px solid;
      margin: 0 auto;
    }
  .legend-block-color-1 {
    background: rgba(49,54,149, 0.8);
    border-color: #313695;
  }
  .legend-block-color-2 {
    background: rgba(69,117,180, 0.8);
    border-color: "#4575b4";
  }
  .legend-block-color-3 {
    background: rgba(116,173,209, 0.8);
    border-color: "#74add1";
  }
  .legend-block-color-4 {
    background: rgba(171,217,233, 0.8);
    border-color: "#abd9e9";
  }
  .legend-block-color-5 {
    background: rgba(224,243,248, 0.8);
    border-color: "#e0f3f8";
  }
  .legend-block-color-6 {
    background: rgba(254,224,144, 0.8);
    border-color: "#fee090";
  }
  .legend-block-color-7 {
    background: rgba(253,174,97, 0.8);
    border-color: "#fdae61";
  }
  .legend-block-color-8 {
    background: rgba(244,109,67, 0.8);
    border-color: "#f46d43";
  }
  .legend-block-color-9 {
    background: rgba(215,48,39, 0.8);
    border-color: "#d73027";
  }
  .legend-block-color-10 {
    background: rgba(165,0,38, 0.8);
    border-color: "#a50026";
  }
  .scroll {
    overflow-y:auto;
    position:relative;
    max-height: 640px;
    margin-bottom: 120px;
}
  .fixed_h {
    max-height: 650px;
  }

  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>
