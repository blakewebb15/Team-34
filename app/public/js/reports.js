
const Reports = {
    data() {
      return {
        games: [],
        refereeForm: {},
        selectedReferee: null,
        refs: []
      }
    },
    methods: {
        fetchGamesData() {
            this.selectedReferee = this.refereeForm.refID
            console.log("SelectedRef", this.selectedReferee);        
            console.log("Fetching offer data for ", this.refereeForm.refID);
            fetch('/api/reports/?ref=' + this.refereeForm.refID)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log( "assign data", responseJson);
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
        }
    },
    created() {
        this.fetchRefData();
    }
  }
  
  Vue.createApp(Reports).mount('#repsApp');
  