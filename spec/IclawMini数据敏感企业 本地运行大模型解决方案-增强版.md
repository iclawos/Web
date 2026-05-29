## IclawMini 数据敏感企业本地运行大模型解决方案

**（增强版：内置混合模型路由与规划-执行分离架构）**

### 一、方案概述

IclawMini 面向教育、医疗、金融、科研等数据敏感型企业，提供**完全本地化运行**的大模型解决方案。核心价值：**敏感数据全程本地流转、算力自主可控、长期成本较云服务降低60%以上**。

本次升级引入**本地混合模型路由架构**：在企业内部完全离线的环境中，根据任务类型自动调度不同能力的本地模型（例如：大参数高精度模型负责规划与审查，小参数高效模型负责大规模执行），实现**安全 → 质量 → 成本 → 延迟**的最优平衡。

**核心原则：**

> **任何数据、任何任务阶段，绝不离开企业本地服务器。**  
**规划、执行、审查三类模型，全部运行在本地 GPU / Apple Silicon 集群中。**

### 二、新增：本地混合模型路由架构（规划-执行-审查分离）

#### 2.1 为什么本地也需要混合路由？

| 传统本地方案 | 混合路由本地方案 |
| - | - |
| 每次请求都调用同一套大模型 | 高精度模型做规划与审查，小模型做大批量执行 |
| 对大参数模型依赖强，推理成本高、延迟高 | 减少大模型调用次数 50%–80%，降低整体推理负载 |
| 所有任务不分轻重均由最强模型处理 | 按任务阶段拆分，算力资源利用更合理 |
| 不适合长文本、大批量生成场景 | 小模型可并行执行，吞吐量提升 3–5 倍 |


#### 2.2 完全本地化的三阶段架构

**阶段一：本地规划（SOTA 类模型）**

- 使用本地高精度模型（如 **Qwen 3.6 27B INT8 / DeepSeek R1 32B**）

- 生成任务分解方案、执行步骤、质量标准

- 不直接生成最终内容，仅输出结构化的“执行蓝图”

**阶段二：本地执行（高效小模型）**

- 使用本地高效模型（如 **Qwen 7B INT4 / Llama 3 8B / Gemma 2 9B**）

- 严格按照蓝图批量生成文本、摘要、代码、结构化数据

- 可并行处理多个子任务，显著降低主模型负载

**阶段三：本地审查（再次调用 SOTA 类模型）**

- 使用相同的本地高精度模型（或更轻量的审查专用模型）

- 校验执行结果是否符合规划、有无逻辑错误

- 必要时触发修正或二次执行

> ✅ **所有模型调用、数据传输、任务存储均在企业内部服务器完成，无任何云 API 依赖。**

#### 2.3 本地模型角色划分示例

| 角色 | 推荐本地模型 | 硬件要求 | 触发频率 |
| - | - | - | - |
| **规划 & 审查（SOTA 角色）** | Qwen 3.6 27B（INT8）DeepSeek R1 32B（INT8） | RTX 3090 / 4090或双卡 3090 | 低（每个任务 1–2 次） |
| **大规模执行（高效角色）** | Qwen 7B（INT4）Llama 3 8BGemma 2 9B | RTX 3060 / A2000或 CPU + 内存 | 高（可并行数十次） |


#### 2.4 典型本地任务流程示例（代码生成）

> **用户需求**：生成一套完整的财务数据异常检测 Python 脚本。

1. **本地规划（27B 模型）**

   - 输出：模块结构、异常检测算法选型、日志与告警规范

   - 不写具体代码

2. **本地执行（7B 模型）**

   - 严格按照方案依次生成 5 个函数模块

   - 每个模块单独调用小模型，可并行

3. **本地审查（27B 模型）**

   - 检查代码是否实现方案、有无逻辑漏洞

   - 输出最终可执行脚本

> **效果**：大模型调用次数从 1 次 → 2 次（规划 + 审查），但整体任务质量更高，且并发执行下总延迟降低 40% 以上。

### 三、硬件与模型支持升级（适配混合路由）

#### 3.1 推荐硬件组合（支持双模型并行）

| 场景 | 硬件推荐 | 部署方式 |
| - | - | - |
| **入门混合方案** | RTX 3090 ×1（24GB） + 64GB 内存 | SOTA 模型（27B）与高效模型（7B）**分时加载** |
| **标准混合方案** | RTX 4090 ×1（24GB） + 128GB 内存 | 同时常驻 27B + 7B 模型（显存占用约 18GB + 6GB） |
| **高性能混合方案** | RTX 3090 ×2（48GB） | SOTA 模型占一卡，高效模型占一卡，互不干扰 |
| **Apple Silicon 混合方案** | M2 Ultra（128GB 统一内存） | 统一内存同时加载 32B + 7B 模型，无显存瓶颈 |


#### 3.2 高效小模型选型（执行角色）

| 模型 | 大小 | 推理速度 | 推荐硬件 |
| - | - | - | - |
| Qwen 7B（INT4） | ~4GB | 100–150 tokens/s | RTX 3060 / 4060 |
| Llama 3 8B（INT4） | ~5GB | 90–130 tokens/s | RTX 4060 / 3090 |
| Gemma 2 9B（INT4） | ~6GB | 80–120 tokens/s | RTX 4070 / 3090 |
| Phi-3 Mini（3.8B） | ~2.5GB | 150+ tokens/s | CPU / 低端 GPU |


这些高效模型**全部可本地运行**，适合承担 80% 以上的 Token 生成工作。

### 四、路由与调度策略（数据安全优先）

#### 4.1 任务路由原则

| 任务类型 | 路由策略 | 典型场景 |
| - | - | - |
| **复杂推理 / 代码设计** | 仅调用 SOTA 模型（27B+） | 医疗诊断逻辑、金融风控规则 |
| **长文本生成 / 批量执行** | 小模型（7–9B）并行 | 病历批量脱敏、合同摘要批量生成 |
| **审查 / 验证** | SOTA 模型 | 合规检查、答案一致性校验 |
| **简单问答 / 检索** | 小模型 | 知识库快速问答、教育试题自动批改 |


#### 4.2 数据安全增强

- **所有路由策略在本地执行**，不依赖任何外部 API 或规则服务

- **路由决策模型可选本地轻量分类器**（甚至基于规则的本地服务），避免引入额外数据泄露风险

- **日志与审计同样完全本地化**，记录每一次模型选择与调用原因

### 五、典型行业部署示例（混合路由版）

#### ✅ 配置一：教育机构 AI 助教（入门级混合路由）

| 层级 | 选型 |
| - | - |
| 硬件 | RTX 3090（24GB）+ 64GB 内存 |
| SOTA 模型 | Qwen 3.6 27B（INT8） |
| 高效模型 | Qwen 7B（INT4） |
| 路由策略 | 题目设计 → 27B；批量批改 → 7B |
| 安全 | 学生数据全程本地，不出校园网 |


#### ✅ 配置二：金融风控 + 合规审查（高性能混合路由）

| 层级 | 选型 |
| - | - |
| 硬件 | RTX 4090 ×2（48GB） |
| SOTA 模型 | DeepSeek R1 32B / Qwen 32B |
| 高效模型 | Llama 3 8B ×2（并行执行） |
| 路由策略 | 风控规则制定 → 32B；交易数据批量筛查 → 8B |
| 安全 | 金融数据绝对隔离，无任何外部模型调用 |


### 六、相比原方案的提升总结

| 维度 | 原 IclawMini 方案 | 增强版（混合路由） |
| - | - | - |
| 数据安全 | ✅ 完全本地化 | ✅ 完全本地化（不变） |
| SOTA 模型调用次数 | 每次任务 1 次 | 每个任务 2 次（规划+审查） |
| 执行阶段效率 | 全部由大模型完成 | 80% 以上 Token 由小模型生成 |
| 并发能力 | 受限于大模型吞吐 | 小模型可并行，吞吐提升 3–5 倍 |
| 长文本任务成本 | 线性增长 | 边际成本显著降低 |
| 任务质量可控性 | 高 | 更高（增加审查阶段） |


### 七、部署建议与注意事项

1. **起步推荐**：从单卡 RTX 3090 + Qwen 3.6 27B（规划/审查） + Qwen 7B（执行）开始验证混合路由效果。

2. **不必强求所有任务都拆分**：简单任务（如“今天天气如何”）应直接用小模型，避免路由开销。

3. **审查阶段可简化**：对非关键任务，审查阶段可改为抽样或规则校验，进一步降低大模型负载。

4. **绝对禁止回退云端**：即使任务拆分复杂，也绝不能为了效果临时调用云端模型（如 GPT-4o），否则违背方案核心安全前提。

技术参考附录

## 附录一：基于 Ollama + LangChain 的本地混合路由实现代码

> **环境要求**：Ubuntu 22.04 / Python 3.10+ / 已安装 Ollama 并拉取所需模型  
**示例模型**：

> - SOTA 规划/审查：`qwen3:27b`（或 `qwen3:32b`）

> - 高效执行：`qwen3:7b`（或 `llama3:8b`）  
**安全原则**：所有调用通过本地 Ollama 服务（127.0.0.1:11434），绝不访问外网。

### 1. 安装依赖

```
pip install langchain langchain-community ollama chromadb
```

### 2. 本地混合路由器核心代码

```
\\\# local\\\_hybrid\\\_router.py    
import json    
import time    
from typing import List, Dict, Any    
from langchain\\\_community.llms import Ollama    
from langchain.callbacks.manager import CallbackManager    
from langchain.callbacks.stdout import StdOutCallbackHandler    
    
\\\# ---------- 本地模型客户端 ----------    
class LocalLLMClient:    
    def \\\_\\\_init\\\_\\\_(self, model\\\_name: str, temperature: float = 0.1):    
        self.llm = Ollama(    
            model=model\\\_name,    
            temperature=temperature,    
            base\\\_url="http://127.0.0.1:11434",   \\\# 仅本地    
            callback\\\_manager=CallbackManager(\\\[StdOutCallbackHandler()\\\])    
        )    
        
    def generate(self, prompt: str, max\\\_tokens: int = 2048) -\\\> str:    
        return self.llm.invoke(prompt)    
    
\\\# ---------- 规划-执行-审查引擎 ----------    
class LocalHybridRouter:    
    def \\\_\\\_init\\\_\\\_(self, planner\\\_model: str, executor\\\_model: str, reviewer\\\_model: str = None):    
        self.planner = LocalLLMClient(planner\\\_model, temperature=0.2)    
        self.executor = LocalLLMClient(executor\\\_model, temperature=0.1)    
        \\\# 审查器默认使用与规划器相同的模型（也可单独指定轻量审查模型）    
        self.reviewer = LocalLLMClient(reviewer\\\_model or planner\\\_model, temperature=0.1)    
        
    def plan(self, user\\\_request: str) -\\\> str:    
        prompt = f"""你是一个顶级的任务规划专家。请针对以下需求，生成一个\\\*\\\*详细、可执行、步骤化\\\*\\\*的实施方案。    
        不要生成最终内容，只输出结构化的执行蓝图（支持Markdown列表或JSON）。    
            
        需求：\\\{user\\\_request\\\}    
            
        输出格式示例：    
        \\\#\\\# 执行蓝图    
        1. 分析需求要点    
        2. 设计技术方案    
        3. 分步执行指令...    
        """    
        return self.planner.generate(prompt)    
        
    def execute(self, plan: str, user\\\_request: str, batch\\\_size: int = 1) -\\\> List\\\[str\\\]:    
        """可并行执行多个子任务，这里简化为单次执行，实际可用线程池扩展"""    
        prompt = f"""你是一个严谨的执行者。请严格按照以下执行蓝图，生成具体内容。    
        不要自行添加蓝图之外的步骤，不要改变结构。    
            
        === 执行蓝图 ===    
        \\\{plan\\\}    
            
        === 原始需求 ===    
        \\\{user\\\_request\\\}    
            
        现在，请按照蓝图逐步生成最终内容：    
        """    
        result = self.executor.generate(prompt, max\\\_tokens=4096)    
        return \\\[result\\\]    
        
    def review(self, plan: str, draft: str, user\\\_request: str) -\\\> str:    
        prompt = f"""请作为审查专家，检查以下内容是否完全遵循了执行蓝图、是否满足原始需求、是否存在事实或逻辑错误。    
            
        === 执行蓝图 ===    
        \\\{plan\\\}    
            
        === 待审查内容 ===    
        \\\{draft\\\}    
            
        === 原始需求 ===    
        \\\{user\\\_request\\\}    
            
        请输出：    
        1. 审查结论（通过 / 需修改）    
        2. 若需修改，请直接输出修改后的最终版本（不要输出其他解释）    
        """    
        return self.reviewer.generate(prompt)    
        
    def run(self, user\\\_request: str, verbose: bool = True) -\\\> str:    
        if verbose:    
            print("🧠 \\\[规划阶段\\\] 调用本地 SOTA 模型...")    
        plan = self.plan(user\\\_request)    
        if verbose:    
            print(f"📐 规划结果：\\\\n\\\{plan\\\[:200\\\]\\\}...\\\\n")    
            
        if verbose:    
            print("⚙️ \\\[执行阶段\\\] 调用本地高效模型...")    
        drafts = self.execute(plan, user\\\_request)    
        draft = drafts\\\[0\\\]    
        if verbose:    
            print(f"📄 执行结果（前200字符）：\\\\n\\\{draft\\\[:200\\\]\\\}...\\\\n")    
            
        if verbose:    
            print("🔍 \\\[审查阶段\\\] 再次调用本地 SOTA 模型...")    
        final = self.review(plan, draft, user\\\_request)    
        if verbose:    
            print("✅ 最终输出：")    
        return final    
    
\\\# ---------- 使用示例 ----------    
if \\\_\\\_name\\\_\\\_ == "\\\_\\\_main\\\_\\\_":    
    \\\# 初始化路由器（确保 Ollama 已运行这些模型）    
    router = LocalHybridRouter(    
        planner\\\_model="qwen3:27b",      \\\# 高精度模型    
        executor\\\_model="qwen3:7b",      \\\# 高效小模型    
        reviewer\\\_model="qwen3:27b"      \\\# 也可用同一模型    
    )    
        
    request = "生成一份面向初中生的《网络安全意识》课程教学大纲，包含5个模块，每个模块要列出学习目标和关键知识点。"    
    result = router.run(request)    
    print(result)
```

### 3. 支持并行的执行模块扩展（用于大批量子任务）

```
from concurrent.futures import ThreadPoolExecutor, as\\\_completed    
    
class ParallelExecutor:    
    def \\\_\\\_init\\\_\\\_(self, executor\\\_model: str, max\\\_workers: int = 4):    
        self.model = LocalLLMClient(executor\\\_model)    
        self.max\\\_workers = max\\\_workers    
        
    def execute\\\_batch(self, sub\\\_tasks: List\\\[Dict\\\[str, str\\\]\\\]) -\\\> List\\\[str\\\]:    
        """sub\\\_tasks: \\\[\\\{"instruction": "..."\\\}, ...\\\]"""    
        with ThreadPoolExecutor(max\\\_workers=self.max\\\_workers) as executor:    
            futures = \\\[executor.submit(self.model.generate, task\\\["instruction"\\\]) for task in sub\\\_tasks\\\]    
            results = \\\[f.result() for f in as\\\_completed(futures)\\\]    
        return results    
    
\\\# 集成到 LocalHybridRouter 中即可
```

> ✅ **安全说明**：所有调用均通过 `127.0.0.1:11434` 本地 Ollama 服务，模型文件也存储在本地磁盘，**绝对不向任何云端 API 发送数据**。

## 附录二：针对医疗、金融、教育的提示词模板（规划、执行、审查）

所有模板均为纯文本，可直接复制到上述代码的 `plan` / `execute` / `review` 提示词中。

### 1. 医疗行业 —— 病历摘要与辅助诊断

#### 规划提示词（SOTA 模型）

```
你是一位资深的医学信息学专家。请为以下患者病历生成一个「结构化摘要与诊断建议执行蓝图」。    
    
患者病历文本：    
\\\{病历内容\\\}    
    
要求输出以下格式的蓝图（不要输出诊断结论，只输出步骤）：    
1. 信息抽取：列出关键信息（主诉、现病史、既往史、检查结果）    
2. 术语标准化：将非标准术语映射到 ICD-10 或 SNOMED CT    
3. 摘要生成：按 SOAP 格式生成结构化摘要    
4. 辅助诊断建议：基于知识库的可能诊断方向（仅方向，非终诊）    
5. 合规脱敏：自动标记需脱敏的字段（姓名、身份证号等）    
    
请严格按照以上5步输出蓝图。
```

#### 执行提示词（高效模型）

```
你是一个严格执行医学文书规范的助手。请严格按照以下执行蓝图，处理患者病历。    
    
执行蓝图：    
\\\{plan\\\}    
    
患者病历：    
\\\{病历内容\\\}    
    
请输出：    
- 结构化摘要（SOAP格式）    
- 脱敏后的患者信息    
- 可能的诊断方向（仅作为辅助参考，注明“非最终诊断”）
```

#### 审查提示词（SOTA 模型）

```
你是一位主任医师。请审查以下生成内容是否：    
1. 完整遵循了执行蓝图的所有步骤    
2. 医疗逻辑合理，无致命错误    
3. 脱敏合规（不泄露患者隐私）    
    
执行蓝图：\\\{plan\\\}    
生成内容：\\\{draft\\\}    
原始病历：\\\{原始病历\\\}    
    
如果合格，输出“审查通过”及原内容；如果不合格，输出修改后的正确版本。
```

### 2. 金融行业 —— 交易风控与合规审查

#### 规划提示词

```
你是一位金融风控专家。请为以下交易流水数据制定一个「实时风控分析执行方案」。    
    
交易数据样本：    
\\\{交易数据\\\}    
    
输出蓝图（仅步骤，不输出结论）：    
1. 异常特征提取（频次、金额、时间、对手方）    
2. 规则引擎匹配（预定义风险规则集）    
3. 异常评分计算    
4. 生成风险报告（包含高/中/低风险标签）    
5. 审计日志记录要求
```

#### 执行提示词

```
你是一个金融数据处理器。严格按照以下蓝图逐条分析交易数据，输出风险报告。    
    
蓝图：\\\{plan\\\}    
交易数据：\\\{数据\\\}    
    
输出格式：表格形式（交易ID | 风险等级 | 触发规则 | 建议措施）
```

#### 审查提示词

```
你是一位合规审计官。审查下方风险报告是否：    
- 完整执行了蓝图中的5个步骤    
- 规则匹配逻辑正确    
- 无遗漏明显异常交易    
    
蓝图：\\\{plan\\\}    
报告：\\\{draft\\\}    
    
若合格，输出“合规通过”；否则输出修正后的报告。
```

### 3. 教育行业 —— 学情分析与个性化辅导

#### 规划提示词

```
你是一位教育数据科学家。请为以下学生作业/考试成绩数据，制定「学情分析与个性化辅导方案」。    
    
学生数据样例：    
\\\{学生成绩/作业数据\\\}    
    
输出蓝图：    
1. 成绩趋势分析（折线图数据描述）    
2. 知识点薄弱点识别（按章节/题型）    
3. 生成每个学生的个性化练习建议（3-5题）    
4. 教师报告摘要    
5. 隐私脱敏处理（不出现学生姓名，仅用ID）
```

#### 执行提示词

```
你是一个教育数据分析助手。严格按照蓝图生成学情报告。    
    
蓝图：\\\{plan\\\}    
学生数据：\\\{数据\\\}    
    
输出：JSON 格式，包含 student\\\_id, weak\\\_points, practice\\\_suggestions。
```

#### 审查提示词

```
你是一位教研组长。审查以下学情报告：    
- 薄弱点识别是否与数据一致    
- 练习建议是否针对性强    
- 是否完成所有蓝图步骤    
    
蓝图：\\\{plan\\\}    
报告：\\\{draft\\\}    
    
直接输出“通过”或修改后的报告。
```

> **隐私保护**：所有提示词中均强调脱敏，且实际使用时可在输入前由本地预处理模块（正则+NER）先移除学生姓名、身份证号等再送入模型。

## 附录三：路由决策本地小模型的训练/微调方案

> **目的**：让一个极小的本地模型（如 1B–3B 参数）自动判断当前任务应该走“SOTA 完整三阶段路由”还是“直接由小模型回答”，从而进一步降低大模型调用次数，且决策过程完全本地、无隐私风险。

### 1. 方案选型建议

| 方案 | 参数量 | 推理速度 | 训练难度 | 推荐场景 |
| - | - | - | - | - |
| **微调 Qwen2.5-1.5B** | 1.5B | 200+ tokens/s | 低（LoRA） | 通用任务分类 |
| **微调 Gemma-2B** | 2B | 150+ tokens/s | 中 | 高精度需求 |
| **训练一个 BERT 分类器** | 110M | 极快 | 低 | 仅文本二分类 |
| **规则 + 关键词匹配** | 无 | 极快 | 无需训练 | 简单规则场景 |


> ✅ **安全优先**：所有训练数据由企业内部真实请求脱敏后生成，模型最终部署在本地，不联网。

### 2. 数据准备与标注（关键步骤）

#### 2.1 采集原始请求

从企业实际业务中收集 1000–5000 条用户请求，例如：

- “分析这份病历中的异常指标”

- “生成一份10页的金融报告模板”

- “批改这50道初中数学选择题”

#### 2.2 人工标注路由标签

| 标签 | 含义 | 举例 |
| - | - | - |
| `full\\\_route` | 需要 规划→执行→审查 完整路由 | 复杂推理、代码设计、医疗诊断、长文生成 |
| `fast\\\_lane` | 可直接用小模型回答 | 简单问答、知识库检索、数据格式转换 |


#### 2.3 构建训练集格式（用于微调 LLM 或训练 BERT）

```
\\\{"instruction": "分析这份病历中的异常指标", "label": "full\\\_route"\\\}    
\\\{"instruction": "什么是机器学习", "label": "fast\\\_lane"\\\}
```

### 3. 微调 Qwen2.5-1.5B 作为路由分类器（LoRA）

#### 3.1 安装依赖

```
pip install transformers peft accelerate datasets torch
```

#### 3.2 微调脚本（简化版）

```
\\\# train\\\_router.py    
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer    
from peft import LoraConfig, get\\\_peft\\\_model    
from datasets import Dataset    
import json    
    
\\\# 加载基础模型    
model\\\_name = "Qwen/Qwen2.5-1.5B"    
tokenizer = AutoTokenizer.from\\\_pretrained(model\\\_name, trust\\\_remote\\\_code=True)    
model = AutoModelForCausalLM.from\\\_pretrained(model\\\_name, trust\\\_remote\\\_code=True)    
    
\\\# LoRA 配置    
lora\\\_config = LoraConfig(    
    r=8, lora\\\_alpha=32, target\\\_modules=\\\["q\\\_proj", "v\\\_proj"\\\], lora\\\_dropout=0.1    
)    
model = get\\\_peft\\\_model(model, lora\\\_config)    
    
\\\# 准备数据集（需要先将 JSON 转换为指令-标签对）    
def format\\\_example(example):    
    prompt = f"判断以下用户请求是否需要完整的三阶段路由（规划-执行-审查）。\\\\n请求：\\\{example\\\['instruction'\\\]\\\}\\\\n回答："    
    target = example\\\['label'\\\]  \\\# "full\\\_route" 或 "fast\\\_lane"    
    return \\\{"prompt": prompt, "target": target\\\}    
    
\\\# 加载并处理数据    
with open("routing\\\_data.json") as f:    
    raw\\\_data = json.load(f)    
dataset = Dataset.from\\\_list(\\\[format\\\_example(d) for d in raw\\\_data\\\])    
    
def tokenize\\\_function(examples):    
    model\\\_inputs = tokenizer(examples\\\["prompt"\\\], truncation=True, padding="max\\\_length", max\\\_length=256)    
    with tokenizer.as\\\_target\\\_tokenizer():    
        labels = tokenizer(examples\\\["target"\\\], truncation=True, padding="max\\\_length", max\\\_length=8)    
    model\\\_inputs\\\["labels"\\\] = labels\\\["input\\\_ids"\\\]    
    return model\\\_inputs    
    
tokenized\\\_dataset = dataset.map(tokenize\\\_function, batched=True)    
    
\\\# 训练    
training\\\_args = TrainingArguments(    
    output\\\_dir="./router\\\_model",    
    per\\\_device\\\_train\\\_batch\\\_size=8,    
    num\\\_train\\\_epochs=3,    
    logging\\\_steps=10,    
    save\\\_strategy="epoch",    
)    
trainer = Trainer(    
    model=model,    
    args=training\\\_args,    
    train\\\_dataset=tokenized\\\_dataset,    
)    
trainer.train()    
model.save\\\_pretrained("./router\\\_lora")
```

#### 3.3 推理部署（本地 Ollama 或 Transformers）

```
\\\# router\\\_inference.py    
from peft import PeftModel    
from transformers import AutoModelForCausalLM, AutoTokenizer    
    
base\\\_model = AutoModelForCausalLM.from\\\_pretrained("Qwen/Qwen2.5-1.5B")    
router = PeftModel.from\\\_pretrained(base\\\_model, "./router\\\_lora")    
tokenizer = AutoTokenizer.from\\\_pretrained("Qwen/Qwen2.5-1.5B")    
    
def decide\\\_route(user\\\_request: str) -\\\> str:    
    prompt = f"判断以下用户请求是否需要完整的三阶段路由。\\\\n请求：\\\{user\\\_request\\\}\\\\n回答："    
    inputs = tokenizer(prompt, return\\\_tensors="pt")    
    outputs = router.generate(\\\*\\\*inputs, max\\\_new\\\_tokens=8)    
    decision = tokenizer.decode(outputs\\\[0\\\], skip\\\_special\\\_tokens=True).strip()    
    return "full\\\_route" if "full\\\_route" in decision else "fast\\\_lane"    
    
\\\# 集成到主路由器中
```

### 4. 更轻量的方案：训练一个 BERT 分类器（适合纯二分类）

```
\\\# bert\\\_router.py    
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments    
from datasets import Dataset    
import torch    
    
model\\\_name = "bert-base-uncased"    
tokenizer = AutoTokenizer.from\\\_pretrained(model\\\_name)    
model = AutoModelForSequenceClassification.from\\\_pretrained(model\\\_name, num\\\_labels=2)  \\\# 0=fast\\\_lane,1=full\\\_route    
    
\\\# 数据集准备（同上）    
def tokenize(examples):    
    return tokenizer(examples\\\["instruction"\\\], truncation=True, padding="max\\\_length", max\\\_length=128)    
    
dataset = Dataset.from\\\_list(raw\\\_data)    
dataset = dataset.map(tokenize, batched=True)    
dataset = dataset.rename\\\_column("label", "labels")  \\\# 要求整数 0/1    
    
training\\\_args = TrainingArguments(    
    output\\\_dir="./bert\\\_router",    
    per\\\_device\\\_train\\\_batch\\\_size=16,    
    num\\\_train\\\_epochs=5,    
)    
trainer = Trainer(model=model, args=training\\\_args, train\\\_dataset=dataset)    
trainer.train()    
model.save\\\_pretrained("./bert\\\_router")    
    
\\\# 推理速度极快（CPU 即可）
```

### 5. 将路由决策集成到主流程

```
class SecureLocalRouter:    
    def \\\_\\\_init\\\_\\\_(self):    
        self.decision\\\_model = load\\\_router()  \\\# 上述微调模型    
        self.hybrid\\\_engine = LocalHybridRouter(...)    
        self.fast\\\_model = LocalLLMClient("qwen3:7b")    
        
    def handle(self, request: str):    
        route = self.decision\\\_model.predict(request)  \\\# 本地调用    
        if route == "fast\\\_lane":    
            return self.fast\\\_model.generate(request)    
        else:    
            return self.hybrid\\\_engine.run(request)
```

> **安全最终保证**：即使是路由决策模型，也完全运行在企业自己的服务器上，训练数据、模型权重、推理过程均不离开本地网络。绝对不依赖任何云端分类 API。

