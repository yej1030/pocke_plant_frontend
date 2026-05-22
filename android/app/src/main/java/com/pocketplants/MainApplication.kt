package com.pocketplants

import android.app.Application
import android.content.pm.PackageManager
import android.util.Base64
import android.util.Log

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

import java.security.MessageDigest

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
        },
    )
  }

  override fun onCreate() {
    super.onCreate()

    loadReactNative(this)

    getKeyHash()
  }

  // 카카오 키 해시 출력
  private fun getKeyHash() {

    try {

      val info = packageManager.getPackageInfo(
        packageName,
        PackageManager.GET_SIGNING_CERTIFICATES
      )

      val signatures =
        info.signingInfo?.apkContentsSigners
          ?: return

      for (signature in signatures) {

        val md =
          MessageDigest.getInstance("SHA")

        md.update(signature.toByteArray())

        val keyHash =
          Base64.encodeToString(
            md.digest(),
            Base64.NO_WRAP
          )

        Log.d("HASH", keyHash)
      }

    } catch (e: Exception) {

      Log.e(
        "HASH",
        "키 해시 오류",
        e
      )
    }
  }
}