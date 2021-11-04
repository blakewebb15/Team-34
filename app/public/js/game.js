const gameApp = {
    data() {
      return {
          games: [],
          gameForm: {},
          selectedGame: null,
          assign: [],
          refs: [],
          refForm: {}
        
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
            this.fetchAssignData(g);
            this.fetchRefData();
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
        fetchAssignData(s) {
            console.log("Fetching offer data for ", s);
            fetch('/api/assignments/?game=' + s.gameID)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assign = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        fetchRefData() {
            fetch('/api/ref')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.refs = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postNewAssign(evt) {
            this.refForm.gameID = this.selectedGame.gameID;        
            
            console.log("Creating!", this.refForm);
    
            fetch('api/assignments/create.php', {
                method:'POST',
                body: JSON.stringify(this.refForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assign = json;
                
                // reset the form
              })
              .catch( err => {
                alert("Something went horribly wrong.");
              });
          },
        postDeleteAssign(o) {  
            if ( !confirm("Are you sure you want to delete the aassignment from " + o.fName + "?") ) {
                return;
            }  
            
            console.log("Delete!", o);
    
            fetch('api/assignments/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assign= json;
                
                
              });
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
