'use strict';

angular.module('angularJspracticesApp')
  .service('Validators', function Validators() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
        // Global validation error messages that are used if not overridden.
        // Key matches validation error key used by AngularJS API.
        'errors': {
            'required': "This field is required.",
            'email': "Please enter a valid email address.",
            'minlength': "Value is not long enough.",
            'maxlength': "Value is too long."
        },
        // Custom validation error messages can be specified on a per
        // field basis, and override the default error messages.
        'custom_errors': {
            // Custom errors must be formatted as follows
            //'field_name': {'error_key':'Error Message'},
        },
        // get_custom_error retrieves a custom error message
        // if it exists
        'get_custom_error': function(name,error){
            if(!this.custom_errors[name]){
                return false;
            }
            if(!this.custom_errors[name][error]){
                return false;
            }
            return this.custom_errors[name][error];
        },
        // validate_field is called by templates/controllers to
        // collect all validation error messages for display on the page.
        // It is usually called by validate_form or from a blur event
        // on a field.
        'validate_field': function(name,form,errors,custom_messages){
            // Setup containers
            var report_errors = [];
            // Proceed only if field is invalid
            if(form[name].$invalid){
                // Loop through all potential field errors
                for(var e in form[name].$error){
                    // If error is activated
                    if(form[name].$error[e]){
                        // Attempt to get a custom error message
                        var custom_error = this.get_custom_error(name,e);
                        if(custom_error){
                            // Use custom error message if it exists
                            report_errors.push(custom_error);
                        }else if(this.errors[e]){
                            // Otherwise use the default error message
                            // if it exists.
                            report_errors.push(this.errors[e]);
                        }else{
                            // If no default or custom error message
                            // exists for this error, use error key
                            // as the message. 
                            report_errors.push("Error: " + e)
                        }
                    }
                }
            }
            // Setup another container
            var clean_errors = [];
            // De-duplicate error messages
            angular.forEach(report_errors, function(el, i){
                if(clean_errors.indexOf(el) == -1) clean_errors.push(el);
            });
            // If requesting function specified an existing errors
            // container, dump all error messages into it.
            if(errors){
                errors[name] = clean_errors;
            }
        },
        // validate_distinct checks two fields to see if they
        // are distinct.  Then returns validation errors based
        // on the provided message if they match.
        'validate_distinct': function(name_1, name_2, form, errors, message){
            // Get the fields from the form
            var field1 = form[name_1];
            var field2 = form[name_2];
            // Check if the field values are set, and match
            if(field1.$viewValue == field2.$viewValue && !!field1.$viewValue){
                // Trigger validation error for distinct on first field
                field1.$setValidity("distinct", false);
            }else{
                // Otherwise unset any distinct validation errors.
                field1.$setValidity("distinct", true);
            }
            // If first field has a value, perform other validation checks.
            if(!!field1.$viewValue){
                this.validate_field(name_1, form, errors);
            }
        },
        // validate_identical checks two fields to see if they
        // are identical.  Then returns validation errors based
        // on the provided message if they don't match.
        'validate_identical': function(name_1, name_2, form, errors, message){
            // Get the fields from the form
            var field1 = form[name_1];
            var field2 = form[name_2];
            // Check if the field values are set, and don't match
            if(field1.$modelValue != field2.$modelValue && !!field1.$modelValue){
                // Trigger validation error for identical on first field
                field1.$setValidity("identical", false);
            }else{
                // Otherwise unset any identical validation errors.
                field1.$setValidity("identical", true);
            }
            // If first field has a value, perform other validation checks.
            if(!!field1.$viewValue){
                this.validate_field(name_1, form, errors);
            }
        },
        // validate_form is usually called when submit button is pressed.  It
        // will loop through all form fields and collect error messages based
        // on running validate_field against each of them.
        'validate_form': function(form,errors){
            // Loop through all form properties (fields being a subset)
            for(var field in form){
                // Check that property doesn't start with $
                // If it doesn't, then it is a field as stored by AngularJS
                if(field.substr(0,1) != "$"){
                    // Trigger validate_field against it.
                    this.validate_field(field,form,errors);
                }
            }
        }
    }
});
