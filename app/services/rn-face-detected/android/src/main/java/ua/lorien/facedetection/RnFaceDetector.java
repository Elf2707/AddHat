package ua.lorien.facedetection;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Bitmap.Config;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.provider.MediaStore.Images.Media;
import android.net.Uri;

import com.google.android.gms.vision.face.Face;
import com.google.android.gms.vision.face.FaceDetector;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.Frame;

import android.util.Log;
import android.util.SparseArray;
import android.widget.Toast;

import java.io.OutputStream;

public class RnFaceDetector extends ReactContextBaseJavaModule {
    final private String TAG = "ReactNativeJS";

    private ReactApplicationContext mContext;
    private SparseArray<Face> mFaces;

    private Bitmap mSourceImage;
    private String mSourceFileName;

	public RnFaceDetector(ReactApplicationContext reactContext){
		super(reactContext);
		this.mContext = reactContext;
	}

	@Override
	public String getName(){
		return "RnFaceDetector";
	}

	@ReactMethod
	public void detectFaces(String picFileName, Promise promise){
        mSourceFileName = picFileName;

        try {
            mSourceImage = Media.getBitmap(mContext.getContentResolver(), Uri.parse(mSourceFileName));

            FaceDetector detector = new FaceDetector.Builder(mContext)
                           .setMode(FaceDetector.ACCURATE_MODE)
                           .setTrackingEnabled(false)
                           .setLandmarkType(FaceDetector.ALL_LANDMARKS)
                           .setClassificationType(FaceDetector.ALL_CLASSIFICATIONS)
                           .build();

            if (!detector.isOperational()) {
                String msg = mContext.getResources().getString(R.string.google_vision_notready);
                Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
                Log.w(TAG, msg);
                promise.reject(msg);
                return;
            }

            Frame frame = new Frame.Builder().setBitmap(mSourceImage).build();
            mFaces = detector.detect(frame);

            detector.release();
            promise.resolve("ssssssssssssssssss---done---ssssssssssssssssssssssss" + mFaces.size());
        } catch(Exception e){
            promise.reject(e);
        }
	}

	@ReactMethod
    public void drawRectangleOnFaces(){
        if(mFaces == null || mFaces.size() == 0){
            String msg = mContext.getResources().getString(R.string.no_faces);
            Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
            Log.w(TAG, msg);
            return;
        }

        //Draw rectangle on every face
        Paint paint = new Paint();
        paint.setColor(Color.GREEN);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5);

        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inPreferredConfig = Config.RGB_565;
        Bitmap outBitmap = mSourceImage.copy(options.inPreferredConfig, true);

        Canvas drawCanvas = new Canvas(outBitmap);

        float left = 0;
        float top = 0;
        float right = 0;
        float bottom = 0;

        for(int i = 0, size = mFaces.size(); i < size; i++) {
            Face face = mFaces.valueAt(i);

            left = (float) ( face.getPosition().x );
            top = (float) ( face.getPosition().y );
            right = (float) ( face.getPosition().x + face.getWidth() );
            bottom = (float) ( face.getPosition().y + face.getHeight() );
            Log.d(TAG, "sssssssssssssssssssssssssssssdsdsd");
            drawCanvas.drawRect( left, top, right, bottom, paint );
        }

        mSourceImage = outBitmap;
    }

    @ReactMethod
    public void saveResultFile(Promise promise){
        new SavePictureTask(promise);
    }

    private class SavePictureTask implements Runnable {
        Promise mmPromise;

        public SavePictureTask(Promise promise){
            mmPromise = promise;
            new Thread(this, "Save task").start();
        }

        @Override
        public void run(){
            try {
                OutputStream outputStream = mContext.getContentResolver()
                            .openOutputStream(Uri.parse(mSourceFileName));
                mSourceImage.compress(CompressFormat.JPEG, 100, outputStream);

                Log.d(TAG, "tratatatattatatatatatatatta");
                outputStream.flush();
                outputStream.close();
                mmPromise.resolve("image saved");
            } catch (Exception e) {
                Log.e("MyLog", e.toString());
                mmPromise.reject("error while saving image");
            }
        }
    }
}