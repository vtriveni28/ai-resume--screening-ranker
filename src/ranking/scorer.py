"""Composite candidate-vs-JD scorer."""

from dataclasses import dataclass

from src.features import CandidateProfile

from src.similarity.hybrid_scorer import hybrid_similarity

@dataclass
class ScoreBreakdown:
    skills: float
    experience: float
    education: float
    semantic: float
    total: float


DEFAULT_WEIGHTS = {
    "skills": 0.45,
    "experience": 0.30,
    "education": 0.15,
    "semantic": 0.10,
}


def score_candidate(
    profile: CandidateProfile,
    jd_text: str,
    jd_required_skills: list[str] | None = None,
    weights: dict[str, float] | None = None,
) -> ScoreBreakdown:
    """
    Compute candidate score between 0 and 1.
    """

    if weights is None:
        weights = DEFAULT_WEIGHTS

    if jd_required_skills is None:
        jd_required_skills = []

    # -------------------------
    # Skills Score
    # -------------------------
    candidate_skills = {s.lower() for s in profile.skills}
    jd_skills = {s.lower() for s in jd_required_skills}

    if jd_skills:
        matched = candidate_skills.intersection(jd_skills)
        skills_score = len(matched) / len(jd_skills)
    else:
        skills_score = 0.0

    # -------------------------
    # Experience Score
    # -------------------------
    if profile.experience:
        experience_score = 1.0
    else:
        experience_score = 0.0

    # -------------------------
    # Education Score
    # -------------------------
    if profile.education:
        education_score = 1.0
    else:
        education_score = 0.0

    # -------------------------
    # Semantic Score
    # -------------------------
    semantic_score = hybrid_similarity(
    profile.raw_text,
    jd_text,
    )

    # -------------------------
    # Final Score
    # -------------------------
    total = (
        skills_score * weights["skills"]
        + experience_score * weights["experience"]
        + education_score * weights["education"]
        + semantic_score * weights["semantic"]
    )

    return ScoreBreakdown(
        skills=round(skills_score, 2),
        experience=round(experience_score, 2),
        education=round(education_score, 2),
        semantic=round(semantic_score, 2),
        total=round(total, 2),
    )
