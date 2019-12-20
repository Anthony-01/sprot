module.exports = Behavior({
  data: {
    sharedText: 'This is a piece of data shared between pages.',
    count: 0
  },
  methods: {
    sharedMethod: function () {
      this.data.sharedText === 'This is a piece of data shared between pages.'
    },
    addCount() {
      this.data.count ++;
    },
    showCount() {
      console.error(this.data.count);
    }
  }
})