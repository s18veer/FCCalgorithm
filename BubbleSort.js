const CARD_COUNT = 16; // match $card-count
const EVENT_DELAY = 200; // match $transition-time

const store = new Vuex.Store({
  state: {
    values: [], // the actual list of numbers being sorted
    cards: [], // visual representations 
    done: true
  },
  
  mutations: {
    reset (state, payload) {
      state.values = payload.values;

      // cards are added to the DOM in order of ascending value
      // though sortIndex dictates horizontal position
      state.cards = [];
      for (let i = 1; i <= state.values.length; i++) {
        state.cards.push({
          value: i,
          sortIndex: state.values.indexOf(i),
          isActive: false,
          isLocked: false
        });
      }
      
      state.done = false;
    },
    
    swap (state, payload) {
      let a = payload.indexes[0];
      let b = payload.indexes[1];
      let temp = state.values[a];
      state.values[a] = state.values[b];
      state.values[b] = temp;

      // tell each card what its new order is
      state.cards.forEach((card) => {
        card.sortIndex = state.values.indexOf(card.value);
      });
    },
    
    activate (state, payload) {
      payload.indexes.forEach((index) => {
        let card = state.cards.find((card) => { return card.sortIndex === index; });
        card.isActive = true;
      });
    },
    
    deactivate (state, payload) {
      payload.indexes.forEach((index) => {
        let card = state.cards.find((card) => { return card.sortIndex === index; });
        card.isActive = false;
      });
    },

    
