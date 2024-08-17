import { useWebview } from '@Client/webview/index.js';
import { useClientApi } from '@Client/api/index.js';

const CameraAPI = useClientApi().get('ascended-camera-api');
CameraAPI.ease(true, 1500);

const webview = useWebview();

webview.on('CAMERA_MOVE_START', CameraAPI.cameraMoveStart);
webview.on('CAMERA_MOVE_END', CameraAPI.cameraMoveEnd);
webview.on('CAMERA_SCROLL_UP', CameraAPI.cameraMoveIn);
webview.on('CAMERA_SCROLL_DOWN', CameraAPI.cameraMoveOut);

CameraAPI.setCameraOffset(0, 0, 2);
CameraAPI.ease(true, 2000);