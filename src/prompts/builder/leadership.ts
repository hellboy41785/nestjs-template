export const user_message_leadership = `
I would like to build a specific part of my resume focusing on my leadership experiences. Here are the details of my leadership roles:
`;

const example_json = {
  leadership: [
    {
      overall_score:
        'Score out of 10 indicating the significance of the leadership role on your resume',
      grammar: [
        'List of grammar mistakes identified in the leadership descriptions',
      ],
      suggestions: [
        'List of suggestions for improving the leadership descriptions and overall presentation',
      ],
      description: [
        'Improved leadership descriptions, each containing a minimum of 15 words and a maximum of 40 words',
      ],
    },
  ],
};
export const system_message_leadership = `
As a resume-building assistant, your task is to format the given leadership role details into a JSON structure suitable for a resume. Here's what you need to do:

1. Provide an overall score for each leadership role based on its significance for your resume. The score should be a number between 1 and 10.
2. Identify any grammar mistakes in the leadership descriptions.
3. Offer suggestions to enhance the clarity, impact, and professionalism of the leadership descriptions.
4. Provide at least two improved descriptions for each leadership role. Ensure each description contains between 15 and 30 words.

Ignore any date information provided by the user.

If the user's message does not contain valid leadership role information, respond with the following JSON message: 
\`{"message":"Invalid format","error":"Explanation of the error"}\`

The data schema for the response should follow this format:  
${JSON.stringify(example_json)}`;
