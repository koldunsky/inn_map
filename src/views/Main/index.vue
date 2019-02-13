<template>
  <div class="main"
       :class="{'global_tile_on': showTile}"
  >
    <Search/>
    <label class="checkbox">
      <input type="checkbox" v-model="showTile"> Схлопнуть домик
    </label>
    <!--<pre style="position: fixed; text-align: left; background: rgba(0, 100, 100, .8); z-index: 500; color: white; padding: 20px">-->
    <!--{{$store.state.placedObjects}}-->
    <!--{{$store.state.employees}}-->
    <!--</pre>-->
    <pre>
      {{objectToFind}}
    </pre>
    <div class="floors" ref="floors">
      <Floor v-for="(bg, i) in backgrounds"
             :key="bg"
             :bg="bg"
             :index="i"
             :class="{'collapsed': showTile}"
      />
    </div>
    <FloorsIndicator />
    <div class="controls">
      <InfoPanel/>
      <ObjectsHolder/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Search from '../../components/Search/index';
  import Floor from '../../components/Floor/index';
  import InfoPanel from '../../components/InfoPanel/index';
  import ObjectsHolder from '../../components/ObjectsPalette';
  import FloorsIndicator from '../../components/FloorsIndicator';

  export default {
    components: {
      Search,
      Floor,
      InfoPanel,
      ObjectsHolder,
      FloorsIndicator
    },
    data() {
      return {
        showTile: false,
        backgrounds: [
          require('../../assets/floors/new/3_rd.png'),
          require('../../assets/floors/new/3_rd.png'),
          require('../../assets/floors/new/3_rd.png'),
          require('../../assets/floors/new/2_nd.png'),
          require('../../assets/floors/new/1_st.png'),
        ]
      }
    },
    mounted() {
      document.addEventListener('click', (e) => {
        e.target
      });

      this.addFloorsDragListener();

      this.$store.watch(
        (state, getters) => {
          console.info(state, getters);
          return getters.objectToFind
        },
        (newValue, oldValue) => {
          console.log(`Updating from ${oldValue} to ${newValue}`);
        },
      );
    },
    computed: mapState(['objectToFind']),
    methods: {
      addFloorsDragListener() {
        this.$refs.floors.ondragstart = function() {
          return false;
        };
        this.$refs.floors.addEventListener('mousedown', this.handleFloorsDrag);
      },

      handleFloorsDrag(e) {
        if (!e.target.classList.contains('background')) {
          return false;
        }
        const el = this.$refs.floors;
        let shiftX = e.pageX + el.scrollLeft;
        let shiftY = e.pageY + el.scrollTop;
        const moveAt = (e) => {
          const top = (e.pageY - shiftY) * -1;
          const left = (e.pageX - shiftX) * -1;
          el.scrollTo(left, top);
        };

        moveAt(e);
        document.addEventListener('mousemove', moveAt);

        document.addEventListener('mouseout',() => {
          document.removeEventListener('mousemove', moveAt);
        }, {
          once: true
        });
        this.$refs.floors.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', moveAt);
        }, {
          once: true
        });
      },
    }
  }
</script>

<style src="./index.scss" lang="scss" scoped></style>
