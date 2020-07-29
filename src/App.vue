<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="hotkey" v-hotkey="keymap" v-show="isShow"> Press `ctrl + esc` to toggle me! Hold `enter` to hide me! </div>

    <br>
    <button @click="() => {blurConfig.isBlurred = !blurConfig.isBlurred; isBlurred = !isBlurred;}">Toggle Blur</button>
    <div v-blur="isBlurred">blur1</div>
    <div v-blur="blurConfig">blur2</div>
    <br>

    <div class="click_area" v-click-outside="onClickOutside">onClickOutside</div>
    <div class="click_area" v-click-outside="vcoConfig">vcoConfig</div>

    <br>

    <button v-clipboard="valueStatic">
      Static Copy to clipboard
    </button>
    <button v-clipboard="dynamicCopy">
      Dynamic Copy to clipboard
    </button>

    <button v-tooltip="'You have new messages.'">Hover me</button>
    <!--button v-tooltip.top-center="tooltipMsg">Hover me</button-->

    <button @click="closeModal">X</button>
    <button @click="openModal">O</button>
    <div v-scroll-lock="open"></div>

    <div v-ripple
         style="width:200px; height: 50px; line-height: 50px; margin:10px auto; background:#fff; border:1px solid #cccccc; color:#555555;">
      This is a button
    </div>
    <div v-ripple="'rgba(255, 255, 255, 0.35)'"
         style="width:200px; height: 50px; line-height: 50px; margin: 10px auto; background:#0783f4; color:#ffffff;">
      I have different color
    </div>


    <div style="width:300px; height:500px; margin:30px auto; overflow-y:auto;"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <p v-for="(item) in listData" :key="item.id">{{item.name}}</p>
    </div>

    <button v-scroll-to="'#element'">
      Scroll to #element
    </button>

    <br><br>
    <h3><code>Example 3: Move focus</code></h3>
    <div id="example3">
      <div><pre>{{ { focused: focused } }}</pre></div>
      <p v-for="(item, index) in items" :key="index">
        <input type="text"
               v-model="item.value"
               @keydown.down.prevent="moveDown"
               @keydown.up.prevent="moveUp"
               v-focus="index === focused"
               @focus="focused = index"
               @blur="focused = null"
        >
      </p>
      <p>NOTE: move the focus with ↑ and ↓ keys.</p>
    </div>
    <br><br>

    <div style="height:2000px;"></div>
    <h1 id="element">Hi. I'm element</h1>
    <div style="height:2000px;"></div>


  </div>
</template>

<script>
import { focus } from 'vue-focus';

let count = 0;

export default {
  name: 'App',
  components: {
  },
  directives: { focus: focus },
  data () {
    return {
      isShow: true,
      tooltipMsg: 'This is a button.',
      open: false,

      listData: [],
      busy: true,

      focused: null,
      items: [
        { value: 'hello' },
        { value: 'world' },
        { value: '' },
        { value: 'hello' },
        { value: 'world' },
        { value: '' },
      ],

      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
        // Note: The default value is true, but in case you want to activate / deactivate
        //       this directive dynamically use this attribute.
        isActive: true
      },

      valueStatic: 'This is copy',

      isBlurred: true,
      blurConfig: {
        isBlurred: true,
        opacity: 0.3,
        filter: 'blur(1.2px)',
        transition: 'all .5s linear'
      }

    }
  },
  mounted: function() {
    this.loadMore();
  },
  methods: {
    moveDown: function() {
      this.focused = Math.min(this.focused + 1, this.items.length - 1);
    },
    moveUp: function() {
      this.focused = Math.max(this.focused - 1, 0);
    },

    toggle () {
      this.isShow = !this.isShow
    },
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    },

    closeModal () {
      this.open = false
    },
    openModal () {
      this.open = true
    },

    loadMore () {
      this.busy = true;

      if (count > 100) {
        return;
      }
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i+=1) {
          this.listData.push({ name: count, id: count });
          count+=1;
        }
        this.busy = false;
      }, 500);
    },

    onClickOutside (event) {
      console.log('Clicked outside. Event: ', event)
    },
    handler () {
      console.log('Clicked outside (Using config), middleware returned true :)')
    },
    // Note: The middleware will be executed if the event was fired outside the element.
    //       It should have only sync functionality and it should return a boolean to
    //       define if the handler should be fire or not
    middleware (event) {
      return event.target.className !== 'click_area'
    },

    dynamicCopy () {
      return this.valueStatic + ' dynamically'
    }
  },
  computed: {
    keymap () {
      return {
        'ctrl+esc': this.toggle,
        'enter': {
          keydown: this.hide,
          keyup: this.show
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
