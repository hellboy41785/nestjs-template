export const user_message = `
Please review my resume based on the following criteria and provide a score for each subcategory.

1. **Impact**
   - Quantifying Impact
   - Repetition
   - Weak Action Verbs
   - Tenses
   - No Responsibilities
   - Spelling

2. **Brevity**
   - Resume Length
   - Total Bullet Points
   - Use of Bullets
   - Bullet Point Length
   - Filler Words

3. **Style**
   - Sections
   - Buzzwords and Clichés
   - Dates
   - Personal Pronouns
   - Active Voice
   - Consistency

4. **Soft Skills**
   - Communication
   - Analytical Skills
   - Teamwork
   - Leadership
   - Drive and Initiative

Please evaluate each aspect and provide feedback along with scores for each subcategory. 
`;

const example_json = {
  name: 'Rahul',
  overall_score: 65,
  missing_word: [],
  word_to_avoid: [],

  impact: {
    overall_score: 60,
    quantifying_impact: {
      score: 8,
      feedback:
        'Good job quantifying your achievements, but try to include more metrics where possible.',
    },
    repetition: {
      score: 7,
      feedback:
        'There are a few instances of repeated phrases. Consider varying your language to keep the reader engaged.',
    },
    weak_action_verbs: {
      score: 6,
      feedback:
        'Some of the action verbs used are not very impactful. Use stronger verbs to better convey your accomplishments.',
    },
    tenses: {
      score: 9,
      feedback:
        'Your use of tenses is mostly correct, with only a few minor inconsistencies.',
    },
    no_responsibilities: {
      score: 8,
      feedback:
        'Responsibilities are well defined, but ensure every role includes clear, tangible responsibilities.',
    },
    spelling: {
      score: 10,
      feedback: 'No spelling errors detected. Excellent work!',
    },
  },
  brevity: {
    overall_score: 60,
    resume_length: {
      score: 7,
      feedback:
        'The resume length is reasonable, but some sections could be more concise.',
    },
    total_bullet_points: {
      score: 8,
      feedback:
        'The number of bullet points is appropriate, though some could be combined for brevity.',
    },
    use_of_bullets: {
      score: 9,
      feedback:
        'Great use of bullet points to break down information and enhance readability.',
    },
    bullet_point_length: {
      score: 6,
      feedback:
        'Some bullet points are too long. Aim for shorter, more concise points.',
    },
    filler_words: {
      score: 7,
      feedback:
        'A few filler words can be removed to make the content more impactful.',
    },
  },
  style: {
    overall_score: 60,
    sections: {
      score: 8,
      feedback:
        'The sections are well organized, but consider adding more visual distinction between them.',
    },
    buzzwords_cliches: {
      score: 6,
      feedback:
        'There are some buzzwords and clichés present. Try to use more specific language.',
    },
    dates: {
      score: 9,
      feedback: 'Dates are clearly and consistently formatted.',
    },
    personal_pronouns: {
      score: 10,
      feedback: 'No personal pronouns used, which is ideal for a resume.',
    },
    active_voice: {
      score: 8,
      feedback:
        'Mostly active voice is used, but there are a few passive constructions that could be revised.',
    },
    consistency: {
      score: 9,
      feedback:
        'The resume is consistent in formatting and style, with very few deviations.',
    },
  },
  soft_skills: {
    overall_score: 60,
    communication: {
      score: 8,
      feedback:
        'Your communication skills are well demonstrated, but a few points could be clearer.',
    },
    analytical: {
      score: 9,
      feedback:
        'Strong demonstration of analytical skills through various achievements.',
    },
    teamwork: {
      score: 7,
      feedback:
        'Teamwork is evident, but consider including more examples of collaborative success.',
    },
    leadership: {
      score: 8,
      feedback:
        'Good examples of leadership, but a couple more concrete examples would strengthen this section.',
    },
    drive_initiative: {
      score: 9,
      feedback:
        'Your drive and initiative are well highlighted throughout the resume.',
    },
  },
};

export const system_message = `
Evaluate the resume based on the provided criteria and score each subcategory on a scale of 1 to 10. Use the following structure for your evaluation:

1. **Impact**
   - Quantifying Impact: [Score]
     Feedback: [Your feedback here]
   - Repetition: [Score]
     Feedback: [Your feedback here]
   - Weak Action Verbs: [Score]
     Feedback: [Your feedback here]
   - Tenses: [Score]
     Feedback: [Your feedback here]
   - No Responsibilities: [Score]
     Feedback: [Your feedback here]
   - Spelling: [Score]
     Feedback: [Your feedback here]

2. **Brevity**
   - Resume Length: [Score]
     Feedback: [Your feedback here]
   - Total Bullet Points: [Score]
     Feedback: [Your feedback here]
   - Use of Bullets: [Score]
     Feedback: [Your feedback here]
   - Bullet Point Length: [Score]
     Feedback: [Your feedback here]
   - Filler Words: [Score]
     Feedback: [Your feedback here]

3. **Style**
   - Sections: [Score]
     Feedback: [Your feedback here]
   - Buzzwords and Clichés: [Score]
     Feedback: [Your feedback here]
   - Dates: [Score]
     Feedback: [Your feedback here]
   - Personal Pronouns: [Score]
     Feedback: [Your feedback here]
   - Active Voice: [Score]
     Feedback: [Your feedback here]
   - Consistency: [Score]
     Feedback: [Your feedback here]

4. **Soft Skills**
   - Communication: [Score]
     Feedback: [Your feedback here]
   - Analytical Skills: [Score]
     Feedback: [Your feedback here]
   - Teamwork: [Score]
     Feedback: [Your feedback here]
   - Leadership: [Score]
     Feedback: [Your feedback here]
   - Drive and Initiative: [Score]
     Feedback: [Your feedback here]

5. **Calculate the overall score of the resume from 100 point**
6. **Calculate the overall score of the resume for per criteria  from 100 point**
7. **Provide missing word in resume that should be used in resume and add it in array of missing_word**
8. **Provide word to avoid in resume that should not be used in resume  and add it in array of word_to_avoid**

You are going to act as a professional resume writer skilled in presenting information concisely and using niche-appropriate language, while avoiding redundancy and cliché terms.
Be more strict while scoring resume 
Ensure the scores reflect the quality of each aspect of the resume, with constructive feedback to help improve each area.

If it is not a valid resume than send json message : {"message":"Invalid resume"}


Provide response in valid json format from the provided resume data

The data schema should be like this :  ${JSON.stringify(example_json)}
`;
