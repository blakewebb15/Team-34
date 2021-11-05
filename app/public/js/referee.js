
const Referees = {
    data() {
      return {
          referees: [],
          refereeForm: {},
          selectedReferee: null,
    
        }
    },
    computed: {},
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectReferee(s) {
            if (s == this.selectedReferee) {
                return;
            }
            this.selectedReferee = s;
            this.referees = [];
            this.fetchRefereeData(this.selectedReferee);
        },
        fetchRefereeData() {
            fetch('/api/ref/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postReferee(evt){
            if (this.selectedReferee){
                this.PostEditReferee(evt);
            } else{
                this.postNewReferee(evt);
            }
        },

        PostEditReferee(evt){
            this.refereeForm.refID = this.selectedReferee.refID;        
          console.log("Editing:", this.refereeForm);
          alert("Editing!");
  
          fetch('api/ref/update.php', {
              method:'POST',
              body: JSON.stringify(this.refereeForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              // reset the form  （clean the form)
              this.handleResetEdit;
            });
        },
        postDeleteReferee(o) {
            if (!confirm("Are you sure you want to delete the offer from "+o.Title+"?")) {
                return;
            }
            
            fetch('api/ref/delete.php', {
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
                this.referees = json;
                
                // reset the form  （clean the form)
                this.refereeForm = {};
              });
          
          },
    postNewReferee(evt) {     
        console.log("Posting:", this.refereeForm);
        alert("Posting!");

        fetch('api/ref/create.php', {
            method:'POST',
            body: JSON.stringify(this.refereeForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.referees = json;
            
            // reset the form  （clean the form)
            this.refereeForm = {};
          });
      },

      handleEditReferee(referee){
        this.selectedReferee = referee;
        this.refereeForm = Object.assign({}, this.selectedReferee);
      },
      handleResetEdit(){
        this.selectedReferee = null;
        this.refereeForm = {};
      }

  },


   
  created() {
    return this.fetchRefereeData();
 }
}

Vue.createApp(Referees).mount('#refApp');