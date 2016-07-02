package ua.lorien.facedetection;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.provider.MediaStore.Images.Media;
import android.net.Uri;

import com.google.android.gms.vision.face.Face;
import com.google.android.gms.vision.face.FaceDetector;

import android.util.Log;

public class RnFaceDetector extends ReactContextBaseJavaModule {
    ReactApplicationContext mContext;

	public RnFaceDetector(ReactApplicationContext reactContext){
		super(reactContext);
		this.mContext = reactContext;
	}

	@Override
	public String getName(){
		return "RnFaceDetector";
	}

	@ReactMethod
	public void detectFacesOnPicture(String picFileName, Promise promise){
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inPreferredConfig = Bitmap.Config.ARGB_8888;

        try {
            Bitmap sourceImage = Media.getBitmap(mContext.getContentResolver(), Uri.parse(picFileName));
            promise.resolve("ssssssssssssssssss---done---ssssssssssssssssssssssss" + sourceImage.getWidth());
        } catch(Exception e){
            promise.reject(e);
        }
	}
}
