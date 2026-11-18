from collections import Counter
from pathlib import Path
import os

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

WEB_GROUPS = [
    ("Authentication", "Login form rendering", "Open login and verify email/password inputs render."),
    ("Authentication", "Valid login", "Use a dedicated E2E account and verify authenticated landing page."),
    ("Authentication", "Invalid password", "Submit an incorrect password and verify safe rejection."),
    ("Authentication", "Unknown account", "Submit an unknown account and verify generic failure."),
    ("Authentication", "Empty email", "Submit without email and verify required validation."),
    ("Authentication", "Empty password", "Submit without password and verify required validation."),
    ("Authentication", "Malformed email", "Submit malformed email and verify validation."),
    ("Authentication", "Password visibility", "Toggle password visibility and verify masking state."),
    ("Authentication", "Logout", "Log out and verify protected route access is denied."),
    ("Authorization", "Protected route", "Open a protected route without a session and verify redirect/denial."),
    ("Navigation", "Primary navigation", "Open a primary navigation destination and verify route."),
    ("Navigation", "Browser back", "Use browser back and verify expected prior page."),
    ("Navigation", "Browser forward", "Use browser forward and verify expected next page."),
    ("Navigation", "Nested route refresh", "Refresh a nested route and verify the page renders."),
    ("Dashboard", "Dashboard rendering", "Open dashboard and verify key sections render."),
    ("Jobs", "Job listing", "Open jobs and verify cards or rows render."),
    ("Jobs", "Job search", "Search a known keyword and verify matching results."),
    ("Jobs", "Empty search results", "Search unmatched text and verify empty state."),
    ("Jobs", "Filter jobs", "Apply a filter and verify result set changes."),
    ("Jobs", "Clear filters", "Clear filters and verify default result set."),
    ("Jobs", "Job details", "Open a job card and verify details render."),
    ("Jobs", "Pagination", "Move to next page when pagination is available."),
    ("Profile", "Profile view", "Open profile and verify profile data renders."),
    ("Profile", "Profile validation", "Submit invalid profile data and verify validation."),
    ("Roadmap", "Roadmap view", "Open roadmap and verify milestones render."),
    ("Hackathons", "Hackathon listing", "Open hackathons and verify list renders."),
    ("Forms", "Required fields", "Submit a required form empty and verify validation."),
    ("Accessibility", "Keyboard navigation", "Navigate key controls using keyboard only."),
    ("Accessibility", "Accessible labels", "Verify inputs and controls have accessible names."),
    ("Responsive", "Mobile viewport", "Verify layout at a narrow viewport."),
    ("Error handling", "Unknown route", "Open an unknown route and verify not-found behavior."),
    ("Security UI", "Sensitive data masking", "Verify password and secret-like values are not exposed."),
]

APP_GROUPS = [
    ("Launch", "Cold launch", "Launch app and verify first screen renders."),
    ("Launch", "Warm launch", "Background and resume app; verify stable state."),
    ("Authentication", "Valid login", "Sign in with E2E credentials and verify authenticated screen."),
    ("Authentication", "Invalid login", "Submit invalid credentials and verify safe failure."),
    ("Authentication", "Empty credentials", "Submit empty credentials and verify validation."),
    ("Authentication", "Logout", "Log out and verify protected content is inaccessible."),
    ("Navigation", "Primary navigation", "Open primary navigation destinations and verify screens."),
    ("Navigation", "Back navigation", "Use device back and verify expected screen."),
    ("Jobs", "Job listing", "Open jobs and verify list content."),
    ("Jobs", "Job search", "Search a keyword and verify matching results."),
    ("Jobs", "Job filters", "Apply an available filter and verify result changes."),
    ("Jobs", "Job details", "Open a job card and verify detail screen."),
    ("Profile", "Profile view", "Open profile and verify profile content."),
    ("Profile", "Profile validation", "Submit invalid profile data and verify validation."),
    ("Roadmap", "Roadmap view", "Open roadmap and verify milestones."),
    ("Roadmap", "Progress interaction", "Update a test milestone and verify state."),
    ("Hackathons", "Hackathon listing", "Open hackathons and verify list."),
    ("Network", "Offline behavior", "Disable network in test setup and verify graceful handling."),
    ("Lifecycle", "Resume app", "Background then resume and verify no crash."),
    ("Accessibility", "Accessible controls", "Verify key controls expose accessibility labels."),
    ("Visual", "Small screen layout", "Verify content fits the device viewport."),
    ("Security", "Sensitive data masking", "Verify passwords and secret values are not exposed."),
]

def style_workbook(workbook):
    header_fill = PatternFill("solid", fgColor="17365D")
    for sheet in workbook.worksheets:
        sheet.freeze_panes = "A2"
        sheet.auto_filter.ref = sheet.dimensions
        for cell in sheet[1]:
            cell.font = Font(bold=True, color="FFFFFF")
            cell.fill = header_fill
            cell.alignment = Alignment(wrap_text=True, vertical="center")
        sheet.row_dimensions[1].height = 28
        for col in range(1, sheet.max_column + 1):
            values = [
                len(str(sheet.cell(row, col).value or ""))
                for row in range(1, min(sheet.max_row, 80) + 1)
            ]
            sheet.column_dimensions[get_column_letter(col)].width = min(
                max(max(values + [12]) + 2, 14), 48
            )
        for row in sheet.iter_rows(min_row=2):
            for cell in row:
                cell.alignment = Alignment(wrap_text=True, vertical="top")

def generate(path, prefix, groups, platform):
    total = 300
    counts = Counter(groups[i % len(groups)][0] for i in range(total))

    workbook = Workbook()
    summary = workbook.active
    summary.title = "Test Summary"
    summary.append(["Metric", "Value"])
    summary_rows = [
        ("Project", "Career Navigator"),
        ("Test Suite", f"{platform} E2E Test Plan"),
        ("Platform", platform),
        ("Planned Test Cases", total),
        ("Executed Test Cases", 0),
        ("Passed", 0),
        ("Failed", 0),
        ("Blocked", 0),
        ("Not Run", total),
        ("Pass Rate", "Not available - planned cases have not been executed"),
        ("Report Note", "This workbook is a test plan. It does not claim that planned cases passed."),
    ]
    for row in summary_rows:
        summary.append(list(row))

    breakdown = workbook.create_sheet("Category Breakdown")
    breakdown.append(["#", "Test Suite Category", "Planned Test Cases", "Execution Status", "Key Coverage"])
    for index, (category, count) in enumerate(counts.items(), start=1):
        coverage = "; ".join(dict.fromkeys(
            scenario for module, scenario, _ in groups if module == category
        ))
        breakdown.append([index, category, count, "NOT RUN - PLANNED", coverage])
    breakdown.append(["", "TOTAL", total, "NOT RUN - PLANNED", ""])

    details = workbook.create_sheet("Test Cases")
    details.append([
        "Test Case ID", "Module / Category", "Test Scenario", "Test Description",
        "Preconditions", "Test Steps", "Expected Result", "Priority", "Test Type",
        "Automation Status", "Execution Status", "Actual Result", "Defect ID"
    ])
    for index in range(total):
        module, scenario, description = groups[index % len(groups)]
        variation = index // len(groups) + 1
        details.append([
            f"{prefix}-{index + 1:03d}",
            module,
            scenario if variation == 1 else f"{scenario} - Variation {variation}",
            description,
            "Test build available; required test account and data prepared.",
            "1. Launch the application. 2. Open the feature. 3. Perform the action. 4. Check the result.",
            "The documented behavior occurs without a crash, unintended data change, or sensitive-data exposure.",
            ["High", "Medium", "Low"][index % 3],
            "End-to-End",
            "Planned - not yet automated",
            "Not Run",
            "",
            "",
        ])

    style_workbook(workbook)
    path.parent.mkdir(parents=True, exist_ok=True)
    workbook.save(path)
    return counts

def append_actions_summary(title, path, counts):
    summary_path = os.getenv("GITHUB_STEP_SUMMARY")
    if not summary_path:
        return
    total = sum(counts.values())
    lines = [
        f"## {title}",
        "",
        f"**{total} planned test cases** across **{len(counts)} categories**.",
        "",
        "| Category | Planned cases | Execution status |",
        "|---|---:|---|",
    ]
    lines.extend(f"| {name} | {count} | Not run - test plan |" for name, count in counts.items())
    lines.extend([
        "",
        "> These are planned test cases, not executed test results. The automated CI job status is shown separately above.",
        "",
        f"Excel workbook: `{path.as_posix()}`",
        "",
    ])
    with open(summary_path, "a", encoding="utf-8") as output:
        output.write("\n".join(lines))

web_path = Path("selenium-tests/selenium-test-cases.xlsx")
app_path = Path("appium-tests/appium-test-cases.xlsx")

web_counts = generate(web_path, "WEB", WEB_GROUPS, "Web frontend")
app_counts = generate(app_path, "APP", APP_GROUPS, "Android mobile app")

job_name = os.getenv("GITHUB_JOB", "")
if job_name == "selenium":
    append_actions_summary("Selenium Web E2E Test Plan", web_path, web_counts)
elif job_name == "appium":
    append_actions_summary("Appium Android E2E Test Plan", app_path, app_counts)

print(f"Generated {sum(web_counts.values())} planned Selenium cases and {sum(app_counts.values())} planned Appium cases.")
print("Reports clearly distinguish planned cases from executed automation.")
