#!/bin/bash

echo "🎵 Verificando configuración de audio para Karol G..."
echo "=================================================="

# Verificar si existe la carpeta de audio
if [ -d "public/audio" ]; then
    echo "✅ Carpeta public/audio existe"
else
    echo "❌ Carpeta public/audio no existe"
    echo "Creando carpeta..."
    mkdir -p public/audio
    echo "✅ Carpeta creada"
fi

# Contar archivos MP3
mp3_count=$(ls public/audio/*.mp3 2>/dev/null | wc -l)
echo "📊 Archivos MP3 encontrados: $mp3_count/20"

# Lista de archivos esperados
expected_files=(
    "ivonny-bonita.mp3"
    "la-reina-presenta.mp3"
    "papasito.mp3"
    "latina-foreva.mp3"
    "dile-luna.mp3"
    "cuando-me-muera-te-olvido.mp3"
    "coleccionando-heridas.mp3"
    "un-gatito-me-llamo.mp3"
    "amiga-mia.mp3"
    "bandida-entrenada.mp3"
    "ese-hombre-es-malo.mp3"
    "a-su-boca-la-amo.mp3"
    "verano-rosa.mp3"
    "no-puedo-vivir-sin-el.mp3"
    "tu-perfume.mp3"
    "fkn-movie.mp3"
    "se-puso-linda.mp3"
    "viajando-por-el-mundo.mp3"
    "si-antes-te-hubiera-conocido.mp3"
    "tropicoqueta.mp3"
)

echo ""
echo "🔍 Verificando archivos específicos:"
echo "===================================="

missing_files=0
for file in "${expected_files[@]}"; do
    if [ -f "public/audio/$file" ]; then
        size=$(ls -lh "public/audio/$file" | awk '{print $5}')
        echo "✅ $file ($size)"
    else
        echo "❌ $file (FALTANTE)"
        missing_files=$((missing_files + 1))
    fi
done

echo ""
echo "📋 Resumen:"
echo "==========="

if [ $missing_files -eq 0 ]; then
    echo "🎉 ¡PERFECTO! Todos los archivos están presentes"
    echo "🚀 Puedes iniciar el servidor con: npm start"
    echo "🌐 Abre: http://localhost:3000"
    echo "💕 ¡Tu novia va a amar la música local!"
else
    echo "⚠️  Faltan $missing_files archivos"
    echo ""
    echo "📥 Para descargar las canciones:"
    echo "1. Ve a y2mate.com"
    echo "2. Busca cada canción de Karol G del álbum 'Tropicoqueta'"
    echo "3. Descarga en MP3 con buena calidad"
    echo "4. Renombra exactamente como se muestra arriba"
    echo "5. Coloca en la carpeta public/audio/"
    echo ""
    echo "💡 Consejos:"
    echo "- Usa 128kbps o más de calidad"
    echo "- Solo archivos MP3"
    echo "- Nombres exactos (sin espacios)"
fi

echo ""
echo "🎵 Lista de canciones del álbum 'Tropicoqueta':"
echo "================================================"
echo "1. ⭐ Ivonny Bonita (Destacada)"
echo "2. 👑 La Reina Presenta"
echo "3. 💕 Papasito"
echo "4. 🌟 LATINA FOREVA"
echo "5. 🌙 Dile Luna"
echo "6. 💔 Cuando Me Muera Te Olvido"
echo "7. 🩹 Coleccionando Heridas"
echo "8. 🐱 Un Gatito Me Llamó"
echo "9. 👯‍♀️ Amiga Mía"
echo "10. 🦹‍♀️ Bandida Entrenada"
echo "11. 👿 Ese Hombre Es Malo"
echo "12. 💋 A Su Boca La Amo"
echo "13. 🌸 Verano Rosa"
echo "14. 💔 No Puedo Vivir Sin Él"
echo "15. 🌹 Tu Perfume"
echo "16. 🎬 FKN Movie"
echo "17. 💅 Se Puso Linda"
echo "18. ✈️ Viajando Por El Mundo"
echo "19. 🌟 Si Antes Te Hubiera Conocido"
echo "20. 🎵 Tropicoqueta"

echo ""
echo "💕 ¡Dedicado con amor para tu novia!" 