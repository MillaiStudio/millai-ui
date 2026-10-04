<div align="center">

# MillaiUI

<p align="center">Adaptive Vue 3 UI components with flexible theming</p>

[![Stars](https://img.shields.io/github/stars/MillaiStudio/millai-ui?style=flat-square)](https://github.com/MillaiStudio/millai-ui/stargazers) [![Forks](https://img.shields.io/github/forks/MillaiStudio/millai-ui?style=flat-square)](https://github.com/MillaiStudio/millai-ui/network) [![Issues](https://img.shields.io/github/issues/MillaiStudio/millai-ui?style=flat-square)](https://github.com/MillaiStudio/millai-ui/issues) [![Watchers](https://img.shields.io/github/watchers/MillaiStudio/millai-ui?style=flat-square)](https://github.com/MillaiStudio/millai-ui/watchers) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

![TypeScript](https://img.shields.io/badge/-TypeScript-555?style=flat-square&logo=typescript) ![Vue3](https://img.shields.io/badge/-Vue3-555?style=flat-square&logo=vue3)

[📚 View Documentation](https://MillaiStudio.github.io/millai-ui) · [🐛 Report Bug](https://github.com/MillaiStudio/millai-ui/issues)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#features)
- [🌐 Documentation](#documentation)
- [⚙️ Prerequisites](#prerequisites)
- [🚀 Installation](#installation)
- [💻 Usage](#usage)
- [📄 License](#license)
- [👤 Contact](#contact)

## 🌟Features

- 📱 Adaptive layouts for desktop, tablet, and mobile
- 🎨 Fully customizable themes with CSS variables
- ⚡ Built for Vue 3 and TypeScript
- 🧩 Consistent design system across components

## 🌐 Documentation

[https://MillaiStudio.github.io/millai-ui](https://MillaiStudio.github.io/millai-ui)

## ⚙️ Prerequisites

- Node.js 22+
- pnpm 9+

## 🚀 Installation

Install the package:

```bash
pnpm add @millai/millai-ui
```

## 💻 Usage

```Vue
<script setup lang="ts">
import { ref } from 'vue';
import { MButton, MCard, MFormField, MTextInput, MVStack } from '@millai/millai-ui';

const name = ref('');
</script>

<template>
    <MCard>
        <MVStack gap="medium" alignment="stretch">
            <MFormField label="名前" required>
                <MTextInput v-model="name" />
            </MFormField>
            <MButton>保存する</MButton>
        </MVStack>
    </MCard>
</template>
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Contact

**ocelot2024**

- GitHub: [@ocelot2024](https://github.com/ocelot2024)
- Project: [https://github.com/MillaiStudio/millai-ui](https://github.com/MillaiStudio/millai-ui)

---

<div align="center">Made with ❤️ by ocelot2024</div>
