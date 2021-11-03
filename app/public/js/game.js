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
<<<<<<< Updated upstream
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
=======
          prettyData(d) {
              return dayjs(d)
              .format('MMM D, YYYY')
          },
          selectGame(g) {
              if (g == this.selectedGame) {
                  return;
              }
              this.selectedGame = g;
              console.log(g);
              this.fetchRefData();
              this.fetchAssignmentData(g);
              // this.games = [];
              // this.fetchOfferData(this.selectedStudent);
          },
          fetchRefData() {
            fetch('/api/ref/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.refs = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
>>>>>>> Stashed changes
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
        fetchAssignmentData(s) {
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
<<<<<<< Updated upstream
        }
=======
        },
        postNewAssignment(evt) {  
          this.refForm.gameID = this.selectedGame.gameID;
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
            });
          // reset the form
          this.refForm = {};
          this.fetchGameData();
        },
        postDeleteAssignment(g){ 
          console.log(g);
          game = this.selectedGame;
          // alert("Posting!");
          if(!confirm("Are you sure you want to delete the assignment from " + game.title + "?")){
              return;
          }

          fetch('api/assignments/delete.php', {
              method:'POST',
              body: JSON.stringify(g),
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
              
              this.refForm = {};
            });

      },
      postDeleteGame(g){ 
          console.log("Deleting:", this.gameForm);
          // alert("Posting!");
          if(!confirm("Are you sure you want to delete the offer from" + g.title + "?")){
              return;
          }

          fetch('api/game/delete.php', {
              method:'POST',
              body: JSON.stringify(g),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              // reset the form
              this.selectedGame = null;
              this.gameForm = {};
            });
          this.fetchGameData();

      }
>>>>>>> Stashed changes
        

    },
    created() {
        return this.fetchGameData();
     
    }
}
  
Vue.createApp(gameApp).mount('#gameApp');
