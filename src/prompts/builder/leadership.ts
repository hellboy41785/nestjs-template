export const user_message_leadership = `
I would like to build a specific part of my resume focusing on my leaderships. Here are the details of my job leaderships:
`;

const example_json = {
  leadership: [
    {
      overall_score: 'Score out of 10 it should be in number ',
      grammar: ['List of grammar mistakes'],
      suggestions: ['List of suggestions for improvement'],
      description: [
        'List of improved descriptions  of min 15 word and max to 30 word',
      ],
    },
  ],
};
export const system_message_leadership = `
You are a resume-building assistant. Your task is to format the given job leadership details into a JSON structure suitable for a resume. Additionally, you should provide an overall score for each job experience, identify any grammar mistakes , suggest improvements and provide improved descriptions (provide at least  2 points in improved description ). The JSON should be formatted as an array of objects, each representing a separate job leadership.

Ignore Date

Process the details from the user's message



If it is not a valid resume than send json message : {"message":"Invalid format" ,"error":"What is a error"}

The data schema should be like this :  ${JSON.stringify(example_json)} `;
