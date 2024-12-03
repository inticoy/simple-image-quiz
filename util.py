import os

# Define the folder containing the images
images_folder = "images"
script_file = "script.js"

# Filter only valid image files
valid_extensions = {".jpg", ".jpeg", ".png", ".gif"}
image_files = [
    f for f in os.listdir(images_folder)
    if os.path.isfile(os.path.join(images_folder, f)) and os.path.splitext(f)[1].lower() in valid_extensions
]

# Generate the JavaScript array with image files and answers
quiz_items_js = "const quizItems = [\n"
for image_file in image_files:
    # Get the file name without the extension
    file_name_without_extension = os.path.splitext(image_file)[0]
    quiz_items_js += f"    {{ image: '{images_folder}/{image_file}', answer: '{file_name_without_extension}' }},\n"
quiz_items_js += "];\n\n"

# Update the script.js file
with open(script_file, "r") as file:
    script_content = file.readlines()

# Find where to inject the new data
start_index = None
for i, line in enumerate(script_content):
    if line.strip().startswith("const quizItems"):
        start_index = i
        break

if start_index is not None:
    # Replace the old quizItems definition
    script_content[start_index] = quiz_items_js
else:
    # If the `const quizItems` definition is not found, prepend it to the file
    script_content.insert(0, quiz_items_js)

# Write back the updated content to script.js
with open(script_file, "w") as file:
    file.writelines(script_content)

print(f"Updated {script_file} with images from {images_folder}.")

