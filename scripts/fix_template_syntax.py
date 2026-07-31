import os

print("=== FIXING SYNTAX ERROR IN MARKDOWN HELPER ===")

with open("src/locationTemplates.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace inline single quotes with double quotes
content = content.replace("font-family:'Plus Jakarta Sans'", 'font-family:"Plus Jakarta Sans"')
content = content.replace("font-family:\\'Plus Jakarta Sans\\'", 'font-family:"Plus Jakarta Sans"')

with open("src/locationTemplates.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("[OK] Fixed syntax in locationTemplates.ts")
