/**
 * Created by kartikmathpal on 26/02/17.
 */
(function(angular){


    var bieApp = angular
        .module('bieApp',[])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.html5Mode(true);
        }])
        .controller('MainController',['$scope', '$log','$http', '$location', function($scope, $log, $http, $location){
            $scope.key = ''
            $scope.recordsFound = false
            $scope.searching = false

            $scope.survey = function(key) {

                $scope.recordsFound = false
                $scope.matchedRecords = []
                if(key && key.trim()){
                    $log.info("search for", key)
                    $scope.searching = true
                    $scope.collection = $location.search()['collection']
                    $log.info('collection',$scope.collection)
                    $http.get('rest_service/survey?key=' + key + '&collection=' + $scope.collection).then(
                        function successCallback(response){
                            $log.info("response", response)
                            $scope.matchedRecords = response.data
                            $scope.recordsFound = true
                            $scope.searching = false
                        },
                        function errorCallback(response) {
                            $log.error("response", response)
                            $scope.searching = false
                        }
                    )
                }
            }

        }])


})(window.angular);
