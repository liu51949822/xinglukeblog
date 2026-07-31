# SynData 安卓端

React Native (Expo) 安卓应用：剪贴板同步 + 文件传输。

## 开发运行

```bash
cd syndate/android
npm install
npx expo start
```

用手机安装 **Expo Go** 扫码运行（需手机与电脑同一网络或使用隧道）。

## 功能

- 📋 **剪贴板同步**：每 2 秒轮询服务器，检测到新剪贴板自动写入本地剪贴板
- 📁 **文件传输**：选择文件加密上传；点文件下载并分享/保存
- 🔐 **端到端加密**：AES-256-GCM，房间码派生密钥

## 打包 APK

方式一：本地
```bash
npx expo prebuild --platform android
cd android
./gradlew assembleDebug
# 产物: android/app/build/outputs/apk/debug/app-debug.apk
```

方式二：CI（推荐）
- push `syndate/android/` 或手动触发 `Syndate Android Build` Actions
- 从 Artifacts 下载 `syndate-android-apk`

## 依赖说明

加密模块依赖 `react-native-quick-crypto`（原生实现 PBKDF2/AES）。
如未安装，安装后需 `npx expo prebuild` 重新生成原生工程。

## 使用步骤

1. 打开 App → 填写**服务器地址**和**房间码**
2. 点「连接」→ 提示成功
3. 剪贴板 / 文件功能即可使用
