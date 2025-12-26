import os
import openai
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://api.a4f.co/v1",
    api_key=os.getenv("api_key"),
)

prompt_1 = "Create a single page comic or graphic novel covering an entire story of a boy who finds a lost key and goes on an adventure, relentlessly, to find a treasure at the end. The entire story, along with dialogues, must fit within one page of 6 [ ] 8 panels. You can create the characters and graphics based on any theme of your choice"  # gpt-image-1

prompt_2 = "Design a hyper-realistic scene of ['Penempatan Usang Ditebing Pergunungan,'] showcasing [a weathered wooden house teetering on the edge of a rugged cliff], viewed from a low angle. The house features a small balcony with laundry hanging out to dry, casting sharp shadows under the bright midday sun. Lush greenery envelops the base of the cliff, while the expansive landscape is mostly hidden by dense foliage. Although the day is clear, the scene evokes an eerie and isolated atmosphere, with sharp, high-contrast details amplifying the sense of desolation and solitude."  # flux-kontext

prompt_3 = "Capture the fleeting moment when strangers share a spontaneous laugh at a street corner in a bustling city. Focus on the joyful expressions, diverse clothing styles, and the vibrant, textured background of urban graffiti and bustling pedestrians. Use a Canon EOS R5 at 1/500s, f/2.8, ISO 400 to capture the motion and emotion vividly. The atmosphere should convey the energy and diversity of city life, with the warm hues of a setting sun casting long shadows"  # flux-kontext-pro

prompt_4 = "Photo realistic scene inspired by LOTR: [A tiny red dragon sleeps curled up in a nest on a medieval wizard's table]. Shot with a macro lens (f/2.8, 50mm) and a Canon EOSR5, the soft focus captures [the cozy morning light filtering through a nearby window]. The pastel colors and whimsical steam shapes enhance the serene atmosphere, evoking a DnD RPG setting. The image is rendered in 16K and 8K, highlighting [the intricate details and medieval charm]."  # flux-kontext-pro

prompt_5 = "a vintage style movie poster of men and women screaming with frustration with the title 'the day AI crashed'"  # Flux-kontext-pro

prompt_6="Hulk standing with the ladies of the indian village and gossiping"

try:
    response = client.images.generate(
        model="provider-4/imagen-3.5",
        prompt=prompt_6,
        n=1,
        response_format="url",
        size="1024x1024"
    )
    print("Image generation response:", response)
except Exception as e:
    print("Error generating image:", e)