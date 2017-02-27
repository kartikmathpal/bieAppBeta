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
            url = $location.path()
            subPath = url.split('/')
            $scope.collection = subPath[subPath.length - 2];
            $log.info('collection',$scope.collection)

            $scope.survey = function(key) {

                $scope.recordsFound = false
                $scope.matchedRecords = []
                if(key && key.trim()){
                    $log.info("search for", key)
                    $scope.searching = true
                    // $scope.collection = $location.search()['collection']
                    $log.info('collection',$scope.collection)
                    $http.get('/service/search?key=' + key + '&collection=' + $scope.collection).then(
                        function successCallback(response){
                            data = response.data;
                            $log.info("response", JSON.stringify(data, null, 2))
                            $scope.matchedRecords = data;
                            $scope.recordsFound = true;
                            $scope.searching = false;
                        },
                        function errorCallback(response) {
                            $log.error("response", response);
                            $scope.searching = false
                        }
                    )
                }
            }

        }])


})(window.angular);
