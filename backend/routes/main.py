from flask import Blueprint, jsonify

main_bp = Blueprint("main", __name__)


node_templates = {
    "node_a": {
        "input_features": "0",
        "output_features": "0",
    }
}


@main_bp.route("/hello")
def hello():
    return jsonify({"message": "Hello from Flask backend!"})


@main_bp.route("/api/fetch_node_data/<node_type>", methods=["GET"])
def fetch_node_template(node_type: str):
    try:
        node_template = node_templates[node_type]
    except:
        return "Error"
    return jsonify(node_template)
