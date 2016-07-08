/**
 * 
 */
'use strict';
 
App.controller('customerController', ['$scope', 'customerService', function($scope, customerService) {
          var self = this;
          self.customer={id:null,customerFirstName:'',customerLastName:'',customerMobile:'',customerPhone:'',customerCountry:'',customerState:'',customerPostcode:'',customerAddress:'',customerEmail:''};
          self.customersPromise;
          self.customers=[];
               
          self.fetchAllCustomers = function(){
        	  customerService.fetchAllCustomers()
                  .then(
                               function(d) {
                                   self.customersPromise = d;
                                   alert("customers fetched "+d);
                                    self.customers = customersPromise.customerList;
                                    console.log(customersPromise);
                               },
                                function(errResponse){
                                    console.error('Error while fetching customers');
                                }
                       );
          };
            
          self.createCustomer = function(customer){
              customerService.createCustomer(customer)
                      .then(
                      self.fetchAllCustomers, 
                              function(errResponse){
                                   console.error('Error while creating Customer.');
                              } 
                  );
          };
 
         self.updateCustomer = function(customer, id){
              customerService.updateCustomer(customer, id)
                      .then(
                              self.fetchAllCustomers, 
                              function(errResponse){
                                   console.error('Error while updating Customer.');
                              } 
                  );
          };
 
         self.deleteCustomer = function(id){
              customerService.deleteCustomer(id)
                      .then(
                              self.fetchAllCustomers, 
                              function(errResponse){
                                   console.error('Error while deleting Customer.');
                              } 
                  );
          };
 
          self.fetchAllCustomers();
 
          self.submit = function() {
              if(self.customer.id===null){
                  console.log('Saving New Customer', self.customer);    
                  self.createCustomer(self.customer);
              }else{
                  self.updateCustomer(self.customer, self.customer.id);
                  console.log('Customer updated with id ', self.customer.id);
              }
              self.reset();
          };
               
          self.edit = function(id){
              console.log('id to be edited', id);
              for(var i = 0; i < self.customers.length; i++){
                  if(self.customers[i].id === id) {
                     self.customer = angular.copy(self.customers[i]);
                     break;
                  }
              }
          };
               
          self.remove = function(id){
              console.log('id to be deleted', id);
              if(self.customer.id === id) {//clean form if the customer to be deleted is shown there.
                 self.reset();
              }
              self.deleteCustomer(id);
          };
 
           
          self.reset = function(){
              self.customer={id:null,customerFirstName:'',customerLastName:'',customerMobile:'',customerPhone:'',customerCountry:'',customerState:'',customerPostcode:'',customerAddress:'',customerEmail:''};
              $scope.myForm.$setPristine(); //reset Form
          };
 
      }]);