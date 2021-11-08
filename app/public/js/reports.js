
const Reports = {
    data() {
      return {
        refereeForm: {},
        selectedReferee: null,
        refs: [],
        reportOne: false,
        reportTwo: false,
        game: []
      }
    },
    methods: {
        fetchGamesData() {
            this.selectedReferee = this.refereeForm.refID
            console.log("SelectedRef", this.selectedReferee);        
            console.log("Fetching offer data for ", this.refereeForm.refID);
            fetch('/api/reports/?ref=' + this.refereeForm.refID + '&startDate=' + this.refereeForm.startDate + '&endDate=' + this.refereeForm.endDate)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log( "assign data", responseJson);
                this.games = responseJson;
                this.reportOne = true;
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
        fetchGameData() {
            fetch('/api/reports/unassigned.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.game = responseJson;
                this.reportTwo = true;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        }
    },
    created() {
        this.fetchRefData();
    }
  }
  
  Vue.createApp(Reports).mount('#repsApp');
  