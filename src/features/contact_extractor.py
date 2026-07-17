"""Extract contact information (name, email, phone, LinkedIn, GitHub)."""

import re

EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")

PHONE_RE = re.compile(
    r"(?:\+?\d{1,3}[\s-]?)?\d{10}"
)

LINKEDIN_RE = re.compile(
    r"linkedin\.com/in/[a-zA-Z0-9_-]+",
    re.IGNORECASE,
)

GITHUB_RE = re.compile(
    r"github\.com/[a-zA-Z0-9_-]+",
    re.IGNORECASE,
)


def extract_contact(text: str) -> dict:
    """
    Extract basic contact details from resume text.
    """

    lines = [line.strip() for line in text.split("\n") if line.strip()]

    name = None

    # Usually first line is the candidate name
    if lines:
        first_line = lines[0]

        if len(first_line.split()) <= 5:
            name = first_line.title()

    email = EMAIL_RE.search(text)
    phone = PHONE_RE.search(text)
    linkedin = LINKEDIN_RE.search(text)
    github = GITHUB_RE.search(text)

    return {
        "name": name,
        "email": email.group(0) if email else None,
        "phone": phone.group(0) if phone else None,
        "linkedin": linkedin.group(0) if linkedin else None,
        "github": github.group(0) if github else None,
    }
