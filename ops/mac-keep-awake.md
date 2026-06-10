# Mac 保持在线设置

更新时间：2026-06-10

## 目的

让 AI副业实验室 的自动化在电脑不关机时尽量保持可运行。

## 已设置

已安装用户级 LaunchAgent：

`~/Library/LaunchAgents/com.ai-side-lab.keepawake.plist`

它会在登录后自动运行：

`/usr/bin/caffeinate -ims`

作用：

- 防止系统因空闲进入睡眠。
- 允许屏幕按系统设置熄灭。
- 插电时更稳定。

## 2026-06-10 已完成系统级插电设置

Jack 已手动执行：

`sudo pmset -c sleep 0 disksleep 0 displaysleep 30`

当前验证结果：

- AC Power `sleep = 0`
- AC Power `disksleep = 0`
- AC Power `displaysleep = 30`
- `caffeinate -ims` 正在运行

这意味着：插电时系统不会因空闲自动睡眠，磁盘也不会因空闲睡眠，屏幕 30 分钟后可熄灭。

## 重要限制

MacBook 合上屏幕后，macOS 通常会触发合盖睡眠。  
`caffeinate` 可以防止空闲睡眠，但不一定能绕过合盖睡眠。

如果希望合盖后仍稳定运行，建议：

1. 插电。
2. 外接显示器、键盘或鼠标，进入官方 clamshell 模式。
3. 不要把电脑合盖后放进包里或被褥里，避免散热风险。

## 最稳推荐

如果 Jack 希望 Codex 长时间自动推进项目：

- 电脑插电。
- 不关机。
- 屏幕可以熄灭。
- 尽量不要合盖；如果必须合盖，确认是否进入官方外接显示器模式。

## 检查命令

查看防睡进程：

`pgrep -fl caffeinate`

查看电源断言：

`pmset -g assertions`

## 关闭方式

如需关闭保持在线：

`launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.ai-side-lab.keepawake.plist`
