"""Extract skills from resume text using a curated taxonomy + fuzzy matching."""

import json
from pathlib import Path

TAXONOMY_PATH = Path(__file__).parents[2] / "config" / "skills_taxonomy.json"


def load_taxonomy() -> dict[str, list[str]]:
    with open(TAXONOMY_PATH) as f:
        return json.load(f)


import re

def extract_skills(text: str) -> list[str]:
    """
    Extract skills from resume text using exact word-boundary matching.
    """

    taxonomy = load_taxonomy()

    all_skills = {
        skill.lower()
        for group in taxonomy.values()
        for skill in group
    }

    text_lower = text.lower()
    found = set()

    for skill in all_skills:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text_lower):
            found.add(skill)

    return sorted(found)