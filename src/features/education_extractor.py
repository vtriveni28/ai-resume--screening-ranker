"""Extract education details from resume."""

import re
import spacy

# -----------------------------
# Load spaCy model safely
# -----------------------------
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    from spacy.cli import download

    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")


def is_degree(line: str):
    """
    Returns True only if the line actually looks like a degree.
    """

    line = line.lower().strip()

    degree_keywords = [
        "b.tech",
        "btech",
        "b.e.",
        "b.e",
        "bachelor",
        "m.tech",
        "mtech",
        "master",
        "mba",
        "phd",
        "b.sc",
        "bsc",
        "m.sc",
        "msc",
        "bca",
        "mca",
        "diploma",
        "intermediate",
        "ssc",
    ]

    return any(keyword in line for keyword in degree_keywords)


def extract_education(text: str):

    education = []

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    education_headers = {
        "EDUCATION",
        "ACADEMICS",
        "ACADEMIC BACKGROUND",
        "EDUCATIONAL QUALIFICATION",
        "QUALIFICATION",
    }

    stop_headers = {
        "SKILLS",
        "PROJECTS",
        "WORK EXPERIENCE",
        "EXPERIENCE",
        "INTERNSHIPS",
        "CERTIFICATIONS",
        "ACHIEVEMENTS",
        "TECHNICAL SKILLS",
        "LANGUAGES",
    }

    institution_keywords = [
        "college",
        "university",
        "institute",
        "institution",
        "school",
        "academy",
        "campus",
    ]

    year_pattern = re.compile(
        r"""
        (?:
            (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)?
            \.?\s*
            (?:19|20)\d{2}
            \s*[-–]\s*
            (?:
                (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)?
                \.?\s*
                (?:19|20)\d{2}
                |
                Present
                |
                Current
            )
        )
        |
        Expected\s+Graduation[:\s-]*
        (?:19|20)\d{2}
        |
        (?:19|20)\d{2}
        """,
        re.IGNORECASE | re.VERBOSE,
    )

    cgpa_pattern = re.compile(
        r"(?:CGPA|GPA|Percentage|Percent|Marks)\s*[:\-]?\s*(\d+(?:\.\d+)?)",
        re.IGNORECASE,
    )

    in_education = False
    seen_degrees = set()

    for i, line in enumerate(lines):

        upper = line.upper()

        if upper in education_headers:
            in_education = True
            continue

        if in_education and upper in stop_headers:
            break

        if not in_education:
            continue

        if not is_degree(line):
            continue

        degree = line.strip()

        # Skip if line is actually a college name
        if any(word in degree.lower() for word in institution_keywords):
            continue

        # Remove duplicate degrees
        if degree.lower() in seen_degrees:
            continue

        seen_degrees.add(degree.lower())

        institution = ""
        year = ""
        cgpa = None

        block = lines[i : min(i + 5, len(lines))]

        # -------- Institution --------

        for current in block:

            if current.lower() == degree.lower():
                continue

            if any(word in current.lower() for word in institution_keywords):
                institution = current
                break

        # spaCy fallback
        if not institution:

            for current in block:

                if current.lower() == degree.lower():
                    continue

                doc = nlp(current)

                for ent in doc.ents:
                    if ent.label_ == "ORG":
                        institution = ent.text
                        break

                if institution:
                    break

        # -------- Year --------

        for current in block:

            match = year_pattern.search(current)

            if match:
                year = " ".join(match.group(0).split())
                break

        # -------- CGPA --------

        for current in block:

            match = cgpa_pattern.search(current)

            if match:
                cgpa = float(match.group(1))
                break

        education.append(
            {
                "degree": degree,
                "institution": institution,
                "cgpa": cgpa,
                "year": year,
            }
        )

    return education
