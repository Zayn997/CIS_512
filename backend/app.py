from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key here
openai.api_key = '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'

@app.route('/generateQuestions', methods=['POST'])
def generate_questions():
    data = request.json
    topic = data.get('topic')

    try:
        all_questions = []

        # Generate 10 different questions
        for i in range(3):
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Generate a UX interview question about: {topic}"},
                ],
                # max_tokens=100,
                temperature=0.7
            )
            main_question = response.choices[0].message.content.strip()

            # Generate 4 similar questions for each main question
            similar_questions = [main_question]
            for j in range(3):
                similar_response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": f"Generate a similar question to: {main_question}"},
                    ],
                    # max_tokens=100,
                    temperature=0.7
                )
                similar_questions.append(similar_response.choices[0].message.content.strip())

            all_questions.append(similar_questions)

        return jsonify({'allQuestions': all_questions})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analyzeSentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text')

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"The following text: \"{text}\" expresses a sentiment that is:"},
            ],
            temperature=0.0
        )
        sentiment = response.choices[0].message.content.strip()
        return jsonify({'sentiment': sentiment})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/extractKeywords', methods=['POST'])
def extract_keywords():
    data = request.json
    answer = data.get('answer')

    try:
        response = openai.ChatCompletion.create(
           model="gpt-3.5-turbo",
              messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Extract 5 keywords for analysing characteristic features from the following text: {answer}"},
              ],
              # max_tokens=100,
              temperature=0.3
        )
        # Assuming the response returns a newline-separated string of keywords prefixed with numbers.
        keyword_string = response.choices[0].message.content.strip()
        # Split the string by newlines and then by the period to extract just the keyword
        keywords = [kw.strip().split('. ')[1] for kw in keyword_string.split('\n') if '. ' in kw]
        return jsonify({'keywords': keywords})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/summarizeAnswers', methods=['POST'])
def summarize_answers():
    data = request.json
    initial = data.get('text')
    if not isinstance(initial, list):
        return jsonify({'error': 'Expected a list of text strings'}), 400
    combined_text = " ".join(initial)

    try:
        response = openai.ChatCompletion.create(
           model="gpt-3.5-turbo",
              messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Analysis his answers and summarize his pinpoints : {combined_text}"},
              ],
              max_tokens=150,
              temperature=0.5
        )
        summary  = response.choices[0].message.content.strip()
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
