const gameApp = {
    data() {
      return {
          games: [],
        
        }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('MMM D, YYYY')
        },
        fetchGameData() {
            fetch('/api/assignments/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
        

    },
    created() {
        return this.fetchGameData();
     
    }
}
  
Vue.createApp(gameApp).mount('#gameApp');
