from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key here
openai.api_key = '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'
user_answers = []


# @app.route('/generateQuestions', methods=['POST'])
# def generate_questions():
#     data = request.json
#     topic = data.get('topic')

#     try:
#         all_questions = []

#         # Generate 10 different questions
#         for i in range(3):
#             response = openai.ChatCompletion.create(
#                 model="gpt-3.5-turbo",
#                 messages=[
#                     {"role": "system", "content": "You are a helpful assistant."},
#                     {"role": "user", "content": f"Based on the user's answer of last question to asking them once a time, if they type no detailed, ask them to give more details no more than 2 times,Generate a UX interview question about: {topic}"},
#                 ],
#                 # max_tokens=100,
#                 temperature=0.7
#             )
#             main_question = response.choices[0].message.content.strip()

#             # Generate 4 similar questions for each main question
#             similar_questions = [main_question]
#             for j in range(3):
#                 similar_response = openai.ChatCompletion.create(
#                     model="gpt-3.5-turbo",
#                     messages=[
#                         {"role": "system", "content": "You are a helpful assistant."},
#                         {"role": "user", "content": f"Generate a similar question to: {main_question}"},
#                     ],
#                     # max_tokens=100,
#                     temperature=0.7
#                 )
#                 similar_questions.append(similar_response.choices[0].message.content.strip())

#             all_questions.append(similar_questions)

#         return jsonify({'allQuestions': all_questions})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
@app.route('/generateQuestions', methods=['POST'])
def generate_questions():
    data = request.json
    topic = data.get('topic')
    last_answer = data.get('last_answer')  # Get the last answer from the user
    ask_for_details = data.get('ask_for_details', False)  # A flag to indicate whether to ask for more details

    try:
        if last_answer and ask_for_details:
            # If the last answer is provided and not detailed enough, ask for more details
            message = f"The user's last answer was: \"{last_answer}\". It seems brief. Could you ask a follow-up question to get more details?"
        else:
            # Generate a new UX interview question
            message = f"Generate a UX interview question about: {topic}"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message},
            ],
            temperature=0.7
        )
        question = response.choices[0].message.content.strip()
        return jsonify({'question': question})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyzeSentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text')
    user_answers.append(text)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Use number range from 0.1 to 1 to summarize the user's sentiment more positive more higher, more negative more lower,only show number value,The following text: \"{text}\" expresses a sentiment number that is:"},
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
    user_answers.append(answer)

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
    
@app.route('/generatePriorityMatrix', methods=['POST'])
def generate_priority_matrix():
    combined_answers = " ".join(user_answers)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Based on the user's answers: {combined_answers}, generate a priority matrix for UX research,just show the json form of matrix"},
            ],
            temperature=0.5
        )
        priority_matrix = response.choices[0].message.content.strip()
        return jsonify({'priorityMatrix': priority_matrix})
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
    
@app.route('/generategreetings', methods=['POST'])
def generate_greetings():
    data = request.json
    personalInfo = data.get('personalInfo')

    try:
        response = openai.ChatCompletion.create(
           model="gpt-3.5-turbo",
              messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"base on his text: {personalInfo}, guess his name and show greating to him and tell our goal is for UX research,just need to show your results,don't need to show how to guess"},
              ],
              max_tokens=105,
              temperature=0.5
        )
        personalInfo = response.choices[0].message.content.strip()
        return jsonify({'personalInfo': personalInfo})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
