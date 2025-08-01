#!/usr/bin/env python3
"""
💕 Script Romántico para Mi Novia
Genera efectos especiales y mensajes románticos para la web
"""

import json
import random
from datetime import datetime
import os

class RomanticEffects:
    def __init__(self):
        self.messages = [
            "💕 Te amo más que ayer, pero menos que mañana",
            "💖 Eres mi todo, mi razón de ser",
            "💝 Cada día contigo es un regalo del cielo",
            "💗 Tu sonrisa ilumina mi mundo",
            "💓 Eres mi inspiración y mi amor eterno",
            "💕 Contigo todo es posible",
            "💖 Gracias por ser exactamente quien eres",
            "💝 Eres mi compañera, mi mejor amiga, mi todo",
            "💗 Cada día que pasa, mi amor por ti crece más",
            "💓 Eres mi sueño hecho realidad"
        ]
        
        self.karol_g_songs = [
            {
                "title": "Ivonny Bonita",
                "album": "Mañana Será Bonito",
                "dedication": "Esta canción es especialmente para ti, mi Ivonny bonita",
                "special": True
            },
            {
                "title": "Mi Ex Tenía Razón",
                "album": "Mañana Será Bonito",
                "dedication": "Porque contigo todo es perfecto",
                "special": False
            },
            {
                "title": "TQG",
                "album": "Mañana Será Bonito",
                "dedication": "Tú y yo somos el mejor equipo",
                "special": False
            },
            {
                "title": "Amargura",
                "album": "Mañana Será Bonito",
                "dedication": "Contigo solo hay dulzura",
                "special": False
            },
            {
                "title": "Mañana Será Bonito",
                "album": "Mañana Será Bonito",
                "dedication": "Contigo cada día es más bonito",
                "special": False
            }
        ]
        
        self.moments = [
            {
                "title": "Nuestro Primer Beso",
                "description": "El momento que cambió nuestras vidas para siempre",
                "icon": "💕",
                "date": "Ese día especial"
            },
            {
                "title": "Amaneceres Juntos",
                "description": "Cada mañana contigo es un nuevo regalo",
                "icon": "🌅",
                "date": "Cada día"
            },
            {
                "title": "Bailando Karol G",
                "description": "Nuestras noches de baile y romance",
                "icon": "🎵",
                "date": "Nuestras noches"
            },
            {
                "title": "Futuro Juntos",
                "description": "Construyendo nuestros sueños lado a lado",
                "icon": "🌟",
                "date": "Nuestro futuro"
            },
            {
                "title": "Risas Compartidas",
                "description": "Los momentos más simples son los más especiales",
                "icon": "😊",
                "date": "Siempre"
            },
            {
                "title": "Aventuras Juntos",
                "description": "Descubriendo el mundo de la mano",
                "icon": "🌍",
                "date": "Nuestras aventuras"
            }
        ]

    def generate_random_message(self):
        """Genera un mensaje romántico aleatorio"""
        return random.choice(self.messages)

    def generate_special_effects(self):
        """Genera efectos especiales para la web"""
        effects = {
            "heart_colors": ["#ff69b4", "#ff1493", "#ffd700", "#ff6b6b", "#ffb6c1"],
            "animations": ["pulse", "bounce", "float", "shine", "sparkle"],
            "special_moments": self.moments,
            "karol_g_songs": self.karol_g_songs,
            "current_date": datetime.now().strftime("%Y-%m-%d"),
            "romantic_quote": self.generate_random_message()
        }
        return effects

    def create_romantic_config(self):
        """Crea un archivo de configuración romántico"""
        config = {
            "novia": {
                "nombre": "Mi Amor",
                "fecha_especial": "Día de la Novia",
                "mensaje_principal": "Te amo más que ayer, pero menos que mañana",
                "color_favorito": "#ff69b4",
                "artista_favorita": "Karol G",
                "album_favorito": "Mañana Será Bonito"
            },
            "web": {
                "titulo": "💕 Para Mi Novia - Karol G Special",
                "descripcion": "Una sorpresa especial con Karol G",
                "tema": "romántico",
                "colores": {
                    "primario": "#ff69b4",
                    "secundario": "#ff1493",
                    "claro": "#ffe4e1",
                    "dorado": "#ffd700"
                }
            },
            "efectos": self.generate_special_effects(),
            "mensajes_especiales": self.messages,
            "canciones_destacadas": [song for song in self.karol_g_songs if song["special"]]
        }
        
        with open('romantic_config.json', 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        print("💕 Configuración romántica creada exitosamente!")
        return config

    def generate_heart_ascii(self):
        """Genera corazones ASCII para la consola"""
        hearts = [
            "💕", "💖", "💝", "💗", "💓", "💞", "💟", "💕", "💖", "💝"
        ]
        return " ".join(hearts)

    def create_special_message(self):
        """Crea un mensaje especial para la consola"""
        message = f"""
{self.generate_heart_ascii()}
💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕
💕                                                                  💕
💕                    PARA MI NOVIA ESPECIAL                        💕
💕                                                                  💕
💕              Esta web fue creada con mucho amor                  💕
💕                    para el día de la novia                       💕
💕                                                                  💕
💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕💕
{self.generate_heart_ascii()}

Mensaje especial: {self.generate_random_message()}
Fecha: {datetime.now().strftime("%d/%m/%Y")}
Hora: {datetime.now().strftime("%H:%M:%S")}

Con todo mi amor ❤️
        """
        return message

def main():
    """Función principal"""
    print("💕 Iniciando generador de efectos románticos...")
    
    romantic = RomanticEffects()
    
    # Crear configuración
    config = romantic.create_romantic_config()
    
    # Mostrar mensaje especial
    print(romantic.create_special_message())
    
    # Mostrar canciones de Karol G
    print("\n🎵 Canciones de Karol G incluidas:")
    for song in romantic.karol_g_songs:
        star = "⭐" if song["special"] else "🎵"
        print(f"{star} {song['title']} - {song['album']}")
        print(f"   Dedicación: {song['dedication']}")
    
    # Mostrar momentos especiales
    print("\n💖 Momentos especiales incluidos:")
    for moment in romantic.moments:
        print(f"{moment['icon']} {moment['title']}")
        print(f"   {moment['description']}")
    
    print(f"\n💕 ¡Proyecto romántico completado con éxito!")
    print("💕 ¡Tu novia va a amar esta sorpresa!")

if __name__ == "__main__":
    main() 