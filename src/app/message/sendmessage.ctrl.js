(function(){
  var app = angular.module("smsapp.Manage");
  app.controller('SendMessageController',['$scope','SessionService','$rootScope','NotifyService','$state', 'GeneralService', 'Upload', 'REST_BASE_URL', 'NgMap',function($scope,SessionService,$rootScope,NotifyService,$state, GeneralService, Upload, REST_BASE_URL, NgMap){

    $scope.finalMessageObj = {
      // First 4 images. Then Audio and then Video
      files: [
        {
          id: '',
          file_name: '',
          file_type: 0, //Image
        },
        {
          id: '',
          file_name: '',
          file_type: 0, //Image
        },
        {
          id: '',
          file_name: '',
          file_type: 0, //Image
        },
        {
          id: '',
          file_name: '',
          file_type: 0, //Image
        },
        {
          id: '',
          file_name: '',
          file_type: 2, //Audio
        },
        {
          id: '',
          file_name: '',
          file_type: 1, //Video
        },
        {
          id: '',
          file_name: '',
          file_type: 3, //Text/PDF
        },
      ],
      sendVcard: false,
      vcard_title: '',
      vcard_email: '',
      vcard_mobile: '',
      vcard_fullname: '',
      vcard_website: '',
    };

    $scope.uploadFile = function(files, file, newFiles, duplicateFiles, invalidFiles, event, fileIndex) {
      if(invalidFiles.length > 0) {
        NotifyService.error("The file is invalid. Please upload restricted size file only");
        return;
      }
      $scope.finalMessageObj.files[fileIndex].is_uploading = true;
      Upload.upload({
        url: REST_BASE_URL + '/messagefile/saveMessageFile',
        data: {file_type: $scope.finalMessageObj.files[fileIndex].file_type, file_path: file}
      }).then(function (resp) {
        $scope.finalMessageObj.files[fileIndex].is_uploading = false;
        if(resp.data.code==='SUCCESS' && resp.data.data.constructor===Array && resp.data.data.length===1) {
          $scope.finalMessageObj.files[fileIndex].file_name = resp.data.data[0].file_name;
          $scope.finalMessageObj.files[fileIndex].id = resp.data.data[0].id;
        }
        else {
          NotifyService.error("Failed to upload file");
        }
      }, function (resp) {
          NotifyService.error("Failed to upload file");
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      });
    };

    $scope.removeFile = function(fileIndex) {
      $scope.finalMessageObj.files[fileIndex] = {
        id: '',
        file_name: '',
        file_type: $scope.finalMessageObj.files[fileIndex].file_type,
      };
    };

    $scope.createMessage = function() {
      if(!$scope.finalMessageObj.message_text) {
        NotifyService.error('Please enter a message');
        return;
      }
      if(!$scope.finalMessageObj.phone_numbers) {
        NotifyService.error('Please enter phone numbers');
        return;
      }
      if(!$scope.finalMessageObj.phone_numbers) {
        NotifyService.error('Please enter phone numbers');
        return;
      }
      let correctNumbers = 0;
      $scope.finalMessageObj.phone_numbers.split('\n').forEach((phoneNumber) => {
        if(phoneNumber.length===12) {
          correctNumbers++;
        }
      });
      if(correctNumbers!==$scope.finalMessageObj.phone_numbers.split('\n').length) {
        NotifyService.error('You have written incorrect numbers. Please write proper 12 digit phone numbers');
        return;
      }
      if($scope.finalMessageObj.sendVcard) {
        // Validate VCard Details
        if(!$scope.finalMessageObj.vcard_title) {
          NotifyService.error('Please enter VCard Title');
          return;   
        }
        if(!$scope.finalMessageObj.vcard_fullname) {
          NotifyService.error('Please enter VCard Full Name');
          return;   
        }
      }
      let finalObj = {
        message_text: $scope.finalMessageObj.message_text,
        phone_numbers: $scope.finalMessageObj.phone_numbers.split('\n').join(','),
        fileArr: [],
      };
      if($scope.finalMessageObj.sendVcard) {
        finalObj.vcard_id = {
          title: $scope.finalMessageObj.vcard_title,
          full_name: $scope.finalMessageObj.vcard_fullname,
          email: $scope.finalMessageObj.vcard_email,
          website: $scope.finalMessageObj.vcard_website,
          phone: $scope.finalMessageObj.vcard_mobile,
        };
      }
      $scope.finalMessageObj.files.forEach((fileObj) => {
        if(fileObj.file_name && fileObj.id) {
          // file object present. So update
          let tempObj = {
            id: fileObj.id,
          };
          finalObj.fileArr.push(tempObj);
        }
      });
      if(finalObj.fileArr.length === 0) {
        delete finalObj.fileArr;
      }
      if($scope.marker) {
        finalObj.lat = $scope.marker.position.lat();
        finalObj.lng = $scope.marker.position.lng();
      }
      GeneralService.createMessage(finalObj)
      .then((response) => {
        if(response.data.code=='SUCCESS') {
          NotifyService.success('Message Sent Successfully');
          $rootScope.getMyBalance();
          $scope.finalMessageObj = {
            // First 4 images. Then Audio and then Video
            files: [
              {
                id: '',
                file_name: '',
                file_type: 0, //Image
              },
              {
                id: '',
                file_name: '',
                file_type: 0, //Image
              },
              {
                id: '',
                file_name: '',
                file_type: 0, //Image
              },
              {
                id: '',
                file_name: '',
                file_type: 0, //Image
              },
              {
                id: '',
                file_name: '',
                file_type: 2, //Audio
              },
              {
                id: '',
                file_name: '',
                file_type: 1, //Video
              },
              {
                id: '',
                file_name: '',
                file_type: 3, //Text/PDF
              },
            ],
            sendVcard: false,
            vcard_title: '',
            vcard_email: '',
            vcard_mobile: '',
            vcard_fullname: '',
            vcard_website: '',
          };
        }
        else {
          NotifyService.error('Failed to send message');
        }
      })
      .catch((err) => {
        NotifyService.error('Failed to send message');
      });
    }

    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    $scope.locationClicked = function(e) {
        if($scope.marker) {
          $scope.marker.setPosition(e.latLng);
          // $scope.map.panTo(e.latLng);
        }
        else {
          $scope.marker = new google.maps.Marker({position: e.latLng, map: $scope.map});
          // console.log("$scope.marker - ", $scope.marker);
          $scope.map.panTo(e.latLng);
        }
      // }
    };

    $scope.removeLocation = function() {
      $scope.marker.setPosition(null);
      delete $scope.marker;
    }

  }]);
})();