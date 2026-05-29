**IClawMINI Specifications**

Aviation-grade aluminum, compact and exquisite,
ARM ultra-low power consumption, an all-in-one mini device capable of running local AI models and serving as a home data center.

## 1. Core Hardware Specifications

| **Component** | **Specification Parameters** |
| :--- | :--- |
| **Core SoC** | Rockchip **RK3568** (Quad-core Cortex-A55, up to 2.0GHz) |
| **NPU Computing Power** | 1 TOPS @INT8, supports one-click conversion for mainstream frameworks like TensorFlow/PyTorch/Caffe |
| **GPU** | Mali-G52-2EE, supports OpenGL ES 3.2/OpenCL 2.0/Vulkan 1.1 |
| **Memory** | 4GB / 8GB LPDDR4/LPDDR4X (Optional, 8GB recommended for smooth local model operation) |
| **System Storage** | Onboard 64GB eMMC 5.1, for operating system and core programs |
| **Video Codec** | 4K@60fps H.265/H.264/VP9 decoding, 1080p@100fps H.265/H.264 encoding |

---

## 2. Storage Solution: Dual NGFF (M.2 NVMe) Flash Drives

Addressing your core requirement of "dual flash drives, NGFF", this design provides the following storage expansion capabilities:

| **Storage Interface** | **Specification** | **Description** |
| :--- | :--- | :--- |
| **M.2 NVMe Slot 1** | M.2 M-Key, supports PCIe 3.0 x1/x2, 2280 size | Directly connected to the RK3568 PCIe 3.0接口 RK3568's native PCIe 3.0 interface, serves as **system drive or high-speed cache drive** |

## 3. Interface Layout

Adopts a front/rear interface partition design, balancing aesthetics and practicality.

### 3.1 Overall Dimensions

- **Width**: 12.7 cm
- **Depth**: 12.7 cm
- **Height**: 4.97 cm
- **Weight**: Approx. 0.7 kg (excluding hard drives)
- **Chassis Material**: Aluminum alloy

### 3.2 Front Panel Interfaces (User-facing)

| **Interface** | **Quantity** | **Specification** |
| :--- | :--- | :--- |
| USB-C | 2 pcs | USB 3.0 (5Gbps) |
| 3.5mm Audio Jack | 1 pc | Supports headset/microphone, suitable for voice interaction |
| Power Button | 1 pc | Physical button |
| Status Indicators | 2 pcs | Power indicator, Hard drive activity indicator |

### 3.3 Rear Panel Interfaces

| **Interface** | **Quantity** | **Specification** |
| :--- | :--- | :--- |
| **Gigabit Ethernet Port** | 2 pcs | 10/100/1000Mbps auto-negotiation, supports dual-port aggregation or soft router functionality |
| **USB 3.0 HOST** | 2 pcs | Type-A, 5Gbps (Expanded via USB HUB) |
| **USB 3.0 OTG** | 1 pc | Type-C, for device debugging or firmware flashing |
| **HDMI 2.0** | 1 pc | Supports 4K@60fps output, can be used to connect an external monitor to display the IClaw interface |
| **M.2 NVMe Slot** | 1 pc | Internal, supports 2280 size NVMe SSD |
| **GPIO Expansion Interface** | 1 pc | 2.54mm header,引出I2C/SPI/UART/GPIO leads out I2C/SPI/UART/GPIO, used for connecting external sensors, relays, and other automation hardware |
| **12V DC Power Input** | 1 pc | DC-005 interface, outer diameter 5.5mm / inner diameter 2.1mm |

---

## 4. Wireless Connectivity & Communication

| **Module** | **Specification** |
| :--- | :--- |
| **Wi-Fi** | Dual-band 2.4GHz/5GHz, Wi-Fi 6 (802.11ax), maximum speed 1.2Gbps |
| **Bluetooth** | Bluetooth 5.2, supports BLE |

---

## 5. Software & System

| **Component** | **Specification** |
| :--- | :--- |
| **Operating System** | IClawOS / Buildroot / Debian 11 / Ubuntu 20.04 (Optional) |
| **AI Software Stack** | Pre-installed RKNN-Toolkit-Lite + optimized version of Ollama/llama.cpp, supports running local models up to 2B parameters |
| **Cloud Disk Service** | Pre-configured Samba/NFS/DLNA services, ready to use out-of-the-box, supports multi-user permission management |
| **Automation Framework** | Node.js/Python runtime + GPIO control library, supports MQTT/HTTP protocols for interfacing with external devices |
| **Docker Support** | Supports containerized deployment for easy application expansion |

---

## 6. Electrical Characteristics & Environmental Adaptability

| **Parameter** | **Specification** |
| :--- | :--- |
| **Power Input** | 12V DC, 3A (Power adapter above 36W recommended) |
| **Typical Power Consumption** | Approx. 5W idle, approx. 15W under full load (excluding hard drives) |
| **Operating Temperature** | 0°C ~ 50°C (Commercial grade), optional industrial grade -40°C ~ 85°C |
| **Cooling Design** | Aluminum alloy chassis passive cooling + intelligent low-noise fan (auto start/stop based on load) |
| **Relative Humidity** | 5% ~ 90% (Non-condensing) |

---

## 7. Physical Design Highlights

1.  Compact 12.7cm square volume, aviation-grade aluminum, can be easily placed anywhere on the desk.
2.  **NVMe Internal Design**: Bottom panel can be opened for users to easily install/replace the M.2 NVMe SSD themselves.
3.  **Clean and Practical Front Panel**: 2 USB-C ports for temporary connection of external USB drives or debugging devices, 3.5mm audio jack facilitates voice interaction.
4.  **Fully Functional Rear Panel**: Dual gigabit Ethernet ports satisfy soft router or link aggregation needs; GPIO header offers unlimited possibilities for DIY automation.
5.  **Stackable Design**: Mounting holes reserved on the bottom for stacking dedicated expansion modules (such as additional SATA drive cages, battery bases, etc.).

---

## 8. Target Application Scenarios

| **Scenario** | **Capability Description** |
| :--- | :--- |
| **Desktop Automation Assistant** | Runs local lightweight AI models, controls external devices (e.g., smart home, robots) via GPIO, interacts via voice. |
| **Home Cloud Disk / NAS** | Dual NVMe SSDs provide high-speed storage; Samba/DLNA services support the whole family in backing up photos and watching 4K videos. |
| **Soft Router / Gateway** | Dual gigabit Ethernet ports support OpenWrt, can serve as the core of the home network. |
| **IoT Gateway** | Built-in NPU supports edge AI inference, can connect to cameras for video analysis. |
| **Development & Debugging Platform** | Rich interfaces and GPIO, suitable for embedded developers for prototyping and verification. |
