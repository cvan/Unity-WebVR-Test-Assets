# Unity-WebVR-Test-Assets

WebVR template and assets for creating WebVR-enabled Unity projects.


## How to Use

### 0. Install/Upgrade/Launch Unity

1. [Download the latest version of _Unity_](https://unity3d.com/get-unity/update) to install/upgrade.
2. For `Components`, check the `WebGL Build Support` checkbox.
3. For Mac OS X users only, also check the `Windows Build Support` checkbox.
4. Proceed to finish the installation process. (For Windows users who are installing _Unity_ for the first time, patiently wait for the subsequent installation of the _Microsoft Visual Studio Tools for Unity_.)
5. Upon launching Unity, create a new project or load an existing project.

<img height="300" style="max-width: 400px" alt="Windows – Unity Installation for WebGL Build Support" title="Windows – Unity Installation for WebGL Build Support" src="https://cloud.githubusercontent.com/assets/203725/14880434/9d1b6dde-0ce3-11e6-875d-7f198c1d8016.png"> &nbsp; <img height="300" style="max-width: 400px" alt="Mac OS X – Unity Installation for WebGL Build Support" title="Mac OS X – Unity Installation for WebGL Build Support" src="https://cloud.githubusercontent.com/assets/203725/14880435/9d1ce0d8-0ce3-11e6-938c-bbc7d73dcd4f.png">

### 1. Copy the WebGL template files

* __Windows__ users: Overwrite `C:\Program Files\Unity\Editor\Data\PlaybackEngines\webglsupport\BuildTools` with [`WebGLTemplates`](WebGLTemplates).
* __Mac OS X__ users: Copy the [`WebGLTemplates`](WebGLTemplates) directory (not just the contents, but the directory itself) into your project's `Assets` directory (`Assets > Reveal in Finder`).

### 2. Use the WebGL player template

1. Load the `Settings for WebGL` from `Edit > Project Settings > Player` (i.e., the tab with the HTML5 logo).
2. Select the `Resolution and Presentation` group.
3. Under `Resolution`, check the `Run In Background` checkbox.
4. Under `WebGL Template`, select the `WebVR` template.

<img width="400" alt="Unity Player Settings for WebGL" title="Unity Player Settings for WebGL" src="https://cloud.githubusercontent.com/assets/203725/14880230/90984d76-0ce2-11e6-8dd6-1bb88699e14f.png">

### 3. Set up the WebVR camera

1. Copy the entire [`WebVRAssets/Prefabs`](WebVRAssets/Prefabs) directory into your project's [`Assets`](#1-copy-the-webgl-template-files) directory (`Assets > Reveal in Finder`).
2. From the bottom pane, select the `Project` tab.
3. Drag the `WebVRAssets/WebVRCameraSet.prebab` file to the `Main Camera` row in the `Hierarchy` list.
4. Copy the `WebVRAssets/Scripts/StereoCamera.cs` file into your project's `Assets` directory and ensure that it is attached to the parent node of the prefab.

<img width="400" alt="Unity Player Settings for WebGL" title="Unity Player Settings for WebGL" src="https://cloud.githubusercontent.com/assets/203725/14883995/ce771dde-0cf6-11e6-82aa-1332f2a3987f.png">

### 5. Build for WebGL and run

1. Load the `File > Build Settings…` menu.
2. Click the `WebGL` platform row, and then click the `Switch Platform` button.
3. Click the `Build` button.

<img width="400" alt="Unity WebGL Build Settings" title="Unity WebGL Build Settings" src="https://cloud.githubusercontent.com/assets/203725/14879699/95632c7a-0cdf-11e6-9b59-9e7e01504c54.png">


Once your project finishes building, open the generated `index.html` in a [WebVR-enabled browser](https://webvr.info/#how-can-i-try-it).

* __Firefox__: [Use Firefox Nightly with WebVR](http://mozvr.com/#start)
* __Chromium__: [Download the experimental WebVR Chromium builds](https://webvr.info/get-chrome/)

* __Windows__ users: Open your project in your browser of choice.
* __Mac OS X__ users: Since the major headsets are targeted for only Windows (i.e., Oculus Rift and HTC Vive), and you're developing from a Mac, you'll likely want to serve your project from a server on your local network and test it from your Windows machine. To spawn a server, we recommend using the [`http-server` Node package](https://www.npmjs.com/package/http-server): `npm install -g http-server && http-server -c-1`.


----



## Japanese Instructions

UnityでWebVRに対応したWebGLビルドを行うテスト用のテンプレートおよびアセット

###使い方
WebGLTemplatesフォルダーを、
* Windowsの場合
  C:\Program Files\Unity\Editor\Data\PlaybackEngines\webglsupport\BuildToolsのフォルダーに上書きします。
* Macの場合
  Assetsフォルダーにコピーします。

これで、Build Settings > WebGL > Player Settings > Publishing Settings > WebGL Template にWebVRというテンプレートが追加されます。

次にWebVRAssetsフォルダー内のPrefabフォルダーとScriptsフォルダーをAssetsフォルダにコピーします。
PrefabsフォルダーにはWebVRCameraSetというPrefabがありますので、このカメラを適当に配置し、WebVRCameraSetにScriptsフォルダー内にあるStereoCamera.csをアタッチします。

あとは、WebGLでWebVRテンプレートを使ってビルドを行い、出力されたindex.htmlにアクセスすればできます。


ライセンスはフリーです。自由に使ってください。
