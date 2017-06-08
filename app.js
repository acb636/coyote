(function (angular, undefined) {

  var app = angular.module('coyote', []);

  app.controller('CoyoteController', function ($scope) {

    $scope.formData = {};
    $scope.formData.keys = [];
    $scope.xml = {};
    $scope.objJson = {};
    $scope.formData.result = [];
    $scope.formData.selectedKey = '';
    $scope.formData.uniqResult = false;
    $scope.formData.orderedResult = false;

    function getKeys(obj) {
      angular.forEach(obj, function (item, index) {
        if (angular.isObject(item)) {
          return getKeys(item);
        }
        $scope.formData.keys.push(index);
      });
      $scope.formData.keys = _.uniq($scope.formData.keys);
    }

    function getValuesForKey(obj, key) {
      angular.forEach(obj, function (item, index) {
        if (angular.isObject(item)) {
          return getValuesForKey(item, key);
        }
        if (index == key) {
          $scope.formData.result.push(item);
        }
      });

      if($scope.formData.uniqResult) {
        $scope.formData.result = _.uniq($scope.formData.result);
      }
       if($scope.formData.orderedResult) {
        $scope.formData.result = _.sortBy($scope.formData.result);
       }
    }

    $scope.convert = function () {
      $scope.formData.result = [];
      $scope.formData.selectedKey = '';
      $scope.formData.keys = [];
      var x2js = new X2JS();
      $scope.xml = $scope.formData.xml;
      $scope.objJson = x2js.xml_str2json($scope.xml);
      getKeys($scope.objJson);
    };

    $scope.getContent = function () {
      $scope.formData.result = [];
      return getValuesForKey($scope.objJson, $scope.formData.selectedKey);
    };

    $scope.getUniqResult = function() {
      $scope.formData.uniqResult = !$scope.formData.uniqResult;
      $scope.getContent();
    };

    $scope.getOrderedResult = function() {
      $scope.formData.orderedResult = !$scope.formData.orderedResult;
      $scope.getContent();
    };


  });

})(angular);
$( document ).ready(function() {
  var clipboard = new Clipboard('.clipboard');
});
