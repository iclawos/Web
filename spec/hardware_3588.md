**English Summary: IClawMINI Product Specifications**

**Product Overview**
IClawMINI is a compact, all-in-one desktop device combining local AI capabilities with home cloud storage functionality. Precision-machined aviation-grade aluminum body, ultra-compact design , it leverages ARM architecture's ultra-low power consumption to serve as both an intelligent desktop assistant and a personal data center.

**Core Hardware**
- **SoC**: Rockchip RK3568 (quad-core Cortex-A55 up to 2.0GHz)
- **NPU**: 1 TOPS @INT8, supporting mainstream AI frameworks
- **Memory**: 4GB/8GB LPDDR4/LPDDR4X (8GB recommended)
- **Storage**: 64GB onboard eMMC 5.1 for OS
- **GPU**: Mali-G52-2EE with 4K video codec support

**Storage Solution**
- **Dual M.2 NVMe slots** (PCIe 3.0 interface)
- Bottom access panel for easy SSD installation/upgrades

**Physical Dimensions**
- **Size**: 12.7cm × 12.7cm × 4.97cm 
- **Weight**: ~0.7kg (without drives)
- **Material**: Aviation-grade aluminum body

**Interface Layout**

*Front Panel:*
- 2× USB-C (USB 3.0, 5Gbps)
- 3.5mm audio combo jack
- Power button
- Status LEDs (power, drive activity)

*Rear Panel:*
- 2× Gigabit Ethernet ports
- 2× USB 3.0 Type-A (via HUB)
- 1× USB 3.0 Type-C OTG
- HDMI 2.0 (4K@60Hz output)
- GPIO expansion header (2.54mm, I2C/SPI/UART)
- 12V DC power input

**Wireless Connectivity**
- Wi-Fi 6 (dual-band 2.4/5GHz, up to 1.2Gbps)
- Bluetooth 5.2 with BLE support

**Software Stack**
- **OS Options**: IClawOS/Buildroot/Debian/Ubuntu
- **AI Runtime**: RKNN-Toolkit-Lite + optimized Ollama/llama.cpp for sub-2B local models
- **Cloud Services**: Pre-configured Samba/NFS/DLNA with multi-user support
- **Automation**: Node.js/Python with GPIO libraries, MQTT/HTTP support
- **Docker**: Container-ready for application expansion

**Power & Thermal**
- Input: 12V DC, 3A (36W+ adapter)
- Consumption: ~5W idle, ~15W full load
- Cooling: Passive aluminum chassis + smart fan
- Operating Temp: 0°C to 50°C (industrial option available)

**Key Design Features**
- Compact desktop footprint
- Tool-free access to dual NVMe slots
- Clean front/rear interface partitioning
- GPIO expansion for DIY automation projects
- Stackable design with expansion module support

**Target Applications**
- Desktop AI automation assistant with voice interaction
- Home NAS/cloud storage for media streaming & backups
- Soft router/gateway with dual Ethernet ports
- Edge IoT gateway with video analysis capabilities
- Embedded development platform
