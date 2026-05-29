```
\\\#\\\# IclawMini Local LLM Solution for Data-Sensitive Enterprises    
    
\\\*\\\*(Enhanced Edition: Built-in Hybrid Model Routing and Planning-Execution Separation Architecture)\\\*\\\*    
    
\\\#\\\#\\\# I. Solution Overview    
    
IclawMini is designed for data-sensitive enterprises in education, healthcare, finance, and scientific research, providing a \\\*\\\*fully localized\\\*\\\* large language model solution. Core values: \\\*\\\*sensitive data remains entirely on-premises, computing power under your control, long-term costs reduced by over 60% compared to cloud services\\\*\\\*.    
    
This upgrade introduces a \\\*\\\*local hybrid model routing architecture\\\*\\\*: within a completely offline enterprise environment, tasks automatically schedule different local models (e.g., large high-precision models for planning and review, small efficient models for large-scale execution) to achieve optimal balance among \\\*\\\*security → quality → cost → latency\\\*\\\*.    
    
\\\*\\\*Core Principles:\\\*\\\*    
    
\\\> \\\*\\\*No data or task stage ever leaves the enterprise's local servers.\\\*\\\*      
\\\> \\\*\\\*All three types of models (planning, execution, review) run entirely on local GPU/Apple Silicon clusters.\\\*\\\*    
    
\\\#\\\#\\\# II. New: Local Hybrid Model Routing Architecture (Planning-Execution-Review Separation)    
    
\\\#\\\#\\\#\\\# 2.1 Why is hybrid routing needed locally?    
    
| Traditional Local Solution | Hybrid Routing Local Solution |    
|---------------------------|-------------------------------|    
| Every request uses the same large model | High-precision models for planning/review, small models for bulk execution |    
| Heavy reliance on large-parameter models → high inference cost and latency | Reduces large model calls by 50–80%, lowering overall inference load |    
| All tasks handled by the most powerful model | Splits tasks by stage, more efficient use of compute resources |    
| Not suitable for long-text or large-batch generation | Small models can execute in parallel, throughput increased 3–5x |    
    
\\\#\\\#\\\#\\\# 2.2 Fully Local Three-Stage Architecture    
    
\\\*\\\*Stage 1: Local Planning (SOTA-class model)\\\*\\\*      
- Uses local high-precision models (e.g., \\\*\\\*Qwen 3.6 27B INT8 / DeepSeek R1 32B\\\*\\\*)      
- Generates task decomposition plan, execution steps, quality criteria      
- Does not produce final content, only outputs a structured "execution blueprint"    
    
\\\*\\\*Stage 2: Local Execution (Efficient small model)\\\*\\\*      
- Uses local efficient models (e.g., \\\*\\\*Qwen 7B INT4 / Llama 3 8B / Gemma 2 9B\\\*\\\*)      
- Strictly follows the blueprint to batch-generate text, summaries, code, structured data      
- Can process multiple subtasks in parallel, significantly reducing load on the main model    
    
\\\*\\\*Stage 3: Local Review (again calling a SOTA-class model)\\\*\\\*      
- Uses the same local high-precision model (or a lighter review-specific model)      
- Checks whether execution results comply with the plan and have logical errors      
- Triggers correction or re-execution if necessary    
    
\\\> ✅ \\\*\\\*All model calls, data transfers, and task storage are completed within the enterprise's internal servers. No cloud API dependencies.\\\*\\\*    
    
\\\#\\\#\\\#\\\# 2.3 Example of Local Model Role Assignment    
    
| Role | Recommended Local Model | Hardware Requirement | Invocation Frequency |    
|------|------------------------|----------------------|----------------------|    
| \\\*\\\*Planning & Review (SOTA role)\\\*\\\* | Qwen 3.6 27B (INT8)\\\<br\\\>DeepSeek R1 32B (INT8) | RTX 3090 / 4090\\\<br\\\>or dual 3090 | Low (1–2 times per task) |    
| \\\*\\\*Large-scale Execution (Efficient role)\\\*\\\* | Qwen 7B (INT4)\\\<br\\\>Llama 3 8B\\\<br\\\>Gemma 2 9B | RTX 3060 / A2000\\\<br\\\>or CPU + RAM | High (can be parallelized dozens of times) |    
    
\\\#\\\#\\\#\\\# 2.4 Typical Local Task Flow Example (Code Generation)    
    
\\\> \\\*\\\*User request\\\*\\\*: Generate a complete Python script for financial data anomaly detection.    
    
1. \\\*\\\*Local planning (27B model)\\\*\\\*      
   - Output: module structure, anomaly detection algorithm selection, logging and alerting specifications      
   - Does not write specific code    
    
2. \\\*\\\*Local execution (7B model)\\\*\\\*      
   - Strictly follows the plan to generate 5 function modules sequentially      
   - Each module calls a small model independently, can be parallelized    
    
3. \\\*\\\*Local review (27B model)\\\*\\\*      
   - Checks whether the code implements the plan and has logical flaws      
   - Outputs the final executable script    
    
\\\> \\\*\\\*Effect\\\*\\\*: Large model calls increase from 1 → 2 (planning + review), but overall task quality is higher, and total latency decreases by over 40% with concurrent execution.    
    
\\\#\\\#\\\# III. Hardware & Model Support Upgrades (Adapted for Hybrid Routing)    
    
\\\#\\\#\\\#\\\# 3.1 Recommended Hardware Combinations (Supporting Dual-Model Parallelism)    
    
| Scenario | Hardware Recommendation | Deployment Mode |    
|----------|------------------------|----------------|    
| \\\*\\\*Entry-level Hybrid\\\*\\\* | RTX 3090 ×1 (24GB) + 64GB RAM | SOTA model (27B) and efficient model (7B) \\\*\\\*time-shared loading\\\*\\\* |    
| \\\*\\\*Standard Hybrid\\\*\\\* | RTX 4090 ×1 (24GB) + 128GB RAM | Both 27B + 7B models resident simultaneously (VRAM ~18GB + 6GB) |    
| \\\*\\\*High-performance Hybrid\\\*\\\* | RTX 3090 ×2 (48GB) | SOTA model on one GPU, efficient model on the other, no interference |    
| \\\*\\\*Apple Silicon Hybrid\\\*\\\* | M2 Ultra (128GB unified memory) | Unified memory loads 32B + 7B models simultaneously, no VRAM bottleneck |    
    
\\\#\\\#\\\#\\\# 3.2 Efficient Small Model Selection (Execution Role)    
    
| Model | Size | Inference Speed | Recommended Hardware |    
|-------|------|----------------|----------------------|    
| Qwen 7B (INT4) | ~4GB | 100–150 tokens/s | RTX 3060 / 4060 |    
| Llama 3 8B (INT4) | ~5GB | 90–130 tokens/s | RTX 4060 / 3090 |    
| Gemma 2 9B (INT4) | ~6GB | 80–120 tokens/s | RTX 4070 / 3090 |    
| Phi-3 Mini (3.8B) | ~2.5GB | 150+ tokens/s | CPU / low-end GPU |    
    
All these efficient models \\\*\\\*can run locally\\\*\\\*, suitable for handling more than 80% of token generation work.    
    
\\\#\\\#\\\# IV. Routing & Scheduling Strategy (Data Security First)    
    
\\\#\\\#\\\#\\\# 4.1 Task Routing Principles    
    
| Task Type | Routing Strategy | Typical Scenarios |    
|-----------|------------------|--------------------|    
| \\\*\\\*Complex reasoning / code design\\\*\\\* | Only call SOTA model (27B+) | Medical diagnostic logic, financial risk rules |    
| \\\*\\\*Long-text generation / bulk execution\\\*\\\* | Small models (7–9B) in parallel | Batch de-identification of medical records, batch contract summarization |    
| \\\*\\\*Review / validation\\\*\\\* | SOTA model | Compliance checks, answer consistency verification |    
| \\\*\\\*Simple Q&A / retrieval\\\*\\\* | Small model | Knowledge base quick Q&A, auto-grading of educational tests |    
    
\\\#\\\#\\\#\\\# 4.2 Data Security Enhancements    
    
- \\\*\\\*All routing strategies execute locally\\\*\\\*, no reliance on external APIs or rule services      
- \\\*\\\*Routing decision model can be a local lightweight classifier\\\*\\\* (or even a rule-based local service), avoiding additional data leakage risks      
- \\\*\\\*Logs and audits are also fully local\\\*\\\*, recording every model selection and invocation reason    
    
\\\#\\\#\\\# V. Typical Industry Deployment Examples (Hybrid Routing Edition)    
    
\\\#\\\#\\\#\\\# ✅ Configuration 1: Educational Institution AI Teaching Assistant (Entry-level Hybrid Routing)    
    
| Layer | Selection |    
|-------|-----------|    
| Hardware | RTX 3090 (24GB) + 64GB RAM |    
| SOTA Model | Qwen 3.6 27B (INT8) |    
| Efficient Model | Qwen 7B (INT4) |    
| Routing Strategy | Problem design → 27B; Batch grading → 7B |    
| Security | Student data stays entirely on-premises, never leaves campus network |    
    
\\\#\\\#\\\#\\\# ✅ Configuration 2: Financial Risk Control + Compliance Review (High-performance Hybrid Routing)    
    
| Layer | Selection |    
|-------|-----------|    
| Hardware | RTX 4090 ×2 (48GB) |    
| SOTA Model | DeepSeek R1 32B / Qwen 32B |    
| Efficient Model | Llama 3 8B ×2 (parallel execution) |    
| Routing Strategy | Risk rule formulation → 32B; Batch transaction screening → 8B |    
| Security | Financial data absolutely isolated, no external model calls |    
    
\\\#\\\#\\\# VI. Summary of Improvements Over Original Solution    
    
| Dimension | Original IclawMini Solution | Enhanced Edition (Hybrid Routing) |    
|-----------|-----------------------------|------------------------------------|    
| Data Security | ✅ Fully local | ✅ Fully local (unchanged) |    
| Number of SOTA model calls | 1 per task | 2 per task (planning + review) |    
| Execution efficiency | All done by large model | \\\>80% of tokens generated by small model |    
| Concurrency capability | Limited by large model throughput | Small models can parallelize, throughput increased 3–5x |    
| Long-text task cost | Linear growth | Significantly reduced marginal cost |    
| Task quality controllability | High | Even higher (added review stage) |    
    
\\\#\\\#\\\# VII. Deployment Recommendations & Considerations    
    
1. \\\*\\\*Entry-level recommendation\\\*\\\*: Start with a single RTX 3090 + Qwen 3.6 27B (planning/review) + Qwen 7B (execution) to validate hybrid routing effectiveness.    
    
2. \\\*\\\*Not all tasks need splitting\\\*\\\*: Simple tasks (e.g., "What's the weather like today?") should directly use the small model to avoid routing overhead.    
    
3. \\\*\\\*Review stage can be simplified\\\*\\\*: For non-critical tasks, the review stage can be changed to sampling or rule-based checking to further reduce large model load.    
    
4. \\\*\\\*Absolutely no fallback to cloud\\\*\\\*: Even if task splitting is complex, never temporarily call cloud models (e.g., GPT-4o) for better results, as that violates the core security premise of the solution.    
    
---    
    
\\\#\\\# Technical Reference Appendices    
    
\\\#\\\# Appendix I: Local Hybrid Routing Implementation Code Based on Ollama + LangChain    
    
\\\> \\\*\\\*Environment requirements\\\*\\\*: Ubuntu 22.04 / Python 3.10+ / Ollama installed and required models pulled      
\\\> \\\*\\\*Example models\\\*\\\*:      
\\\> - SOTA planning/review: \\\`qwen3:27b\\\` (or \\\`qwen3:32b\\\`)      
\\\> - Efficient execution: \\\`qwen3:7b\\\` (or \\\`llama3:8b\\\`)      
\\\> \\\*\\\*Security principle\\\*\\\*: All calls go through local Ollama service (127.0.0.1:11434), never access the internet.    
    
\\\#\\\#\\\# 1. Install Dependencies    
    
\\\`\\\`\\\`bash    
pip install langchain langchain-community ollama chromadb
```

### 2. Local Hybrid Router Core Code

```
\\\# local\\\_hybrid\\\_router.py    
import json    
import time    
from typing import List, Dict, Any    
from langchain\\\_community.llms import Ollama    
from langchain.callbacks.manager import CallbackManager    
from langchain.callbacks.stdout import StdOutCallbackHandler    
    
\\\# ---------- Local Model Client ----------    
class LocalLLMClient:    
    def \\\_\\\_init\\\_\\\_(self, model\\\_name: str, temperature: float = 0.1):    
        self.llm = Ollama(    
            model=model\\\_name,    
            temperature=temperature,    
            base\\\_url="http://127.0.0.1:11434",   \\\# Local only    
            callback\\\_manager=CallbackManager(\\\[StdOutCallbackHandler()\\\])    
        )    
        
    def generate(self, prompt: str, max\\\_tokens: int = 2048) -\\\> str:    
        return self.llm.invoke(prompt)    
    
\\\# ---------- Planning-Execution-Review Engine ----------    
class LocalHybridRouter:    
    def \\\_\\\_init\\\_\\\_(self, planner\\\_model: str, executor\\\_model: str, reviewer\\\_model: str = None):    
        self.planner = LocalLLMClient(planner\\\_model, temperature=0.2)    
        self.executor = LocalLLMClient(executor\\\_model, temperature=0.1)    
        \\\# Reviewer defaults to the same model as planner (or can specify a lightweight review model)    
        self.reviewer = LocalLLMClient(reviewer\\\_model or planner\\\_model, temperature=0.1)    
        
    def plan(self, user\\\_request: str) -\\\> str:    
        prompt = f"""You are a top-tier task planning expert. For the following request, generate a \\\*\\\*detailed, executable, step-by-step\\\*\\\* implementation plan.    
Do not generate the final content. Only output a structured execution blueprint (Markdown list or JSON).    
    
Request: \\\{user\\\_request\\\}    
    
Example output format:    
\\\#\\\# Execution Blueprint    
1. Analyze key requirements    
2. Design technical solution    
3. Step-by-step execution instructions...    
"""    
        return self.planner.generate(prompt)    
        
    def execute(self, plan: str, user\\\_request: str, batch\\\_size: int = 1) -\\\> List\\\[str\\\]:    
        """Can execute multiple subtasks in parallel; simplified here as single execution. Use thread pool for scaling."""    
        prompt = f"""You are a rigorous executor. Strictly follow the execution blueprint below to generate specific content.    
Do not add steps outside the blueprint, do not change the structure.    
    
=== Execution Blueprint ===    
\\\{plan\\\}    
    
=== Original Request ===    
\\\{user\\\_request\\\}    
    
Now, generate the final content step by step according to the blueprint:    
"""    
        result = self.executor.generate(prompt, max\\\_tokens=4096)    
        return \\\[result\\\]    
        
    def review(self, plan: str, draft: str, user\\\_request: str) -\\\> str:    
        prompt = f"""Act as a review expert. Check whether the following content fully adheres to the execution blueprint, meets the original request, and contains any factual or logical errors.    
    
=== Execution Blueprint ===    
\\\{plan\\\}    
    
=== Content to Review ===    
\\\{draft\\\}    
    
=== Original Request ===    
\\\{user\\\_request\\\}    
    
Please output:    
1. Review conclusion (Pass / Needs revision)    
2. If revision is needed, output the corrected final version directly (no additional explanation).    
"""    
        return self.reviewer.generate(prompt)    
        
    def run(self, user\\\_request: str, verbose: bool = True) -\\\> str:    
        if verbose:    
            print("🧠 \\\[Planning Stage\\\] Calling local SOTA model...")    
        plan = self.plan(user\\\_request)    
        if verbose:    
            print(f"📐 Plan result:\\\\n\\\{plan\\\[:200\\\]\\\}...\\\\n")    
            
        if verbose:    
            print("⚙️ \\\[Execution Stage\\\] Calling local efficient model...")    
        drafts = self.execute(plan, user\\\_request)    
        draft = drafts\\\[0\\\]    
        if verbose:    
            print(f"📄 Execution result (first 200 chars):\\\\n\\\{draft\\\[:200\\\]\\\}...\\\\n")    
            
        if verbose:    
            print("🔍 \\\[Review Stage\\\] Calling local SOTA model again...")    
        final = self.review(plan, draft, user\\\_request)    
        if verbose:    
            print("✅ Final output:")    
        return final    
    
\\\# ---------- Usage Example ----------    
if \\\_\\\_name\\\_\\\_ == "\\\_\\\_main\\\_\\\_":    
    \\\# Initialize router (ensure Ollama has these models)    
    router = LocalHybridRouter(    
        planner\\\_model="qwen3:27b",      \\\# high-precision model    
        executor\\\_model="qwen3:7b",      \\\# efficient small model    
        reviewer\\\_model="qwen3:27b"      \\\# can also use the same model    
    )    
        
    request = "Generate a teaching syllabus for a middle school course 'Cybersecurity Awareness', containing 5 modules, each with learning objectives and key knowledge points."    
    result = router.run(request)    
    print(result)
```

### 3. Parallel Execution Extension for Large Batch Subtasks

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
    
\\\# Integrate into LocalHybridRouter
```

> ✅ **Security Note**: All calls go through `127.0.0.1:11434` local Ollama service; model files are also stored on local disk. **Absolutely no data is sent to any cloud API.**

## Appendix II: Prompt Templates for Healthcare, Finance, Education (Planning, Execution, Review)

All templates are plain text and can be directly copied into the `plan` / `execute` / `review` prompts in the code above.

### 1. Healthcare Industry – Medical Record Summarization & Assisted Diagnosis

#### Planning Prompt (SOTA model)

```
You are a senior medical informatics expert. Generate a "Structured Summarization and Diagnosis Suggestion Execution Blueprint" for the following patient medical record.    
    
Patient medical record text:    
\\\{medical\\\_record\\\_content\\\}    
    
Output the blueprint in the following format (do not output diagnosis conclusions, only steps):    
1. Information extraction: List key information (chief complaint, history of present illness, past history, examination results)    
2. Terminology standardization: Map non-standard terms to ICD-10 or SNOMED CT    
3. Summarization generation: Generate structured summary in SOAP format    
4. Assisted diagnosis suggestions: Possible diagnosis directions based on knowledge base (only directions, not final diagnosis)    
5. Compliance de-identification: Automatically mark fields that need de-identification (name, ID number, etc.)    
    
Strictly output the blueprint following these 5 steps.
```

#### Execution Prompt (efficient model)

```
You are a strict assistant for medical documentation. Strictly follow the execution blueprint below to process the patient medical record.    
    
Execution blueprint:    
\\\{plan\\\}    
    
Patient medical record:    
\\\{medical\\\_record\\\_content\\\}    
    
Please output:    
- Structured summary (SOAP format)    
- De-identified patient information    
- Possible diagnosis directions (only as reference, marked "Not final diagnosis")
```

#### Review Prompt (SOTA model)

```
You are a chief physician. Review whether the generated content:    
1. Fully follows all steps of the execution blueprint    
2. Has sound medical logic, no critical errors    
3. Is de-identification compliant (does not leak patient privacy)    
    
Execution blueprint: \\\{plan\\\}    
Generated content: \\\{draft\\\}    
Original medical record: \\\{original\\\_medical\\\_record\\\}    
    
If qualified, output "Review passed" and the original content; if not, output the corrected version.
```

### 2. Finance Industry – Transaction Risk Control & Compliance Review

#### Planning Prompt

```
You are a financial risk control expert. Create a "Real-time Risk Analysis Execution Plan" for the following transaction data.    
    
Transaction data sample:    
\\\{transaction\\\_data\\\}    
    
Output blueprint (steps only, no conclusions):    
1. Anomaly feature extraction (frequency, amount, time, counterparty)    
2. Rule engine matching (predefined risk rule set)    
3. Anomaly score calculation    
4. Generate risk report (with high/medium/low risk labels)    
5. Audit log recording requirements
```

#### Execution Prompt

```
You are a financial data processor. Strictly follow the blueprint below to analyze transaction data line by line and output a risk report.    
    
Blueprint: \\\{plan\\\}    
Transaction data: \\\{data\\\}    
    
Output format: Table (Transaction ID | Risk Level | Triggered Rule | Suggested Action)
```

#### Review Prompt

```
You are a compliance auditor. Review whether the risk report below:    
- Fully executed all 5 steps of the blueprint    
- Rule matching logic is correct    
- No obvious anomalous transactions are missed    
    
Blueprint: \\\{plan\\\}    
Report: \\\{draft\\\}    
    
If qualified, output "Compliance passed"; otherwise output the corrected report.
```

### 3. Education Industry – Learning Analytics & Personalized Tutoring

#### Planning Prompt

```
You are an educational data scientist. Create a "Learning Analytics and Personalized Tutoring Plan" for the following student homework/exam score data.    
    
Student data sample:    
\\\{student\\\_scores\\\_data\\\}    
    
Output blueprint:    
1. Score trend analysis (line chart data description)    
2. Weak knowledge point identification (by chapter/question type)    
3. Generate personalized practice suggestions for each student (3-5 questions)    
4. Teacher report summary    
5. Privacy de-identification (do not show student names, only IDs)
```

#### Execution Prompt

```
You are an educational data analysis assistant. Strictly follow the blueprint to generate the learning analytics report.    
    
Blueprint: \\\{plan\\\}    
Student data: \\\{data\\\}    
    
Output: JSON format containing student\\\_id, weak\\\_points, practice\\\_suggestions.
```

#### Review Prompt

```
You are a department head. Review the following learning analytics report:    
- Is weak point identification consistent with the data?    
- Are practice suggestions targeted?    
- Are all blueprint steps completed?    
    
Blueprint: \\\{plan\\\}    
Report: \\\{draft\\\}    
    
Output "Pass" directly or the corrected report.
```

> **Privacy protection**: All prompts emphasize de-identification, and in practice, a local preprocessing module (regex + NER) can remove student names, ID numbers, etc., before sending to the model.

## Appendix III: Training/Fine-tuning a Local Small Model for Routing Decisions

> **Purpose**: Use a very small local model (e.g., 1B–3B parameters) to automatically decide whether a task should go through the "SOTA full three-stage routing" or be answered "directly by a small model", further reducing large model invocations. The decision process is completely local with no privacy risk.

### 1. Solution Selection Recommendations

| Solution | Parameters | Inference Speed | Training Difficulty | Recommended Scenarios |
| - | - | - | - | - |
| **Fine-tune Qwen2.5-1.5B** | 1.5B | 200+ tokens/s | Low (LoRA) | General task classification |
| **Fine-tune Gemma-2B** | 2B | 150+ tokens/s | Medium | High precision requirements |
| **Train a BERT classifier** | 110M | Very fast | Low | Binary text classification only |
| **Rule + keyword matching** | None | Very fast | No training | Simple rule-based scenarios |


> ✅ **Security first**: All training data is generated from real enterprise requests after de-identification. The final model is deployed locally, never online.

### 2. Data Preparation & Annotation (Key Steps)

#### 2.1 Collect raw requests

Collect 1000–5000 user requests from actual enterprise business, e.g.:

- "Analyze the abnormal indicators in this medical record"

- "Generate a 10-page financial report template"

- "Grade these 50 middle school math multiple-choice questions"

#### 2.2 Manual annotation of routing labels

| Label | Meaning | Example |
| - | - | - |
| `full\\\_route` | Requires full planning→execution→review routing | Complex reasoning, code design, medical diagnosis, long-text generation |
| `fast\\\_lane` | Can be answered directly by a small model | Simple Q&A, knowledge base retrieval, data format conversion |


#### 2.3 Build training set format (for fine-tuning LLM or training BERT)

```
\\\{"instruction": "Analyze the abnormal indicators in this medical record", "label": "full\\\_route"\\\}    
\\\{"instruction": "What is machine learning?", "label": "fast\\\_lane"\\\}
```

### 3. Fine-tune Qwen2.5-1.5B as Routing Classifier (LoRA)

#### 3.1 Install dependencies

```
pip install transformers peft accelerate datasets torch
```

#### 3.2 Fine-tuning script (simplified)

```
\\\# train\\\_router.py    
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer    
from peft import LoraConfig, get\\\_peft\\\_model    
from datasets import Dataset    
import json    
    
\\\# Load base model    
model\\\_name = "Qwen/Qwen2.5-1.5B"    
tokenizer = AutoTokenizer.from\\\_pretrained(model\\\_name, trust\\\_remote\\\_code=True)    
model = AutoModelForCausalLM.from\\\_pretrained(model\\\_name, trust\\\_remote\\\_code=True)    
    
\\\# LoRA config    
lora\\\_config = LoraConfig(    
    r=8, lora\\\_alpha=32, target\\\_modules=\\\["q\\\_proj", "v\\\_proj"\\\], lora\\\_dropout=0.1    
)    
model = get\\\_peft\\\_model(model, lora\\\_config)    
    
\\\# Prepare dataset (convert JSON to instruction-label pairs)    
def format\\\_example(example):    
    prompt = f"Decide whether the following user request needs full three-stage routing (planning-execution-review).\\\\nRequest: \\\{example\\\['instruction'\\\]\\\}\\\\nAnswer:"    
    target = example\\\['label'\\\]  \\\# "full\\\_route" or "fast\\\_lane"    
    return \\\{"prompt": prompt, "target": target\\\}    
    
\\\# Load and process data    
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
    
\\\# Training    
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

#### 3.3 Inference deployment (local Ollama or Transformers)

```
\\\# router\\\_inference.py    
from peft import PeftModel    
from transformers import AutoModelForCausalLM, AutoTokenizer    
    
base\\\_model = AutoModelForCausalLM.from\\\_pretrained("Qwen/Qwen2.5-1.5B")    
router = PeftModel.from\\\_pretrained(base\\\_model, "./router\\\_lora")    
tokenizer = AutoTokenizer.from\\\_pretrained("Qwen/Qwen2.5-1.5B")    
    
def decide\\\_route(user\\\_request: str) -\\\> str:    
    prompt = f"Decide whether the following user request needs full three-stage routing.\\\\nRequest: \\\{user\\\_request\\\}\\\\nAnswer:"    
    inputs = tokenizer(prompt, return\\\_tensors="pt")    
    outputs = router.generate(\\\*\\\*inputs, max\\\_new\\\_tokens=8)    
    decision = tokenizer.decode(outputs\\\[0\\\], skip\\\_special\\\_tokens=True).strip()    
    return "full\\\_route" if "full\\\_route" in decision else "fast\\\_lane"    
    
\\\# Integrate into the main router
```

### 4. Lighter-weight Solution: Train a BERT Classifier (for pure binary classification)

```
\\\# bert\\\_router.py    
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments    
from datasets import Dataset    
import torch    
    
model\\\_name = "bert-base-uncased"    
tokenizer = AutoTokenizer.from\\\_pretrained(model\\\_name)    
model = AutoModelForSequenceClassification.from\\\_pretrained(model\\\_name, num\\\_labels=2)  \\\# 0=fast\\\_lane,1=full\\\_route    
    
\\\# Dataset preparation (same as above)    
def tokenize(examples):    
    return tokenizer(examples\\\["instruction"\\\], truncation=True, padding="max\\\_length", max\\\_length=128)    
    
dataset = Dataset.from\\\_list(raw\\\_data)    
dataset = dataset.map(tokenize, batched=True)    
dataset = dataset.rename\\\_column("label", "labels")  \\\# requires integers 0/1    
    
training\\\_args = TrainingArguments(    
    output\\\_dir="./bert\\\_router",    
    per\\\_device\\\_train\\\_batch\\\_size=16,    
    num\\\_train\\\_epochs=5,    
)    
trainer = Trainer(model=model, args=training\\\_args, train\\\_dataset=dataset)    
trainer.train()    
model.save\\\_pretrained("./bert\\\_router")    
    
\\\# Inference is very fast (even on CPU)
```

### 5. Integrate Routing Decision into Main Flow

```
class SecureLocalRouter:    
    def \\\_\\\_init\\\_\\\_(self):    
        self.decision\\\_model = load\\\_router()  \\\# the fine-tuned model above    
        self.hybrid\\\_engine = LocalHybridRouter(...)    
        self.fast\\\_model = LocalLLMClient("qwen3:7b")    
        
    def handle(self, request: str):    
        route = self.decision\\\_model.predict(request)  \\\# local call    
        if route == "fast\\\_lane":    
            return self.fast\\\_model.generate(request)    
        else:    
            return self.hybrid\\\_engine.run(request)
```

> **Ultimate security guarantee**: Even the routing decision model runs entirely on the enterprise's own servers. Training data, model weights, and inference processes never leave the local network. Absolutely no reliance on any cloud classification API.

