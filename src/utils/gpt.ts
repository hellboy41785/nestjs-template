import { missingWords, wordsToAvoid } from 'src/prompts/common/words';

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
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    repetition: {
      score: 7,
      feedback:
        'There are a few instances of repeated phrases. Consider varying your language to keep the reader engaged.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    weak_action_verbs: {
      score: 6,
      feedback:
        'Some of the action verbs used are not very impactful. Use stronger verbs to better convey your accomplishments.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    tenses: {
      score: 9,
      feedback:
        'Your use of tenses is mostly correct, with only a few minor inconsistencies.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    no_responsibilities: {
      score: 8,
      feedback:
        'Responsibilities are well defined, but ensure every role includes clear, tangible responsibilities.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    spelling: {
      score: 10,
      feedback: 'No spelling errors detected. Excellent work!',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
  },
  brevity: {
    overall_score: 60,
    resume_length: {
      score: 7,
      feedback:
        'The resume length is reasonable, but some sections could be more concise.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    total_bullet_points: {
      score: 8,
      feedback:
        'The number of bullet points is appropriate, though some could be combined for brevity.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    use_of_bullets: {
      score: 9,
      feedback:
        'Great use of bullet points to break down information and enhance readability.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    bullet_point_length: {
      score: 6,
      feedback:
        'Some bullet points are too long. Aim for shorter, more concise points.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    filler_words: {
      score: 7,
      feedback:
        'A few filler words can be removed to make the content more impactful.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
  },
  style: {
    overall_score: 60,
    sections: {
      score: 8,
      feedback:
        'The sections are well organized, but consider adding more visual distinction between them.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    buzzwords_cliches: {
      score: 6,
      feedback:
        'There are some buzzwords and clichés present. Try to use more specific language.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    dates: {
      score: 9,
      feedback: 'Dates are clearly and consistently formatted.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    personal_pronouns: {
      score: 10,
      feedback: 'No personal pronouns used, which is ideal for a resume.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    active_voice: {
      score: 8,
      feedback:
        'Mostly active voice is used, but there are a few passive constructions that could be revised.',
      change: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    consistency: {
      score: 9,
      feedback:
        'The resume is consistent in formatting and style, with very few deviations.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
  },
  soft_skills: {
    overall_score: 60,
    communication: {
      score: 8,
      feedback:
        'Your communication skills are well demonstrated, but a few points could be clearer.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    analytical: {
      score: 9,
      feedback:
        'Strong demonstration of analytical skills through various achievements.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    teamwork: {
      score: 7,
      feedback:
        'Teamwork is evident, but consider including more examples of collaborative success.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    leadership: {
      score: 8,
      feedback:
        'Good examples of leadership, but a couple more concrete examples would strengthen this section.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
    drive_initiative: {
      score: 9,
      feedback:
        'Your drive and initiative are well highlighted throughout the resume.',
      area_for_improvement: 'paragraph to change',
      suggestions: 'List of suggestions for improvement',
      recommendations: ['improved versions of paragraph'],
    },
  },
  design: {
    overall_score: 70,
    simple_design: {
      score: 8,
      feedback:
        'The design is simple and clean, which is good. Ensure there are no unnecessary elements.',
    },
    consistent_formatting: {
      score: 9,
      feedback: 'Formatting is consistent throughout the document.',
    },
    writing_style_consistency: {
      score: 7,
      feedback:
        'Writing style is mostly consistent, but a few sections could be improved for uniformity.',
    },
  },
};

export const system_message = `
Evaluate the resume based on the provided criteria and score each subcategory on a scale of 1 to 10. Use the following structure for your evaluation:

1. **Impact**
   - Quantifying Impact: [Score]
     Feedback: [Your feedback here] 
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Repetition: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Weak Action Verbs: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Tenses: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - No Responsibilities: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Spelling: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]

2. **Brevity**
   - Resume Length: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Total Bullet Points: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Use of Bullets: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Bullet Point Length: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Filler Words: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]

3. **Style**
   - Sections: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Buzzwords and Clichés: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Dates: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Personal Pronouns: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Active Voice: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Consistency: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]

4. **Soft Skills**
   - Communication: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Analytical Skills: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Teamwork: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Leadership: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]
   - Drive and Initiative: [Score]
     Feedback: [Your feedback here]
     Area for Improvement: [Which paragraph to change]
     Suggestions : [List of suggestions for improvement]
     Recommendation: [multiple improved version of paragraphs]

5. **Design**
   - Simple Design: [Score]
     Feedback: [Your feedback here]
   - Consistent Formatting: [Score]
     Feedback: [Your feedback here]
   - Writing Style Consistency: [Score]
     Feedback: [Your feedback here]


5. **Calculate the overall score of the resume from 100 point**
6. **Calculate the overall score of the resume for per criteria  from 100 point**
7. **Provide missing word in resume that should be used in resume and add it in array of missing_word  : ${missingWords}**
8. **Provide word to avoid in resume that should not be used in resume  and add it in array of word_to_avoid : ${wordsToAvoid}**
Design:

9.Simple design with no pictures or symbols.
10.Consistent formatting throughout the resume.
11.Maintain consistency in writing style, tenses, voice, and formatting throughout the document.

For Freshers (0-1 years' experience):

1.Resume should ideally be 1 page, can extend to 1.5 pages if achievements and projects are noteworthy.
2.Heading must include Name in Bold, Phone number, Email ID, LinkedIn. Optional: Portfolio link or Github profile.
3.Career Summary: Up to 60 words, covering job title, degree, noteworthy projects, major skills, and any awards or achievements.
4.Skills: Must include at least 15 skills covering Hard Skills (e.g., Java, Selenium), Domain skills (e.g., business analysis), and certifications (e.g., ISTQB, PMP).
5.Education: Post Graduation and Under Graduation with grades, studied modules, and passing years.
6.Projects: Details of college projects.
7.Work Experience or Internship: Max 6 points per experience, quantified achievements, starting with action verbs.
8.Extra Curriculars and Awards: Teamwork, volunteer work, college participation, awards.

For Experienced Candidates (2+ years' experience):

1.Resume should ideally be 2 pages for more than 4 years of experience. If 2-4 years, 1 page is acceptable.
2.Heading must include Name in Bold, Phone number, Email ID, LinkedIn. Optional: Portfolio link or Github profile.
3.Career Summary: Up to 80 words, covering job title, key experience, key skills, differentiation, and contribution to next company.
4.Skills: Must include at least 15 and up to 25 skills covering Hard Skills, Domain skills, and certifications.
5.Work Experience: Max 8-10 points per job, quantified achievements, starting with action verbs, no repetition of action verbs. Summary of projects before points.
6.Education: Post Graduation and Under Graduation with grades, studied modules, and passing years.
7.Extra Curriculars and Awards: Teamwork, volunteer work, college participation, awards.

You are going to act as a professional resume writer skilled in presenting information concisely and using niche-appropriate language, while avoiding redundancy and cliché terms.
Be more strict while scoring resume 
Ensure the scores reflect the quality of each aspect of the resume, with constructive feedback to help improve each area.

If it is not a valid resume than send json message : {"message":"Invalid resume" ,"error":"What is a error"}


Provide response in valid json format from the provided resume data

The data schema should be like this :  ${JSON.stringify(example_json)}
`;
