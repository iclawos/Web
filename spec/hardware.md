**English Summary: IClawMINI Product Specifications (RK3588 Version)**

**Product Overview**
IClawMINI is a compact, all-in-one desktop device combining advanced local AI capabilities with high-performance home cloud storage functionality. Housed in a precision-machined aviation-grade aluminum chassis, it leverages the powerful Rockchip RK3588 flagship ARM SoC to serve as both an intelligent desktop assistant and a personal data center.

**Core Hardware**
- **SoC**: Rockchip RK3588 (octa-core with 4× Cortex-A76 up to 2.4GHz + 4× Cortex-A55 up to 1.8GHz)
- **NPU**: 6 TOPS @INT8, supporting INT4/INT8/INT16/FP16 mixed-precision, compatible with mainstream AI frameworks (TensorFlow, PyTorch, ONNX, etc.)
- **Memory**: 4GB/8GB/16GB LPDDR4X/LPDDR5 (4266Mbps / 6400Mbps) – 8GB/16GB recommended for AI workloads
- **Storage**: 64GB onboard eMMC 5.1 for OS, expandable via dual M.2 NVMe slots
- **GPU**: Mali-G610 MP4 with support for 8K video codec (8K@60fps decode, 8K@30fps encode)

**Storage Solution**
- **Dual M.2 NVMe slots** (PCIe 3.0 x1 or x2 lanes each – configurable)
- Bottom access panel for easy SSD installation/upgrades

**Physical Dimensions**
- **Size**: 12.7cm × 12.7cm × 4.97cm 
- **Weight**: ~0.7kg (without drives)
- **Material**: Aviation-grade aluminum body

**Interface Layout**

*Front Panel:*
- 2× USB-C (USB 3.1 Gen1, 5Gbps; one supports DP Alt Mode for video out)
- 3.5mm audio combo jack
- Power button
- Status LEDs (power, drive activity)

*Rear Panel:*
- 2× 2.5 Gigabit Ethernet ports (RJ45, support aggregation)
- 2× USB 3.1 Gen1 Type-A
- 1× USB 3.1 Gen1 Type-C OTG
- HDMI 2.1 (up to 8K@60fps with HDR)
- GPIO expansion header (2.54mm, I2C/SPI/UART/PWM)
- 12V DC power input

**Wireless Connectivity**
- Wi-Fi 6 (dual-band 2.4/5GHz, up to 1.2Gbps, optional Wi-Fi 6E)
- Bluetooth 5.2 with BLE support

**Software Stack**
- **OS Options**: IClawOS/Buildroot/Debian/Ubuntu (official RK3588 BSP support)
- **AI Runtime**: RKNN-Toolkit2-Lite + optimized Ollama/llama.cpp for local models up to 7B parameters; supports TensorFlow Lite, PyTorch, ONNX runtime
- **Cloud Services**: Pre-configured Samba/NFS/DLNA with multi-user support
- **Automation**: Node.js/Python with GPIO libraries, MQTT/HTTP support
- **Docker**: Container-ready for application expansion

**Power & Thermal**
- Input: 12V DC, 5A (60W+ adapter recommended)
- Consumption: ~8W idle, ~25W typical load, up to 35W under max AI/GPU stress
- Cooling: Passive aluminum chassis + smart fan (PID controlled)
- Operating Temp: 0°C to 50°C (industrial option available with wider temp range)

**Key Design Features**
- Compact desktop footprint 
- Tool-free access to dual NVMe slots
- Clean front/rear interface partitioning
- GPIO expansion for DIY automation projects
- Stackable design with expansion module support

**Target Applications**
- Desktop AI automation assistant with voice interaction and local LLM inference
- High-performance home NAS/cloud storage for media streaming, backups, and 8K video transcoding
- Soft router/gateway with 2.5GbE ports and advanced network services
- Edge IoT gateway with multi-channel video analytics (up to 32 channels @1080p)
- Embedded development platform for RK3588 evaluation and prototyping

