<template>
  <div class="search"
       ref="root"
       @mouseenter="onMouseEnter"
       @mouseleave="onMouseLeave"
  >
    <vue-autosuggest
        :suggestions="filteredOptions"
        @focus="focusMe"
        @blur="onBlur"
        @click="clickHandler"
        @selected="onSelected"
        ref="autosuggest"
        :input-props="{class: 'search-input', onInputChange: this.onInputChange, placeholder:'Enter employee name'}">
      <template slot-scope="{suggestion}">
        <span class="search__suggestion-item">{{suggestion.item.email}}</span>
      </template>
    </vue-autosuggest>
    <SearchIcon class="search__icon" />
  </div>
</template>

<script>
  import {VueAutosuggest} from 'vue-autosuggest';
  import {mutations} from '../../store';
  import SearchIcon from './assets/search.svg';

  export default {
    components: {
      VueAutosuggest,
      SearchIcon
    },
    data() {
      return {
        isExpanded: false,
        selected: '',
        filteredOptions: [],
      };
    },
    beforeUpdate(...rest) {
      console.info(rest);
    },
    methods: {
      onBlur(e) {
        if (!e.target.value) {
          this.filteredOptions = [];
        }
      },

      onInputChange(text, oldText) {
        // if (text === null) {
        //   /* Maybe the text is null but you wanna do
        //   *  something else, but don't filter by null.
        //   */
        //   return false;
        // }

        // Full customizability over filtering
        const filteredData = this.$store.state.employees.filter(empl => {
          console.info(empl);
          if (text === '') {
            this.$store.commit(mutations.clearObjectToFind);
            return false;
          }
          const [email] = empl.email.split('@');
          const nameMatch = empl.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
          const emailMatch = email.toLowerCase().indexOf(text.toLowerCase()) > -1;
          return nameMatch || emailMatch;
        });

        // Store data in one property, and filtered in another
        this.filteredOptions = [{data: filteredData}];
      },

      clickHandler(item) {
        // items are selected by default on click, but you can add some more behavior here!
      },

      onSelected(item) {
        this.$store.commit(mutations.setObjectToFind, item);
        this.selected = item;
      },

      focusMe(e) {
        console.log(e)
      },

      onMouseEnter(e) {
        console.info('onMouseEnter');
        this.$refs.root.querySelector('input[type="text"]').focus();
      },

      onMouseLeave(e) {
        const input = this.$refs.root.querySelector('input[type="text"]');
        if (!input.value) {
          input.blur();
        }
        console.info('onMouseLeave');
      }
    }
  };
</script>

<style lang="scss" src="./index.scss"></style>
