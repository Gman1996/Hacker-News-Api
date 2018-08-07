var app = new Vue({
  el: '#app',
  data: {
    loading: false,
    start: 0,
    end: 10,
    stories: [],
  },
  methods: {
    fetchAPI: function(){
      axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then((result) => {
          results = result.data.slice(this.start, this.end)
          results.forEach(element => {
            axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json')
              .then((result) => {
                this.stories.push(result.data)
                this.loading = false;
                })
              .catch((err) => {
                console.log(err)
              })
          })
        })
        .catch((err) => { this.err = err })
    },

    demo: function(){
      this.start += 10;
      this.end += 10;
      this.fetchAPI();
    },

    scroll: function(){
      window.onscroll = function(ev) {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
          cb();
        }
      };
      cb = ()=>{
        this.loading = true;
        this.demo();
      }
    }
},

  beforeMount(){
    this.fetchAPI();
  },

  mounted(){
    this.scroll();
  }
})
