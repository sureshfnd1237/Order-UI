/**
 * 
 */
 
App.controller('customerController', ['$scope', 'customerService', function($scope, customerService) {
//          var cust={id:null,customerFirstName:'hello',customerLastName:'',customerMobile:'',customerPhone:'',customerCountry:'',customerState:'',customerPostcode:'',customerAddress:'',customerEmail:''};
          $scope.customers=[];
//          $scope.customer=cust;
          
          $scope.id=null;
          $scope.customerFirstName='';
          $scope.customerLastName='';
          $scope.customerMobile='';
          $scope.customerPhone='';
          $scope.customerCountry='';
          $scope.customerState='';
          $scope.customerPostcode='';
          $scope.customerAddress='';
          $scope.customerEmail='';

          $scope.customer = {id:$scope.id,customerFirstName:$scope.customerFirstName,customerLastName:$scope.customerLastName,customerMobile:$scope.customerMobile,customerPhone:$scope.customerPhone,customerCountry:$scope.customerCountry,customerState:$scope.customerState,customerPostcode:$scope.customerPostcode,customerAddress:$scope.customerAddress,customerEmail:$scope.customerEmail};

//          $scope.dataJson={};
               
          $scope.fetchAllCustomers = function(){
        	  customerService.fetchAllCustomers()
                  .then(
                               function(d) {
//                            	   $scope.dataJson=d;
//                                    $scope.customers = dataJson.customerList;
                            	   $scope.customers=d.customerList;
                                    console.log(d.customerList);
                                    console.log(d);
                                    console.log($scope.customers);
                               },
                                function(errResponse){
                                    console.error('Error while fetching customers');
                                }
                       );
          };
            
          $scope.createCustomer = function(customer){
              customerService.createCustomer(customer)
                      .then(
                      $scope.fetchAllCustomers, 
                              function(errResponse){
                                   console.error('Error while creating Customer.');
                              } 
                  );
          };
 
         $scope.updateCustomer = function(customer, id){
              customerService.updateCustomer(customer, id)
                      .then(
                              $scope.fetchAllCustomers, 
                              function(errResponse){
                                   console.error('Error while updating Customer.');
                              } 
                  );
          };
 
         $scope.deleteCustomer = function(id){
              customerService.deleteCustomer(id)
                      .then(
                              $scope.fetchAllCustomers, 
                              function(errResponse){
                                   console.error('Error while deleting Customer.');
                              } 
                  );
          };
 
          $scope.fetchAllCustomers();
 
          $scope.submit = function() {
              if($scope.customer.id===null){
                  console.log('Saving New Customer', $scope.customer);    
                  $scope.createCustomer($scope.customer);
              }else{
                  $scope.updateCustomer($scope.customer, $scope.customer.id);
                  console.log('Customer updated with id ', $scope.customer.id);
              }
              $scope.reset();
          };
               
          $scope.edit = function(id){
              console.log('id to be edited', id);
              for(var i = 0; i < $scope.customers.length; i++){
                  if($scope.customers[i].id === id) {
                     var cust = angular.copy($scope.customers[i]);
                     
                     $scope.id=cust.id;
                     $scope.customerFirstName=cust.customerFirstName;
                     $scope.customerLastName=cust.customerLastName;
                     $scope.customerMobile=cust.customerMobile;
                     $scope.customerPhone=cust.customerPhone;
                     $scope.customerCountry=cust.customerCountry;
                     $scope.customerState=cust.customerState;
                     $scope.customerPostcode=cust.customerPostcode;
                     $scope.customerAddress=cust.customerAddress;
                     $scope.customerEmail=cust.customerEmail;                     
                     $scope.customer = {id:$scope.id,customerFirstName:$scope.customerFirstName,customerLastName:$scope.customerLastName,customerMobile:$scope.customerMobile,customerPhone:$scope.customerPhone,customerCountry:$scope.customerCountry,customerState:$scope.customerState,customerPostcode:$scope.customerPostcode,customerAddress:$scope.customerAddress,customerEmail:$scope.customerEmail};

//                     $scope.customer = {id:cust.id,customerFirstName:cust.customerFirstName,customerLastName:cust.customerLastName,customerMobile:cust.customerMobile,customerPhone:cust.customerPhone,customerCountry:cust.customerCountry,customerState:cust.customerState,customerPostcode:cust.customerPostcode,customerAddress:cust.customerAddress,customerEmail:cust.customerEmail};

                     console.log("customer id to edit "+$scope.customer.id);
                     break;
                  }
              }
          };
               
          $scope.remove = function(id){
              console.log('id to be deleted', id);
              if($scope.customer.id === id) {//clean form if the customer to be deleted is shown there.
                 $scope.reset();
              }
              $scope.deleteCustomer(id);
          };
 
           
          $scope.reset = function(){
              $scope.customer={id:null,customerFirstName:'',customerLastName:'',customerMobile:'',customerPhone:'',customerCountry:'',customerState:'',customerPostcode:'',customerAddress:'',customerEmail:''};
              $scope.myForm.$setPristine(); //reset Form
          };
 
      }]);