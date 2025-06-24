# pullear la imagen del docker: 
# docker run -p 8108:8108 -v C:\typesense-data:/data typesense/typesense:0.25.2 --data-dir /data --api-key=xyz --listen-port=8108

# librerias a instalar: pip install flask typesense

# Configuración de Typesense
from flask import Flask, jsonify, request
import typesense
import json
import os

app = Flask(__name__)

# Configuración de Typesense
client = typesense.Client({
    "nodes": [{"host": "localhost", "port": "8108", "protocol": "http"}],
    "api_key": "xyz",
    "connection_timeout_seconds": 2
})

# Crear colección si no existe
def crear_coleccion():
    schema = {
        "name": "recetas",
        "fields": [
            {"name": "orden", "type": "int32"},
            {"name": "titulo", "type": "string"},
            {"name": "descripcion", "type": "string"},
            {"name": "ingredientes", "type": "string[]", "facet": True},
            {"name": "categoria", "type": "string", "facet": True},
            {"name": "dificultad", "type": "string", "facet": True},
            {"name": "url", "type": "string"},
            {"name": "imagen_url", "type": "string"},
            {"name": "porciones", "type": "string"},
            {"name": "tipoCocina", "type": "string", "facet": True},
            {"name": "dieta", "type": "string", "facet": True},
            {"name": "tipoPlato", "type": "string", "facet": True},
            {"name": "tiempo", "type": "string"},
            {"name": "instrucciones", "type": "string"}
        ],
        "default_sorting_field": "orden"
    }

    try:
        client.collections["recetas"].retrieve()
        print("✅ Colección ya existe.")
    except typesense.exceptions.ObjectNotFound:
        print("📁 Creando colección 'recetas'...")
        client.collections.create(schema)

# Leer recetas desde archivo JSON
def cargar_recetas_desde_json(path=r"C:\Users\nicol\Documents\GitHub\Proyecto_BRI\backend\recetas.json"):
    try:
        with open(path, "r", encoding="utf-8") as file:
            recetas = json.load(file)
            for receta in recetas:
                receta["id"] = str(receta["id"])
            return recetas
    except Exception as e:
        print(f"❌ Error leyendo JSON: {e}")
        return []


# Endpoint para cargar recetas en Typesense
@app.route("/cargar", methods=["POST"])
def cargar_recetas():
    crear_coleccion()
    recetas = cargar_recetas_desde_json()
    errores = []
    cargadas = 0

    for receta in recetas:
        try:
            client.collections["recetas"].documents.upsert(receta)
            cargadas += 1
        except Exception as e:
            errores.append({"titulo": receta.get("titulo", "Sin título"), "error": str(e)})

    return jsonify({"cargadas": cargadas, "errores": errores})

# Endpoint para buscar recetas
@app.route("/buscar", methods=["GET"])
def buscar():
    q = request.args.get("q", "")
    categoria = request.args.get("categoria")
    dificultad = request.args.get("dificultad")

    filtros = []
    if categoria:
        filtros.append(f"categoria:={categoria}")
    if dificultad:
        filtros.append(f"dificultad:={dificultad}")

    filter_by = " && ".join(filtros) if filtros else ""

    try:
        results = client.collections["recetas"].documents.search({
            "q": q,
            "query_by": "titulo,descripcion,ingredientes,categoria",
            "filter_by": filter_by,
            "sort_by": "orden:asc",
            "per_page": 10
        })
        return jsonify(results["hits"])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/v1/buscar", methods=["GET"])
def filtrar_recetas():
    filtros = []
    q = request.args.get("q", "*")  # búsqueda libre o todo si vacío

    campos_filtro = [
        "categoria", "dificultad", "tipoCocina",
        "dieta", "tipoPlato", "porciones", "tiempo"
    ]

    for campo in campos_filtro:
        valor = request.args.get(campo)
        if valor:
            filtros.append(f'{campo}:="{valor}"')

    ingredientes = request.args.getlist("ingrediente")
    for ing in ingredientes:
        filtros.append(f'ingredientes:={json.dumps(ing)}')

    filter_by = " && ".join(filtros) if filtros else ""

    try:
        resultados = client.collections["recetas"].documents.search({
            "q": q,
            "query_by": "titulo,descripcion,ingredientes",
            "filter_by": filter_by,
            "sort_by": "orden:asc"
            # <-- no paginación
        })
        return jsonify(resultados["hits"])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/categorias", methods=["GET"])
def obtener_categorias():
    try:
        resultados = client.collections["recetas"].documents.facets.retrieve({
            "facet_by": "categoria"
        })
        return jsonify(resultados.get("facet_counts", []))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/similares/<id>", methods=["GET"])
def recetas_similares(id):
    try:
        receta = client.collections["recetas"].documents[id].retrieve()
        categoria = receta["categoria"]
        resultados = client.collections["recetas"].documents.search({
            "q": categoria,
            "query_by": "categoria",
            "filter_by": f'id:!={id}',
            "per_page": 5
        })
        return jsonify(resultados["hits"])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
