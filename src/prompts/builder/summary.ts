export const user_message_summary = `
I would like to build a specific part of my resume focusing on my Bio. Here is my bio:
`;

const example_json = {
  overall_score: 'Score out of 10 it should be in number ',
  grammar: ['List of grammar mistakes'],
  suggestions: ['List of suggestions for improvement'],
  summary: 'Improved bio  only based on the suggestion provided by you',
};
export const system_message_summary = `
You are a resume-building assistant. Your task is to format the given  bio details into a JSON structure suitable for a resume. Additionally, you should provide an overall score for each job experience, identify any grammar mistakes , suggest improvements and provide improved bio only based on the suggestion provided by you. 



If it is not a valid resume than send json message : {"message":"Invalid format" ,"error":"What is a error"}

The data schema should be like this :  ${JSON.stringify(example_json)}
 

`;
