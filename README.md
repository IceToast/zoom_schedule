[![Build and Deploy master](https://github.com/IceToast/zoom_schedule/actions/workflows/deploy_master.yml/badge.svg?branch=master)](https://github.com/IceToast/zoom_schedule/actions/workflows/deploy_master.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Zoom Schedule

This Schedule helps students to keep all their Zoom-Links and passwords at one place and access them from every device.
If you want to host this App yourself and plan to use the [compatible API](https://github.com/IceToast/zoom_schedule_backend_go) from me, make sure to host both Apps on the same TLD or use CORS correctly.

# Demo

This Demo is using the [Zoom-Schedule Backend](https://github.com/IceToast/zoom_schedule_backend_go). It's not only a Demo, but a production build with a persistent database. There is no need to host this app yourself.

[DEMO](https://zoom.icetoast.cloud)

[![Screenshot](meta/zoom_schedule_demo.png)](https://zoom.icetoast.cloud)

# Setup - Build - Run

## Install all dependencies

```
yarn
```

## Run development server

```
yarn start
```

## Build project

```
yarn build
```
