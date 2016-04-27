/* global HMDVRDevice, PositionSensorVRDevice, SendMessage, THREE, VRDisplay */
// (function () {
  var btnEnterVr = document.querySelector('#btnEnterVr');
  var btnResetSensor = document.querySelector('#btnResetSensor');
  var canvas = document.querySelector('#canvas');
  var fsChangeEvent;
  var fsMethod;
  var isDeprecatedAPI = false;
  var vrDisplay;
  var vrSensor;

  btnEnterVr.addEventListener('click', vrEnterVr);
  btnResetSensor.addEventListener('click', vrResetSensor);

  function vrEnterVr () {
    btnEnterVr.blur();
    if (!vrDisplay) {
      throw 'No VR device was detected';
    }
    return requestPresent();
  }

  function vrResetSensor () {
    btnResetSensor.blur();
    if (!vrDisplay) {
      throw 'No VR device was detected';
    }
    return resetSensor();
  }

  function raf (cb) {
    if (!vrDisplay) {
      return;
    }
    if (vrDisplay.requestAnimationFrame) {
      return vrDisplay.requestAnimationFrame(cb);
    } else {
      return window.requestAnimationFrame(cb);
    }
  }

  function getVRDisplays () {
    console.log('getVRDisplays');
    if (navigator.getVRDisplays) {
      return navigator.getVRDisplays().then(filterDevices);
    } else if (navigator.getVRDevices) {
      isDeprecatedAPI = true;
      return navigator.getVRDevices().then(filterDevices);
    } else {
      throw 'Your browser is not VR ready';
    }

    function filterDevices (devices) {
      var device;
      for (var i = 0; i < devices.length; i++) {
        device = devices[i];
        if (!vrDisplay && 'VRDisplay' in window && device instanceof VRDisplay) {
          vrDisplay = vrSensor = device;
          console.log('got new vrDisplay', device);
          break;  // We keep the first we encounter.
        } else if (!vrDisplay && 'HMDVRDevice' in window && device instanceof HMDVRDevice) {
          vrDisplay = device;
          console.log('got old vrDisplay', device);
          if (vrSensor) {
            break;
          }
        } else if (!vrSensor && 'PositionSensorVRDevice' in window && device instanceof PositionSensorVRDevice) {
          console.log('got old vrSensor', device);
          vrSensor = device;
          if (vrDisplay) {
            break;
          }
        }
      }

      console.log('filtered devices');

      if (isDeprecatedAPI) {
        document.addEventListener(fsChangeEvent, function () {
          if (isPresenting()) {
            SendMessage('WebVRCameraSet', 'changeMode', 'vr');
          } else {
            SendMessage('WebVRCameraSet', 'changeMode', 'normal');
          }
        });
      } else {
        window.addEventListener('vrdisplaypresentchange', function () {
          if (isPresenting()) {
            SendMessage('WebVRCameraSet', 'changeMode', 'vr');
          } else {
            SendMessage('WebVRCameraSet', 'changeMode', 'normal');
          }
        });
      }
    }
  }

  function getEyeParameters () {
    console.log('getEyeParameters');
    var eyeParamsL = vrDisplay.getEyeParameters('left');
    var eyeParamsR = vrDisplay.getEyeParameters('right');

    var eyeTranslationL = eyeParamsL.eyeTranslation;
    var eyeTranslationR = eyeParamsR.eyeTranslation;
    var eyeFOVL = eyeParamsL.recommendedFieldOfView;
    var eyeFOVR = eyeParamsR.recommendedFieldOfView;

    SendMessage('WebVRCameraSet', 'eyeL_translation_x', eyeTranslationL.x);
    SendMessage('WebVRCameraSet', 'eyeR_translation_x', eyeTranslationR.x);
    SendMessage('WebVRCameraSet', 'eyeL_fovUpDegrees', eyeFOVL.upDegrees);
    SendMessage('WebVRCameraSet', 'eyeL_fovDownDegrees', eyeFOVL.downDegrees);
    SendMessage('WebVRCameraSet', 'eyeL_fovLeftDegrees', eyeFOVL.leftDegrees);
    SendMessage('WebVRCameraSet', 'eyeL_fovRightDegrees', eyeFOVL.rightDegrees);
    SendMessage('WebVRCameraSet', 'eyeR_fovUpDegrees', eyeFOVR.upDegrees);
    SendMessage('WebVRCameraSet', 'eyeR_fovDownDegrees', eyeFOVR.downDegrees);
    SendMessage('WebVRCameraSet', 'eyeR_fovLeftDegrees', eyeFOVR.leftDegrees);
    SendMessage('WebVRCameraSet', 'eyeR_fovRightDegrees', eyeFOVR.rightDegrees);
  }

  function resetSensor () {
    console.log('resetSensor');
    if (isDeprecatedAPI) {
      return vrSensor.resetSensor();
    } else {
      return vrDisplay.resetSensor();
    }
  }

  function getPose () {
    console.log('getPose');
    if (isDeprecatedAPI) {
      return vrSensor.getState();
    } else {
      return vrDisplay.getPose();
    }
  }

  function requestPresent () {
    console.log('requestPresent');
    if (isDeprecatedAPI) {
      return canvas[fsMethod]({vrDisplay: vrDisplay});
    } else {
      return vrDisplay.requestPresent([{source: canvas}]);
    }
  }

  function isPresenting () {
    console.log('isPresenting');
    if (!vrDisplay) {
      return false;
    }
    if (isDeprecatedAPI) {
      return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
    } else {
      return vrDisplay && vrDisplay.isPresenting;
    }
  }

  function getVRSensorState () {
    var state = getPose();
    var euler = new THREE.Euler().setFromQuaternion(state.orientation);
    SendMessage('WebVRCameraSet', 'euler_x', euler.x);
    SendMessage('WebVRCameraSet', 'euler_y', euler.y);
    SendMessage('WebVRCameraSet', 'euler_z', euler.z);
    if (state.position !== null) {
      SendMessage('WebVRCameraSet', 'position_x', state.position.x);
      SendMessage('WebVRCameraSet', 'position_y', state.position.y);
      SendMessage('WebVRCameraSet', 'position_z', state.position.z);
    }
  }

  getVRDisplays().then(function () {
    if (canvas.requestFullscreen) {
      console.log('using requestFullscreen');
      fsMethod = 'requestFullscreen';
      fsChangeEvent = 'fullscreenchange';
    } else if (canvas.mozRequestFullscreen) {
      console.log('using mozRequestFullScreen');
      fsMethod = 'mozRequestFullScreen';
      fsChangeEvent = 'mozfullscreenchange';
    } else if (canvas.webkitRequestFullscreen) {
      console.log('using webkitRequestFullScreen');
      fsMethod = 'webkitRequestFullscreen';
      fsChangeEvent = 'webkitfullscreenchange';
    }

    getEyeParameters();
    update();

    var update = window.update = function () {
      console.log('update');
      getVRSensorState();
      raf(update);
    };
  });
// })();
