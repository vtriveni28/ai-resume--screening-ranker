"""Sentence-transformer based semantic similarity."""

from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

# Load model only once
_MODEL = None


def _get_model(model_name: str = "all-MiniLM-L6-v2"):
    global _MODEL

    if _MODEL is None:
        _MODEL = SentenceTransformer(model_name)

    return _MODEL


def embedding_similarity(
    resume_text: str,
    jd_text: str,
    model_name: str | None = None,
) -> float:
    """
    Return semantic similarity score between resume and job description.

    Returns:
        float in range [0, 1]
    """

    if not resume_text.strip() or not jd_text.strip():
        return 0.0

    model = _get_model(model_name or "all-MiniLM-L6-v2")

    resume_embedding = model.encode(
        resume_text,
        convert_to_tensor=True,
    )

    jd_embedding = model.encode(
        jd_text,
        convert_to_tensor=True,
    )

    similarity = cos_sim(resume_embedding, jd_embedding).item()

    # cosine similarity (-1,1) → (0,1)
    similarity = (similarity + 1) / 2

    return round(float(similarity), 4)
