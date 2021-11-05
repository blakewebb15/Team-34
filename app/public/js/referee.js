
const Referees = {
    data() {
      return {
          referees: [],
          refereeForm: {},
          selectedReferee: null,
          edit: false,
          editForm: {}
    
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
            this.edit = false;
            this.selectedReferee = s;
            this.fetchRefereeData();
        },
        handleEditReferee(evt) {
          console.log("Edit button:",evt);
          if (this.edit) {
              return;
          }
          this.edit = true;
          this.editForm = Object.assign({}, this.selectedReferee);
          // this.games = [];
          // this.fetchOfferData(this.selectedStudent);
      },
      handleCancelEdit() {
          this.edit = false;
      },
      editReferee(evt) {
          console.log("Passed from html",evt);
          this.postEditReferee(evt);
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
        postEditReferee(evt) {
          this.editForm.refID= this.selectedReferee.refID; 

          
          console.log("Editing!", this.editForm);
  
          fetch('api/ref/update.php', {
              method:'POST',
              body: JSON.stringify(this.editForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              // reset the form
              this.edit = false;
              this.editForm = {};
            });
      },
        postDeleteReferee(o) {
            if (!confirm("Are you sure you want to delete "+o.fName+"?")) {
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
                this.selectedReferee = null;
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