const gameApp = {
    data() {
      return {
          games: [],
          gameForm: {},
          selectedGame: null
        
        }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('MMM D, YYYY')
        },
        selectGame(g) {
            if (g == this.selectedGame) {
                return;
            }
            this.selectedGame = g;
            // this.games = [];
            // this.fetchOfferData(this.selectedStudent);
        },
        fetchGameData() {
            fetch('/api/game/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postNewGame(evt) {  
            fetch('api/game/create.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
              });
            // reset the form
            this.gameForm = {};
            this.fetchGameData();
        }
        

    },
    created() {
        return this.fetchGameData();
     
    }
}
  
Vue.createApp(gameApp).mount('#gameApp');
