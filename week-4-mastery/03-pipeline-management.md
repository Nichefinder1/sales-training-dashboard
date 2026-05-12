# Module 4.3: Pipeline Management

**Reading Time:** 15 minutes
**Objective:** Build a daily routine that keeps your pipeline healthy and your deals moving forward

---

## Your Pipeline Is Your Business

Here's the reality: talent matters, scripts matter, psychology matters — but none of it matters if you don't work your pipeline every single day. The best salespeople aren't the most charismatic. They're the most consistent.

Pipeline management isn't glamorous. It's 15 minutes every morning of checking in, following up, and updating records. But those 15 minutes compound into closed deals, and closed deals compound into commissions.

---

## The Daily Routine (15 Minutes)

Do this every morning before anything else. Coffee in hand. No distractions.

### Step 1: Check "Follow-Up Due" View (3 minutes)
Open Airtable. Go to the **Follow-Up Due** view. This shows every prospect with a follow-up date of today or earlier.

For each record:
- Send the follow-up (email, call, LinkedIn message — whatever the cadence calls for)
- Update the "Last Contact" field to today
- Set the next follow-up date based on the sequence
- Add a note about what you sent

### Step 2: Check "Active Pipeline" for Stale Deals (3 minutes)
Switch to the **Active Pipeline** view. Look for any prospect who hasn't been contacted in 7+ days.

Stale deals die. If someone's been sitting for a week without a touchpoint:
- Send a value-add message (industry article, relevant insight, case study)
- If they've been stale for 14+ days, send a "break-up" message (more on this in follow-up sequences)
- Update the record

### Step 3: Send Scheduled Follow-Ups (5 minutes)
Work through your follow-up cadences (post-outreach, post-proposal, nurture). Each message should be:
- Personalized (reference something specific about their business)
- Value-adding (don't just say "checking in")
- Short (3-5 sentences max)

### Step 4: Update Every Record You Touched (2 minutes)
This is the discipline that separates pros from amateurs. Every prospect you contacted today gets updated:
- Last Contact date
- Next Action
- Notes on what was said/sent

### Step 5: End-of-Day Pipeline Summary (2 minutes)
At the end of every workday, send Corey a brief summary:

> **Pipeline Update — [Date]**
> - Outreach sent: 3
> - Follow-ups sent: 5
> - Responses received: 1 (Maria Gonzalez — interested, scheduling discovery)
> - Discovery calls scheduled: 1 (Thursday 2pm)
> - Pipeline total: 12 active prospects, $180K potential

This keeps Corey in the loop and holds you accountable.

---

## Airtable CRM Setup

Your pipeline lives in Airtable. Here's the field structure:

| Field | Type | Purpose |
|-------|------|---------|
| Company | Text | Business name |
| Contact Name | Text | Primary contact |
| Contact Email | Email | Primary email |
| Contact Phone | Phone | Primary phone |
| Stage | Single Select | Current pipeline stage |
| Source | Single Select | How they found us (referral, outreach, inbound, LinkedIn, etc.) |
| Last Contact | Date | When you last reached out |
| Next Action | Text | Specific next step ("Send follow-up email", "Call Thursday 2pm") |
| Next Action Date | Date | When the next action is due |
| Deal Size | Currency | Estimated deal value |
| Temperature | Single Select | Hot / Warm / Cold |
| Industry | Single Select | Their industry vertical |
| Employee Count | Number | Company size |
| Annual Revenue | Currency | Estimated revenue (if known) |
| Pain Points | Long Text | What's hurting them |
| Notes | Long Text | Running notes from all interactions |
| Created Date | Date (auto) | When they entered the pipeline |

### Views You Need

| View | Filter | Purpose |
|------|--------|---------|
| **All Prospects** | None | Full database |
| **Active Pipeline** | Stage is NOT "Closed Won" or "Closed Lost" or "Nurture" | Current deals |
| **Follow-Up Due** | Next Action Date is on or before today | Your morning checklist |
| **Hot Prospects** | Temperature = "Hot" | Priority attention |
| **Stale Deals** | Last Contact is 7+ days ago AND stage is active | Needs touchpoint |
| **Won Deals** | Stage = "Closed Won" | Reference and referral source |
| **Lost Deals** | Stage = "Closed Lost" | Learning and re-engagement |
| **Nurture** | Stage = "Nurture" | Long-term relationships |

---

## Pipeline Stages

Every prospect moves through these stages in order. No skipping.

### 1. Prospect
**What it means:** You've identified them but haven't reached out yet.
**Entry criteria:** You've researched them and they match our ICP.
**Exit criteria:** First outreach sent.

### 2. Outreach
**What it means:** You've sent initial outreach (email, LinkedIn, cold call).
**Entry criteria:** First message sent.
**Exit criteria:** They respond OR you complete the outreach cadence with no response (move to Nurture or Closed Lost).

### 3. Discovery Scheduled
**What it means:** They've agreed to a discovery call.
**Entry criteria:** Call is on the calendar with a confirmed date/time.
**Exit criteria:** Discovery call happens.

### 4. Discovery Complete
**What it means:** Discovery call happened. You're evaluating fit.
**Entry criteria:** Call completed, notes documented.
**Exit criteria:** Decision to send proposal OR disqualify.

### 5. Proposal Sent
**What it means:** Formal proposal delivered.
**Entry criteria:** Proposal emailed with clear next steps.
**Exit criteria:** They respond to the proposal.

### 6. Follow-Up
**What it means:** Proposal was sent, awaiting decision.
**Entry criteria:** Proposal delivered, no response yet.
**Exit criteria:** They decide (yes/no/not now).

### 7. Closed Won
**What it means:** Deal closed. Contract signed. Money exchanged.
**Entry criteria:** Signed agreement + first payment received.
**Next:** Hand off to Corey for onboarding kickoff.

### 8. Closed Lost
**What it means:** They said no.
**Entry criteria:** Explicit rejection or complete non-response after full cadence.
**Next:** Log the reason. Set a 90-day re-engagement reminder.

### 9. Nurture
**What it means:** Not ready now, but could be later.
**Entry criteria:** "Not now" response, budget timing issue, or "maybe later."
**Next:** Monthly touchpoint. They stay in nurture until they're ready or you determine they never will be.

---

## Weekly Metrics Targets

These are your weekly benchmarks. Track them every Friday.

| Metric | Target | Why |
|--------|--------|-----|
| Prospects researched | 10 | Keep the top of funnel full |
| Outreach sent | 5 | You need conversations to close deals |
| Responses received | 2 | 40% response rate is the benchmark |
| Discovery calls booked | 1 | One qualified conversation per week builds pipeline |
| Applications responded to | Same day | Speed wins. 2-hour SLA on inbound |

### Conversion Benchmarks

| Stage Transition | Target Rate |
|-----------------|-------------|
| Outreach → Response | 30-40% |
| Response → Discovery Scheduled | 50% |
| Discovery → Proposal | 60% |
| Proposal → Closed Won | 40% |

These rates compound. If you send 5 outreach per week:
- 2 respond (40%)
- 1 books discovery (50%)
- 4 discoveries/month → 2.4 proposals/month (60%)
- 2.4 proposals → ~1 close/month (40%)

One $15K Architecture close per month = $180K/year in new business generated. That's the baseline.

---

## Monthly Metrics Targets

Review these on the first Monday of each month with Corey.

| Metric | Target | Notes |
|--------|--------|-------|
| Discovery calls completed | 4+ | At least 1 per week |
| Proposals sent | 2+ | Not every discovery becomes a proposal |
| Close rate | 40%+ | Track proposal-to-close specifically |
| Average deal size | $15K+ | Architecture is the entry point |
| Pipeline value | $100K+ | Total value of active pipeline |
| Time to first response | < 2 hours | For inbound inquiries |
| Referrals asked for | 2+ | Every happy client interaction = referral ask |

---

## Pipeline Health Rules

These are non-negotiable. Violate them and your pipeline rots.

### Rule 1: No Prospect Sits in the Same Stage for More Than 14 Days
If someone has been in "Follow-Up" for two weeks with no response, they need either:
- A "break-up" message (see templates)
- A move to Nurture
- A move to Closed Lost

Stale deals clog your pipeline and waste your mental energy.

### Rule 2: Every Record Gets Updated the Same Day You Touch It
Don't batch updates. Don't tell yourself you'll do it later. Update the record immediately after every interaction. Future you will thank present you.

### Rule 3: Monday Pipeline Review
Every Monday morning, before your daily routine:
- Review all active pipeline deals
- Flag anything stale
- Identify your top 3 priority prospects for the week
- Share the pipeline summary with Corey

### Rule 4: Friday Metrics Check
Every Friday afternoon:
- Calculate your weekly metrics
- Compare to targets
- Identify what worked and what didn't
- Set specific goals for next week

### Rule 5: Every Interaction Has a Next Step
Never end a conversation, email, or call without a specific next step. "I'll follow up" is not a next step. "I'll send you the case study by Thursday and call you Friday at 2pm" is a next step.

---

## Pipeline Math: Why Consistency Wins

Let's do the math on consistent daily effort:

**Daily:**
- 15 minutes of pipeline management
- 2 outreach messages
- 3 follow-ups

**Weekly:**
- 10 outreach messages
- 15 follow-ups
- 1-2 discovery calls

**Monthly:**
- 40 outreach messages
- 60 follow-ups
- 4-8 discovery calls
- 2-4 proposals

**Quarterly:**
- 120 outreach attempts
- 180 follow-up touches
- 12-24 discovery calls
- 6-12 proposals
- 3-5 closes at $15K+ each = $45-75K in new Architecture revenue

**That's from 15 minutes a day.**

Now imagine what happens when you add LinkedIn engagement, referrals, and inbound from the agency's marketing. The pipeline compounds.

---

## The CRM Commandments

1. **If it's not in Airtable, it didn't happen.** Every call, email, and interaction gets logged.
2. **Next Action is never empty.** Every active prospect has a specific next step with a date.
3. **Temperature is honest.** Don't inflate. A "warm" prospect who hasn't responded in 10 days is "cold."
4. **Notes are for future you.** Write notes like you're leaving instructions for someone who's never talked to this prospect.
5. **Closed Lost gets a reason.** Always log why they said no. Patterns in lost deals reveal what to fix.

---

## Sales Psychology: The Consistency Principle

Robert Cialdini's research shows that people who track their behavior are dramatically more likely to maintain it. This is the **consistency principle** — once you see yourself as "someone who works their pipeline every day," you'll feel internal pressure to keep doing it.

That's why the daily routine matters. It's not just about the tasks. It's about building an identity: "I am the kind of salesperson who shows up every single day."

Tracking creates accountability. Accountability creates results. Results create confidence. Confidence creates more results.

It's a flywheel. The daily 15 minutes is what starts it spinning.

---

## Key Takeaway

Your pipeline is a living system, not a static list. Feed it daily (outreach), nurture it consistently (follow-ups), prune it honestly (move stale deals), and measure it weekly (metrics). The salespeople who win aren't the most talented — they're the most disciplined.

## What to Practice Today

1. Set up your Airtable pipeline with all fields and views listed above
2. Enter your first 5 prospects (even if they're practice prospects)
3. Block 15 minutes on your calendar every morning for pipeline management — make it non-negotiable
4. Write your first end-of-day pipeline summary and send it to Corey (even if pipeline is empty — the habit matters)
