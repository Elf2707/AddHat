package ua.lorien.facedetection;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.util.Log;

public class FaceDetector extends ReactContextBaseJavaModule {

	public FaceDetector(ReactApplicationContext reactContext){
		super(reactContext);
	}

	@Override
	public String getName(){
		return "FaceDetector";
	}

	@ReactMethod
	public void greeting(String name, Promise promise) {
		promise.resolve("Hello World " + name);
	}
}