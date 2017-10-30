import Ember from "ember";
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";
 
var isEven = function() {
  var value = this.get("model.even");
  var number = parseInt(value, 10);
  return number && number % 2 === 0;
};
 
export default Ember.Controller.extend(ValidationMixin, {
    nameValidation: validate("model.name"),
    emailValidation: validate("model.emailAddress", /\S+@\S+\.\S+/),
    evenValidation: validate("model.even", isEven),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                //executed when all fields are valid 
            }
        }
    }
});
