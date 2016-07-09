/**
 * 
 */
'use strict';

App.factory('customerService', ['$http', '$q', function($http, $q){
 
    return {
         
            fetchAllCustomers: function() {
                    return $http.get('http://localhost:8080/orderServices/customers/getCustomers/')
                            .then(
                                    function(response){
                                        console.log(response);
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching customers');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createCustomer: function(customer){
                    return $http.post('http://localhost:8080/orderServices/customers/createCustomer', customer)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating customer');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateCustomer: function(customer, id){
                    return $http.put('http://localhost:8080/Spring4MVCAngularJSExample/customer/'+id, customer)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating customer');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
             
//            deleteCustomer: function(id){
//                    return $http.delete('http://localhost:8080/Spring4MVCAngularJSExample/customer/'+id)
//                            .then(
//                                    function(response){
//                                        return response.data;
//                                    }, 
//                                    function(errResponse){
//                                        console.error('Error while deleting customer');
//                                        return $q.reject(errResponse);
//                                    }
//                            );
//            }
         
    };
 
}]);