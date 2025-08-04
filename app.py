import streamlit as st
import streamlit.components.v1 as components
import os

# Set page config
st.set_page_config(page_title="I LOVE YOU BUBU 💖", layout="wide")

# Load HTML
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Display HTML
components.html(html_content, height=2000, scrolling=True)
