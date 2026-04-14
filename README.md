# 米线AI - AI智能生图平台

基于豆包Seedream 5.0的AI智能生图平台，输入描述即可生成精美图片。

## 网页截图

<img width="2880" height="1530" alt="image" src="https://github.com/user-attachments/assets/51ef329e-7e28-493b-bc56-527f859f037c" />
<img width="2880" height="1530" alt="image" src="https://github.com/user-attachments/assets/1e82d795-ef36-486d-bc43-ed860781f65d" />

## 功能特点

- **用户登录** - 支持账号密码登录
- **积分系统** - 生图消耗积分，支持兑换码兑换
- **AI生图** - 集成火山引擎豆包Seedream 5.0模型
- **历史记录** - 本地存储生图历史，支持查看、下载、删除
- **图片预览** - 大图预览功能

## 技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式
- Lucide React 图标库

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 测试账号

- 账号：`mixian0816`
- 密码：`666666`

## 测试兑换码

- `AIVORA-1a5s495n`（兑换100积分）

## API配置

本项目使用火山引擎豆包Seedream 5.0 API，API密钥已配置在 `src/lib/api.ts` 中。

## 项目结构

```
mixin-ai-image-generator/
├── public/              # 静态资源
│   └── qrcode.png       # 客服二维码
├── src/
│   ├── components/      # React组件
│   │   ├── Header.tsx
│   │   ├── LoginModal.tsx
│   │   ├── RedeemModal.tsx
│   │   ├── ImageInput.tsx
│   │   ├── ImageHistory.tsx
│   │   ├── ImageViewModal.tsx
│   │   └── Toast.tsx
│   ├── lib/
│   │   ├── api.ts       # API调用
│   │   └── utils.ts     # 工具函数
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 许可证

MIT
