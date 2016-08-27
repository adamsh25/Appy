package com.dev.adam.appyandroidapp.utils;

import android.os.Bundle;

import java.util.ArrayList;
import java.util.List;

import com.facebook.AccessToken;
import com.facebook.FacebookSdk;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.HttpMethod;
import com.facebook.Profile;

import org.json.JSONObject;

/**
 * Created by adam on 18/08/2016.
 */
public final class FacebookUtils {

    private FacebookUtils(){
        throw new IllegalStateException("No instances.");
    }

    public static List<String> getUserLiveVideosToEmbed(Profile p){
        final List<String> videosToEmbed = new ArrayList<>();

        try {

            new GraphRequest(
                    AccessToken.getCurrentAccessToken(),
                    "/{live-video-id}",
                    null,
                    HttpMethod.GET,
                    new GraphRequest.Callback() {
                        public void onCompleted(GraphResponse response) {
                            /* handle the result */
                            videosToEmbed.add("bla");
                        }
                    }
            ).executeAsync();

        }catch (Exception e) {

        }

        return videosToEmbed;
    }




}
