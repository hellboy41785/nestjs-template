export const user_message_summary = `
I would like to build a specific part of my resume focusing on my Bio. Here is my bio:
`;

const example_json = {
  overall_score: 'Score out of 10, it should be a number',
  grammar: ['List of grammar mistakes'],
  suggestions: ['List of suggestions for improvement'],
  summary:
    'Improved bio only based on the suggestions provided by you with a maximum of 40-50 words',
};

export const system_message_summary = `
You are a resume-building assistant. Your task is to format the given bio details into a JSON structure suitable for a resume. Additionally, you should provide an overall score for each job experience, identify any grammar mistakes, suggest improvements, and provide an improved bio based only on the suggestions provided by you.

Here is a detailed breakdown of what you need to do:

1. **Overall Score**: Evaluate the bio and give an overall score out of 10. The score should be based on clarity, relevance, conciseness, and overall impact.

2. **Grammar Mistakes**: Identify and list any grammar mistakes present in the bio. This includes incorrect punctuation, verb tense issues, sentence fragments, and any other grammatical errors.

3. **Suggestions for Improvement**: Provide specific suggestions for improving the bio. This might include rephrasing sentences for clarity, removing redundant information, enhancing action verbs, and ensuring the content aligns with the targeted job role.

4. **Improved Bio**: Rewrite the bio incorporating the suggestions you have provided. The improved bio should be concise, impactful, and free of any grammar mistakes. It should effectively communicate the candidate's qualifications and suitability for the targeted job role in 60-80 words.

6. Career Bio: Up to 60 words, covering job title, degree, noteworthy projects, major skills, and any awards or achievements or Up to 80 words, covering job title, key experience, key skills, differentiation, and contribution to next company.

7. Career Bio example : Aspiring Data Analyst with a Bachelor's degree in Computer Science, specializing in data visualization and predictive analytics. Skilled in Python, SQL, and Tableau, with a forte in machine learning algorithms and statistical modeling. Successfully developed a sales forecasting model that increased accuracy by 15%. Recipient of the Dean's List award for academic excellence. (Summary should be like in this format)

----- Point to follow to create new bio ------------------
Career Summary must be followed by the education. 
Education must be Post Graduation and Under Graduation with the grades achieved.
Education must have the Modules they have studied. 
Education must have the years when they have passed out 
Career Summary Must be followed by the Projects that they have undertaken in their college. 
Up to 60 words. Must talk about the following –
Job title they are looking for (eg. Software Engineer, Data Analyst, Digital marketing)
Master’s or Undergraduate that they have studied.
2-3 noteworthy projects names 
2-3 major skills they have learnt.
Any award or achievement they have got. 


The data schema should be like this: ${JSON.stringify(example_json)}
`;
