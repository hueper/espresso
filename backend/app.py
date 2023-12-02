from flask import Flask, request, jsonify

app = Flask(__name__)

def sanitize_input(input_data):
    # Allow Italian phrases, numbers, and remove non-alphanumeric characters
    return ''.join(e for e in input_data if e.isalpha() or e.isdigit() or e.isspace())

@app.route('/api/expression', methods=['POST'])
def receive_expression():
    try:
        data = request.get_json()
        italian_phrase = sanitize_input(data.get('italian'))
        english_translation = ''

        # Construct the expression dictionary
        expression = {"italian": italian_phrase, "english": english_translation}

        # Append to expressions.json
        with open('../data/expressions.json', 'a', encoding='utf-8') as file:
            file.write(str(expression) + '\n')

        return jsonify({'message': 'Expression received successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
