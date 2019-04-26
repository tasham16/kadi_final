<template lang="html">
  <div >
    <GmapMap
    :center="center"
    :zoom="movingzoom"
    style="width: 600px; height: 600px">
    <gmap-info-window :options="{ pixelOffset: {width: 0, height: -35} }"
    :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        {{infoContent}}
      </gmap-info-window>
    <GmapPolygon
    v-for="county in polyShape" :key="county.countyName"
    :paths=county.countyBounds
    v-bind:options="{strokeColor:'#000000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: county.CountyColor,
                    fillOpacity: 0.8}"
    @click="displayInfo($event,county)"
    >
    <!-- <div v-if="clicked">
        <GmapAutocomplete
        v-for="res in facilitiesData"
        :componentRestrictions="{country: 'KE'}"
        :input="res.Name"
        :selectFirstOnEnter="true"
        :place_changed="setPlace">
        </GmapAutocomplete>
      </div> -->
    </GmapPolygon>

    </GmapMap>
  </div>
</template>

<script>

import Counties from '../assets/kenyan-counties.json';
import KADI from '../assets/county_index.json';
//import sideBar from './side-bar.vue';

export default {
   name: "myMap",
   // props:{
   //   // facilitiesData: {
   //   //   Type: Array,
   //   //   default: function() {
   //   //     return [];
   //   //   }
   //   // }
   //   // optional: offset infowindow so it visually sits nicely on top of our marker
   //   // infoOptions: {
   //   //    pixelOffset: {
   //   //    width: 0,
   //   //    height: -35
   //   //    }
   //   // }
   // },
   data: function () {
     return {
       center: {lat: 0.485138,lng: 37.936748},
       movingzoom: 6,
       infoContent: '',
       infoWindowPos: null,
       infoWinOpen: false,
       place:null,
       markers: [],
       //clicked: false
     }
   },
   // components: {
   //   'side-bar': sideBar
   // },
   computed:{
     polyShape: function (){
       let regions = Counties.features
       let all_paths=[]
       let county_object = []

       regions.map(function(region){
         let path_array = []

    /** Initial Color vals from Google maps API documentation
    * https://developers.google.com/maps/documentation/javascript/combining-data
    */
        // var lowColor = [72,61,139];
        // var highColor = [220, 20, 60];

         //let cname = region.properties.COUNTY

         if (region.geometry.type == 'MultiPolygon')
         {
           for (var i = 0; i < region.geometry.coordinates.length;i++)
           {
             var coordinates = region.geometry.coordinates[i];

              coordinates[0].map(function(coords){
               path_array.push({lat: coords[1], lng: coords[0]})
             })

           }
         }
         else{
           region.geometry.coordinates[0].map(function(coords){
             path_array.push({lat: coords[1], lng: coords[0]})
           })
         }

         //let Kscore = Math.ceil(Math.random()*10)
         // var min = 0
         // var max = 10

         const ctyname = region.properties.COUNTY;
         var Kscore;
         var Kblock;

         // console.log("ctyname: ");
         // console.log(ctyname);

         for (var cty=0; cty < 47; cty++)
         {
           //console.log("kadi: ");
          //console.log(KADI[cty].COUNTY);
          var countyInf = Object.values(KADI[cty]);

           if (String(countyInf[0]).toUpperCase() == String(ctyname).toUpperCase())
           {
             console.log("HERE");
             //Kscore = Math.floor(countyInf[3]);

             //split scores into deciles (groups from 1-10)
             Kscore = Math.floor(countyInf[3]);
             Kblock = Math.ceil((countyInf[3]+1)/10);

             if (Kblock < 0)
             {
               Kblock = 1;
             }
             if (Kblock > 10)
             {
               Kblock = 10;
             }
             break;
           }
           else
           {
             Kblock = 100;
           }
         }

         // var diff = (Kscore - min)/(max-min);

        var Scaledcolor = '';
         // for (var k = 0; k<3; k++)
         // {
         //   Scaledcolor[k] = (highColor[k]-lowColor[k]) * diff + lowColor[k];
         // }

         switch (Kblock){
            case 1:
              Scaledcolor = "#313695";//[49,54,149];
              break;
            case 2:
               Scaledcolor = "#4575b4";//[69,117,180];
               break;
            case 3:
               Scaledcolor = "#74add1";//[116,173,209];
               break;
            case 4:
               Scaledcolor = "#abd9e9";//[171,217,233];
               break;
            case 5:
               Scaledcolor = "#e0f3f8";//[224,243,248];
               break;
            case 6:
               Scaledcolor = "#fee090";//[254,224,144];
               break;
            case 7:
               Scaledcolor = "#fdae61";//[253,174,97];
               break;
            case 8:
               Scaledcolor = "#f46d43";//[244,109,67];
               break;
            case 9:
               Scaledcolor = "#d73027";//[215,48,39];
               break;
            case 10:
               Scaledcolor = "#a50026";//[165,0,38];
               break;
         }



         county_object.push({
           countyID: region.properties.COUNTY3_ID,
           countyName: region.properties.COUNTY,
           countyBounds: path_array,
           KADI_score: Kscore,
           KADI_block: Kblock,
           CountyColor: Scaledcolor//'hsl('+ Scaledcolor[0]+','+Scaledcolor[1]+'%,'+Scaledcolor[2]+'%)',
         })

         all_paths.push(path_array)
       })

       return county_object
     }
   },
   methods:{

     displayInfo: function($event, county) {
      //console.log($event);
      //console.log(county);
      var windowContent = 'County: ' + county.countyName + '; ' + 'KADI SCORE: '+ county.KADI_score
      + '; ' + 'KADI BLOCK: '+ county.KADI_block;

      this.infoWindowPos = $event.latLng;
      this.infoContent = windowContent;

      this.infoWinOpen = true;

      this.center = $event.latLng;
      this.movingzoom = 6.5;

      this.$emit('poly-clicked', county);

    },
    // setPlace: function(place) {
    //   console.log("here");
    //   this.place = place
    // },
    // usePlace() {
    //   if (this.place) {
    //     this.markers.push ({
    //       position: {
    //         lat: this.place.geometry.location.lat(),
    //         lng: this.place.geometry.location.lng()
    //       }
    //     })
    //     this.place = null;
    //   }
    // }
  },

};
</script>

/* <style scoped>

</style> */
