# اپ موبایل (Expo / React Native)

شامل سه بخش: لیست کارها، یادداشت‌ها و ماشین‌حساب (داده‌ها روی گوشی ذخیره می‌شوند).

## اجرا روی گوشی
```
npm install
npx expo start
```
اپ **Expo Go** را روی گوشی نصب کنید و QR کد را اسکن کنید.

## ساخت APK برای نصب
```
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
لینک دانلود APK در پایان بیلد داده می‌شود.
