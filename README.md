# 🤖 AI UAT Platform

##  Automating Business Requirement Analysis & User Acceptance Testing using Generative AI

Transform **Business Requirement Documents (BRDs)** into structured requirements, AI-generated clarification questions, comprehensive UAT test cases, traceability matrices, analytics dashboards, and an intelligent AI Copilot.

---

# 📖 Overview

The **AI UAT Platform** is an enterprise-grade AI application that automates the **User Acceptance Testing (UAT)** lifecycle using **Large Language Models (LLMs)** and **Retrieval-Augmented Generation (RAG)**.

Instead of manually reading lengthy Business Requirement Documents (BRDs), identifying requirements, creating test cases, and maintaining traceability, the platform performs the complete workflow automatically within minutes.

Designed for **Business Analysts, QA Engineers, Test Managers, and Product Teams**, the platform improves productivity, reduces manual effort, and increases testing coverage.

---

#  Problem Statement

Traditional UAT preparation requires teams to:

- Read 100–500+ page BRDs
- Extract functional & non-functional requirements
- Categorize requirements into business modules
- Identify ambiguities
- Generate clarification questions
- Design comprehensive UAT test cases
- Maintain Requirement Traceability Matrix (RTM)
- Measure testing coverage

> This process often takes **days or weeks**.

The **AI UAT Platform** reduces this effort to **minutes** using Generative AI.

---

#  Key Features

## 📄 Smart BRD Upload

Supports:

- PDF
- DOCX

Automatically parses documents and extracts structured text for downstream AI processing.

<p align="center">
<img src="backend/screenshots/DASHBOARD.jpeg" width="750">
</p>

---

##  Business Module Detection

Automatically identifies enterprise business domains including:

- Procurement
- Supplier Information Management (SIM)
- Contract Management
- Sourcing
- Receiving
- Invoicing
- Spend Analytics
- ESG & Compliance
- Fraud Detection
- Community AI
- Savings Management
- Contingent Workforce

---

## 🤖 AI Requirement Extraction

Uses LLMs to transform unstructured BRDs into structured business requirements.

Each extracted requirement contains:

- Requirement ID
- Business Module
- Priority
- Requirement Type
- Requirement Description

### Example

```text
REQ-001

Module:
Supplier Information Management (SIM)

Priority:
High

Requirement:
Supplier onboarding process should support approval workflows.
```

<p align="center">
<img src="backend/screenshots/Requirements.jpeg" width="750">
</p>

---

## ❓ AI Clarification Question Generation

Generates intelligent clarification questions for ambiguous requirements.
<p align="center">
  <img src="backend/screenshots/Clarification%20Questions.jpeg" width="750">
</p>
### Example

**Requirement**

> Supplier onboarding should follow approval workflow.

**Generated Questions**

- Who approves suppliers?
- Can approval be bypassed?
- What happens if approval is rejected?
- Is supplier onboarding mandatory?
- What SLA applies?

---

##  AI Test Case Generation

Automatically generates:

-  Positive Test Cases
-  Negative Test Cases
-  Boundary Value Cases
-  Exception Scenarios
-  Alternate Flow Scenarios

Each generated test case contains:

- Test Case ID
- Preconditions
- Test Steps
- Expected Result
- Requirement Mapping
- Priority

<p align="center">
<img src="backend/screenshots/EXCEL.jpeg" width="750">
</p>

---

## 🔗 Requirement Traceability Matrix (RTM)

Automatically links:

```text
Requirement
      ↓
Generated Test Cases
      ↓
Coverage Status
```

Provides:

- Covered Requirements
- Missing Requirements
- Coverage Percentage
- Linked Test Cases


---

## 📊 AI Analytics Dashboard

Interactive dashboard displaying:

- Total Requirements
- AI Clarification Questions
- Generated Test Cases
- Business Modules
- Coverage Percentage
- Covered Requirements
- Missing Requirements

Additional Insights:

- Module Distribution
- Requirement Priority Distribution
- Project Health
- AI Recommendations

<p align="center">
<img src="backend/screenshots/AI%20INSIGHTS.jpeg" width="750">
</p>

---

## 📋 Requirements Workspace

Dedicated workspace to:

- Browse Requirements
- Search Requirements
- Filter Covered / Missing
- View Requirement Details
- Inspect Linked Test Cases

---

## 🤖 AI Copilot (RAG Powered)

Ask natural language questions about any requirement.

### Example

- Explain this requirement.
- Why is this required?
- What business rules apply?
- What risks exist?
- How should QA validate this?

<p align="center">
<img src="backend/screenshots/AI%20COPILOT.jpeg" width="750">
</p>

The AI:

- Retrieves relevant BRD chunks using semantic search
- Uses Retrieval-Augmented Generation (RAG)
- Responds only using uploaded BRD context
- Prevents hallucinations by grounding responses in source documents

---

## 📈 Excel Export

Export generated UAT test cases into a structured Excel workbook ready for QA teams and business stakeholders.
