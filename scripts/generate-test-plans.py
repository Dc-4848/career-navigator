from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

web_groups = [
("Authentication","Login form rendering","Open login and verify email/password inputs render."),
("Authentication","Valid login","Use a dedicated E2E account and verify authenticated landing page."),
("Authentication","Invalid password","Submit an incorrect password and verify safe rejection."),
("Authentication","Unknown account","Submit an unknown account and verify generic failure."),
("Authentication","Empty email","Submit without email and verify required validation."),
("Authentication","Empty password","Submit without password and verify required validation."),
("Authentication","Malformed email","Submit malformed email and verify validation."),
("Authentication","Password visibility","Toggle password visibility and verify masking state."),
("Authentication","Logout","Log out and verify protected route access is denied."),
("Authorization","Protected route","Open a protected route without a session and verify redirect/denial."),
("Navigation","Primary navigation","Open a primary navigation destination and verify route."),
("Navigation","Browser back","Use browser back and verify expected prior page."),
("Navigation","Browser forward","Use browser forward and verify expected next page."),
("Navigation","Nested route refresh","Refresh a nested route and verify the page renders."),
("Dashboard","Dashboard rendering","Open dashboard and verify key sections render."),
("Jobs","Job listing","Open jobs and verify cards or rows render."),
("Jobs","Job search","Search a known keyword and verify matching results."),
("Jobs","Empty search results","Search unmatched text and verify empty state."),
("Jobs","Filter jobs","Apply a filter and verify result set changes."),
("Jobs","Clear filters","Clear filters and verify default result set."),
("Jobs","Job details","Open a job card and verify details render."),
("Jobs","Pagination","Move to next page when pagination is available."),
("Profile","Profile view","Open profile and verify profile data renders."),
("Profile","Profile validation","Submit invalid profile data and verify validation."),
("Roadmap","Roadmap view","Open roadmap and verify milestones render."),
("Hackathons","Hackathon listing","Open hackathons and verify list renders."),
("Forms","Required fields","Submit a required form empty and verify validation."),
("Accessibility","Keyboard navigation","Navigate key controls using keyboard only."),
("Accessibility","Accessible labels","Verify inputs and controls have accessible names."),
("Responsive","Mobile viewport","Verify layout at a narrow viewport."),
("Error handling","Unknown route","Open an unknown route and verify not-found behavior."),
("Security UI","Sensitive data masking","Verify password and secret-like values are not exposed.")
]
app_groups = [
("Launch","Cold launch","Launch app and verify first screen renders."),
("Launch","Warm launch","Background and resume app; verify stable state."),
("Authentication","Valid login","Sign in with E2E credentials and verify authenticated screen."),
("Authentication","Invalid login","Submit invalid credentials and verify safe failure."),
("Authentication","Empty credentials","Submit empty credentials and verify validation."),
("Authentication","Logout","Log out and verify protected content is inaccessible."),
("Navigation","Primary navigation","Open primary navigation destinations and verify screens."),
("Navigation","Back navigation","Use device back and verify expected screen."),
("Jobs","Job listing","Open jobs and verify list content."),
("Jobs","Job search","Search a keyword and verify matching results."),
("Jobs","Job filters","Apply an available filter and verify result changes."),
("Jobs","Job details","Open a job card and verify detail screen."),
("Profile","Profile view","Open profile and verify profile content."),
("Profile","Profile validation","Submit invalid profile data and verify validation."),
("Roadmap","Roadmap view","Open roadmap and verify milestones."),
("Roadmap","Progress interaction","Update a test milestone and verify state."),
("Hackathons","Hackathon listing","Open hackathons and verify list."),
("Network","Offline behavior","Disable network in test setup and verify graceful handling."),
("Lifecycle","Resume app","Background then resume and verify no crash."),
("Accessibility","Accessible controls","Verify key controls expose accessibility labels."),
("Visual","Small screen layout","Verify content fits the device viewport."),
("Security","Sensitive data masking","Verify passwords and secret values are not exposed.")
]

def generate(path, prefix, groups, platform):
    wb = Workbook()
    summary = wb.active
    summary.title = "Test Summary"
    summary.append(["Metric","Value"])
    for row in [
        ("Test Suite", f"Career Navigator {platform} E2E Test Plan"),
        ("Platform", platform),
        ("Planned Test Cases", 300),
        ("Executed", 0), ("Passed", 0), ("Failed", 0), ("Blocked", 0),
        ("Not Run", 300), ("Pass Rate", "N/A until execution"),
        ("Important", "These are planned test cases, not executed test results.")
    ]: summary.append(list(row))
    details = wb.create_sheet("Test Cases")
    details.append(["Test Case ID","Module","Test Scenario","Test Description","Preconditions","Test Steps","Expected Result","Priority","Test Type","Automation Status","Execution Status","Actual Result","Defect ID"])
    for i in range(300):
        module, scenario, description = groups[i % len(groups)]
        variation = i // len(groups) + 1
        details.append([
            f"{prefix}-{i+1:03d}", module,
            scenario if variation == 1 else f"{scenario} - Variation {variation}",
            description,
            "Test build deployed; dedicated test account and test data available.",
            "1. Launch application. 2. Navigate to feature. 3. Perform action. 4. Observe result.",
            "Expected behavior occurs without crash, unintended data change, or sensitive-data exposure.",
            ["High","Medium","Low"][i % 3], "End-to-End",
            "Planned; configure selectors/accessibility IDs", "Not Run", "", ""
        ])
    for sheet in wb.worksheets:
        sheet.freeze_panes = "A2"
        sheet.auto_filter.ref = sheet.dimensions
        for cell in sheet[1]:
            cell.font = Font(bold=True, color="FFFFFF")
            cell.fill = PatternFill("solid", fgColor="1F4E78")
        for col in range(1, sheet.max_column + 1):
            lengths = [len(str(sheet.cell(r,col).value or "")) for r in range(1, min(sheet.max_row, 60)+1)]
            sheet.column_dimensions[get_column_letter(col)].width = min(max(max(lengths+[12])+2,14),48)
        for row in sheet.iter_rows():
            for cell in row:
                cell.alignment = Alignment(wrap_text=True, vertical="top")
    path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(path)

generate(Path("selenium-tests/selenium-test-cases.xlsx"), "WEB", web_groups, "Web frontend")
generate(Path("appium-tests/appium-test-cases.xlsx"), "APP", app_groups, "Android mobile app")
print("Generated 300 Selenium and 300 Appium planned test cases.")
