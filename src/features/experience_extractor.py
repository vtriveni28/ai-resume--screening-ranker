"""Extract work experience entries from resume text."""

import re


def extract_experience(text: str) -> list[dict]:
    """
    Extract internship/work experience from resume text.
    """

    experiences = []

    lines = [line.strip() for line in text.split("\n") if line.strip()]

    experience_section = False

    months = r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"

    for i, line in enumerate(lines):

        # Experience section start
        if line.upper() == "EXPERIENCE":
            experience_section = True
            continue

        # Stop at next section
        if experience_section and line.upper() in [
            "EDUCATION",
            "PROJECTS",
            "SKILLS",
            "CERTIFICATIONS",
            "ACHIEVEMENTS",
        ]:
            break

        if not experience_section:
            continue

        # Detect role
        if any(word in line.lower() for word in [
            "intern",
            "developer",
            "engineer",
            "analyst",
            "specialist",
        ]):

            role = line
            duration = ""
            description = []

            # Next line should contain dates
            if i + 1 < len(lines):

                next_line = lines[i + 1]

                if re.search(months, next_line):
                    duration = next_line

            # Collect bullet points
            j = i + 2

            while j < len(lines):

                current = lines[j]

                if current.upper() in [
                    "EDUCATION",
                    "PROJECTS",
                    "SKILLS",
                    "CERTIFICATIONS",
                    "ACHIEVEMENTS",
                ]:
                    break

                if current.startswith("-"):
                    description.append(current[1:].strip())

                j += 1

            experiences.append(
                {
                    "role": role,
                    "duration": duration,
                    "description": " ".join(description),
                }
            )

    return experiences