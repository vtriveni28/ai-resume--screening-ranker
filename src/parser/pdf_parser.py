"""PDF resume parser."""

import fitz


def parse_pdf(file_path: str) -> str:
    """
    Extract raw text from a PDF resume.

    Args:
        file_path: Path to PDF file.

    Returns:
        Raw extracted text.
    """

    pages = []

    with fitz.open(file_path) as pdf:
        for page in pdf:
            text = page.get_text("text")
            if text:
                pages.append(text)

    return "\n".join(pages)