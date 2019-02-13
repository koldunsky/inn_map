<template>
  <div class="search">
    <vue-autosuggest
        :suggestions="filteredOptions"
        @focus="focusMe"
        @blur="onBlur"
        @click="clickHandler"
        @selected="onSelected"
        :render-suggestion="renderSuggestion"
        :get-suggestion-value="getSuggestionValue"
        :input-props="{class: 'search-input', onInputChange: this.onInputChange, placeholder:'Do you feel lucky, punk?'}"/>
  </div>
</template>

<script>
  import { VueAutosuggest } from "vue-autosuggest";
  import {mutations} from "../../store";

  export default {
    components: {
      VueAutosuggest
    },
    data() {
      return {
        selected: "",
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
          if(text === '') {
            this.$store.commit(mutations.clearObjectToFind);
            return false;
          }
          const [email] = empl.email.split('@');
          const nameMatch = empl.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
          const emailMatch = email.toLowerCase().indexOf(text.toLowerCase()) > -1;
          return nameMatch || emailMatch;
        });

        // Store data in one property, and filtered in another
        this.filteredOptions = [{ data: filteredData }];
      },
      clickHandler(item) {
        // items are selected by default on click, but you can add some more behavior here!
      },

      onSelected(item) {
        this.$store.commit(mutations.setObjectToFind, item);
        this.selected = item;
      },
      /**
       * renderSuggestion will override the default suggestion template slot.
       */
      renderSuggestion(suggestion) {
        /* You will need babel-plugin-transform-vue-jsx for this kind of syntax for
         * rendering. If you don't use babel or the jsx transform, then you can create
         * the you can create the virtual node yourself using this.$createElement.
         */
        const character = suggestion.item;
        return (
          <div
            style={{
              display: "flex",
            alignItems: "center"
          }}
      >
      <img
        style={{
          width: "25px",
            height: "25px",
            borderRadius: "15px",
            marginRight: "10px"
        }}
        src={character.avatar}
        />{" "}
        <span style={{ color: "navyblue" }}>{character.name}</span>
        </div>
      );
      },
      /**
       * This is what the <input/> value is set to when you are selecting a suggestion.
       */
      getSuggestionValue(suggestion) {
        return suggestion.item.name;
      },
      focusMe(e) {
        console.log(e)
      },
    }
  };
</script>

<style lang="scss" src="./index.scss"></style>
